const mongoose = require('mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Customer = require('../models/customer');
const { moderateText } = require('../utils/contentModeration');

async function getVerifiedCustomer(customerId) {
  if (!customerId) {
    return null;
  }

  const customer = await Customer.findById(customerId)
    .select('_id name email avatar isVerified role badges');

  if (!customer || !customer.isVerified) {
    return null;
  }

  return customer;
}

async function getModerator(customerId) {
  if (!customerId) {
    return null;
  }

  const moderator = await Customer.findById(customerId)
    .select('_id isVerified role');

  if (
    !moderator ||
    !moderator.isVerified ||
    !['moderator', 'admin'].includes(moderator.role)
  ) {
    return null;
  }

  return moderator;
}

// Create a new travel post
const POST_LANGUAGES = ['en', 'hi', 'te', 'ta'];

// A post's language: the one the writer chose, otherwise the writer's preferred language, otherwise English.
function postLanguage(requested, author) {
  if (POST_LANGUAGES.includes(requested)) return requested;
  const preferred = author && author.notificationPreferences && author.notificationPreferences.preferredLanguage;
  return POST_LANGUAGES.includes(preferred) ? preferred : 'en';
}

exports.createPost = async (req, res) => {
  try {
    const {
      authorId,
      topic,
      title,
      content,
      photos,
      routeTag,
      destinationTag
    } = req.body;

    if (!authorId || !title || !content) {
      return res.status(400).json({
        success: false,
        message:
          'Author ID, post title, and content body are required.'
      });
    }

    const author = await getVerifiedCustomer(authorId);

    if (!author) {
      return res.status(403).json({
        success: false,
        message:
          'Only verified travelers can publish community posts.'
      });
    }

    const contentCheck = moderateText(
      `${title} ${content}`
    );

    if (!contentCheck.allowed) {
      return res.status(422).json({
        success: false,
        message: contentCheck.reason
      });
    }

    const newPost = await Post.create({
      author: author._id,
      topic: topic || 'Journey Stories',
      title: title.trim(),
      content: content.trim(),
      photos: Array.isArray(photos)
        ? photos.filter(url => typeof url === 'string' && /^https:\/\/[^\s]+$/i.test(url)).slice(0, 6)
        : [],
      routeTag: routeTag || {},
      destinationTag: destinationTag || '',
      language: postLanguage(req.body.language, author),
      status: 'active'
    });

    const populatedPost =
      await Post.findById(newPost._id)
        .populate(
          'author',
          'name avatar isVerified role badges'
        );

    return res.status(201).json({
      success: true,
      message:
        'Community story published successfully.',
      data: populatedPost
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Unable to publish community post.',
      error: error.message
    });
  }
};

// Fetch community feed
exports.getAllPosts = async (req, res) => {
  try {
    const {
      topic,
      destination,
      route,
      sort
    } = req.query;

    // Public feed never accepts a caller-selected status: hidden/removed posts
    // must not be retrievable by adding ?status=removed to the URL.
    const filterCriteria = {
      status: 'active'
    };

    if (topic && topic !== 'All') {
      filterCriteria.topic = topic;
    }

    if (destination) {
      filterCriteria.destinationTag = { $regex: destination, $options: 'i' };
    }

    if (route) {
      filterCriteria.$or = [
        { 'routeTag.departure': { $regex: route, $options: 'i' } },
        { 'routeTag.destination': { $regex: route, $options: 'i' } },
        { title: { $regex: route, $options: 'i' } }
      ];
    }

    // Posts saved before languages existed have no language and count as English.
    const language = String(req.query.language || '');
    if (POST_LANGUAGES.includes(language)) {
      filterCriteria.language = language === 'en' ? { $in: ['en', null] } : language;
    }

    let query = Post.find(filterCriteria)
      .populate(
        'author',
        'name avatar isVerified role badges'
      );

    if (sort === 'trending') {
      query = query.sort({
        isFeatured: -1,
        views: -1,
        createdAt: -1
      });
    } else if (sort === 'top') {
      query = query.sort({
        isFeatured: -1,
        createdAt: -1
      });
    } else {
      query = query.sort({
        isFeatured: -1,
        createdAt: -1
      });
    }

    const posts = await query.exec();

    const postIds = posts.map(
      post => post._id
    );

    const commentCounts =
      postIds.length > 0
        ? await Comment.aggregate([
            {
              $match: {
                post: {
                  $in: postIds
                }
              }
            },
            {
              $group: {
                _id: '$post',
                count: {
                  $sum: 1
                }
              }
            }
          ])
        : [];

    const countMap = {};

    commentCounts.forEach(item => {
      countMap[item._id.toString()] =
        item.count;
    });

    const formattedPosts = posts.map(post => {
      const plainPost = post.toObject();
      plainPost.commentCount = countMap[post._id.toString()] || 0;
      plainPost.likeCount = post.likes?.length || 0;
      const ageHours = Math.max(1, (Date.now() - new Date(post.createdAt).getTime()) / 3600000);
      plainPost.engagementScore = Math.round((plainPost.likeCount * 3 + plainPost.commentCount * 5 + plainPost.views * 0.5 + (plainPost.isFeatured ? 20 : 0)) / Math.sqrt(ageHours) * 100) / 100;
      return plainPost;
    });

    if (sort === 'trending') {
      formattedPosts.sort((a, b) => b.engagementScore - a.engagementScore);
    } else if (sort === 'top') {
      formattedPosts.sort((a, b) => (b.likeCount + b.commentCount) - (a.likeCount + a.commentCount));
    } else if (sort === 'liked') {
      formattedPosts.sort((a, b) => b.likeCount - a.likeCount || new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'discussed') {
      formattedPosts.sort((a, b) => b.commentCount - a.commentCount || new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'viewed') {
      formattedPosts.sort((a, b) => (b.views || 0) - (a.views || 0) || new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'oldest') {
      formattedPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      formattedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return res.status(200).json({
      success: true,
      count: formattedPosts.length,
      data: formattedPosts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Failed to retrieve community feed.',
      error: error.message
    });
  }
};

// Moderator-only queue of reported content. Public feed requests cannot access this.
exports.getModerationQueue = async (req, res) => {
  try {
    const posts = await Post.find({
      reportCount: { $gt: 0 },
      status: { $in: ['active', 'flagged'] },
    })
      .populate('author', 'name avatar isVerified role badges')
      .sort({ reportCount: -1, createdAt: -1 })
      .limit(200);

    return res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to load the moderation queue.',
      error: error.message,
    });
  }
};

// Get a single post
exports.getPostById = async (req, res) => {
  try {
    const post =
      await Post.findOneAndUpdate(
        {
          _id: req.params.id,
          status: 'active'
        },
        {
          $inc: {
            views: 1
          }
        },
        {
          new: true
        }
      ).populate(
        'author',
        'name avatar isVerified role badges'
      );

    if (!post) {
      return res.status(404).json({
        success: false,
        message:
          'Post not found or has been taken down.'
      });
    }

    const comments =
      await Comment.find({
        post: post._id
      })
        .populate(
          'author',
          'name avatar isVerified role'
        )
        .sort({
          createdAt: 1
        });

    return res.status(200).json({
      success: true,
      data: post,
      comments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Error fetching post details.',
      error: error.message
    });
  }
};

// Toggle like
exports.toggleLikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message:
          'User ID is required to like.'
      });
    }

    const customer =
      await getVerifiedCustomer(customerId);

    if (!customer) {
      return res.status(403).json({
        success: false,
        message:
          'Only verified users can like community content.'
      });
    }

    const post =
      await Post.findById(postId);

    if (
      !post ||
      post.status === 'removed'
    ) {
      return res.status(404).json({
        success: false,
        message:
          'Active post not found.'
      });
    }

    const likedIndex =
      post.likes.findIndex(
        id =>
          id.toString() ===
          customer._id.toString()
      );

    if (likedIndex === -1) {
      post.likes.push(customer._id);
    } else {
      post.likes.splice(
        likedIndex,
        1
      );
    }

    await post.save();

    return res.status(200).json({
      success: true,
      liked: likedIndex === -1,
      totalLikes:
        post.likes.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Failed to toggle post reaction.',
      error: error.message
    });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const {
      authorId,
      content
    } = req.body;

    if (
      !authorId ||
      !content ||
      !content.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Author ID and comment message are required.'
      });
    }

    const author =
      await getVerifiedCustomer(authorId);

    if (!author) {
      return res.status(403).json({
        success: false,
        message:
          'Only verified users can comment.'
      });
    }

    const contentCheck =
      moderateText(content);

    if (!contentCheck.allowed) {
      return res.status(422).json({
        success: false,
        message:
          contentCheck.reason
      });
    }

    const post =
      await Post.findById(postId);

    if (
      !post ||
      post.status !== 'active'
    ) {
      return res.status(404).json({
        success: false,
        message:
          'Active post not found.'
      });
    }

    const comment =
      await Comment.create({
        post: postId,
        author: author._id,
        content:
          content.trim()
      });

    const populatedComment =
      await Comment.findById(
        comment._id
      ).populate(
        'author',
        'name avatar isVerified role'
      );

    return res.status(201).json({
      success: true,
      message:
        'Comment added.',
      data:
        populatedComment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Failed to post comment.',
      error: error.message
    });
  }
};

// Report post
exports.reportPost = async (req, res) => {
  try {
    const { postId } =
      req.params;

    const {
      customerId,
      reason
    } = req.body;

    if (
      !customerId ||
      !reason ||
      !reason.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'A verified user and report reason are required.'
      });
    }

    const reporter =
      await getVerifiedCustomer(
        customerId
      );

    if (!reporter) {
      return res.status(403).json({
        success: false,
        message:
          'A verified account is required to report content.'
      });
    }

    const post =
      await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message:
          'Post not found.'
      });
    }

    const alreadyReported =
      post.reportHistory.some(
        report =>
          report.reportedBy &&
          report.reportedBy.toString() ===
            reporter._id.toString()
      );

    if (alreadyReported) {
      return res.status(409).json({
        success: false,
        message:
          'You have already reported this post.'
      });
    }

    post.reportCount += 1;

    post.reportHistory.push({
      reportedBy:
        reporter._id,
      reason:
        reason.trim(),
      reportedAt:
        new Date()
    });

    if (
      post.reportCount >= 3 &&
      post.status === 'active'
    ) {
      post.status = 'flagged';
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message:
        'Thank you. The post has been flagged for moderation review.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Failed to submit report.',
      error: error.message
    });
  }
};

// Moderator tools
exports.moderatePost = async (
  req,
  res
) => {
  try {
    const { postId } =
      req.params;

    const {
      action,
      isFeatured,
      moderatorId
    } = req.body;

    const moderator =
      await getModerator(
        moderatorId
      );

    if (!moderator) {
      return res.status(403).json({
        success: false,
        message:
          'Moderator or administrator privileges are required.'
      });
    }

    const post =
      await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message:
          'Target post not found.'
      });
    }

    if (
      ![
        'approve',
        'flag',
        'remove'
      ].includes(action)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid moderation action.'
      });
    }

    if (action === 'approve') {
      post.status = 'active';
    }

    if (action === 'flag') {
      post.status = 'flagged';
    }

    if (action === 'remove') {
      post.status = 'removed';
    }

    if (
      typeof isFeatured ===
      'boolean'
    ) {
      post.isFeatured =
        isFeatured;
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message:
        `Post marked as ${post.status}.`,
      data: post
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        'Moderation action failed.',
      error: error.message
    });
  }
};

// Traveler profile
exports.getTravelerProfile =
  async (req, res) => {
    try {
      const { customerId } =
        req.params;

      if (!mongoose.isValidObjectId(customerId)) {
        return res.status(404).json({ success: false, message: 'Traveler not found.' });
      }

      // Public profile: never expose email, phone, googleId or notification settings.
      const traveler =
        await Customer.findById(
          customerId
        ).select('name avatar bio badges role isVerified createdAt');

      if (!traveler) {
        return res.status(404).json({
          success: false,
          message:
            'Traveler not found.'
        });
      }

      const travelerPosts =
        await Post.find({
          author: customerId,
          status: 'active'
        }).sort({
          createdAt: -1
        });

      const totalLikesReceived =
        travelerPosts.reduce(
          (total, post) =>
            total +
            (post.likes?.length || 0),
          0
        );

      return res.status(200).json({
        success: true,
        data: {
          profile: traveler,
          stats: {
            totalStories:
              travelerPosts.length,
            likesEarned:
              totalLikesReceived
          },
          posts:
            travelerPosts
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          'Failed to load traveler profile activity.',
        error: error.message
      });
    }
  };