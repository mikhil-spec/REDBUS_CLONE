import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../service/community.service';
import { TranslationService } from '../../service/translation.service';
import { DEFAULT_AVATAR } from '../../config/avatar';
import {
  CommunityPost,
  PostComment,
  TravelerProfileStats,
} from '../../model/community.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit {
  posts: CommunityPost[] = [];
  isLoading = true;
  activeTopic = 'All';
  activeSort = 'recent';
  activeLanguage = '';
  readonly sortOptions: { key: string; labelKey: string }[] = [
    { key: 'recent', labelKey: 'COMMUNITY.SORT_RECENT' },
    { key: 'trending', labelKey: 'COMMUNITY.SORT_TRENDING' },
    { key: 'liked', labelKey: 'COMMUNITY.SORT_LIKED' },
    { key: 'discussed', labelKey: 'COMMUNITY.SORT_DISCUSSED' },
    { key: 'viewed', labelKey: 'COMMUNITY.SORT_VIEWED' },
    { key: 'oldest', labelKey: 'COMMUNITY.SORT_OLDEST' },
  ];
  searchCity = '';

  topics: string[] = [
    'All',
    'Journey Stories',
    'Travel Tips',
    'Route Advice',
    'Destination Guide',
    'General Discussion',
  ];

  // Active mock session user (verified traveler)
  currentUserId = '';
  currentUserName = 'XYZ';
  currentUserAvatar =
    DEFAULT_AVATAR;
  isUserVerified = false;
  isModerator = false;
  showModerationQueue = false;

  // post modal and comment state
  showCreateModal = false;
  showProfileModal = false;
  selectedProfileData: TravelerProfileStats | null = null;
  expandedCommentsPostId: string | null = null;
  activeComments: { [postId: string]: PostComment[] } = {};
  newCommentText: { [postId: string]: string } = {};

  // create post from model
  newPost = {
    topic: 'Journey Stories',
    title: '',
    content: '',
    photoUrl: '',
    departure: '',
    destination: '',
    destinationTag: '',
  };
  notificationMessage = '';
  // Stored topic values stay in English (they are data); only their labels are translated.
  private readonly topicKeys: Record<string, string> = {
    'All': 'COMMUNITY.TOPIC_ALL',
    'Journey Stories': 'COMMUNITY.TOPIC_JOURNEY_STORIES',
    'Travel Tips': 'COMMUNITY.TOPIC_TRAVEL_TIPS',
    'Route Advice': 'COMMUNITY.TOPIC_ROUTE_ADVICE',
    'Destination Guide': 'COMMUNITY.TOPIC_DESTINATION_GUIDE',
    'General Discussion': 'COMMUNITY.TOPIC_GENERAL_DISCUSSION',
  };

  constructor(
    private communityService: CommunityService,
    private i18n: TranslationService
  ) {}

  topicLabel(topic: string): string {
    const key = this.topicKeys[topic];
    return key ? this.i18n.translate(key) : topic;
  }
  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadPosts();
  }
  private loadCurrentUser(): void {
    const raw = sessionStorage.getItem('Loggedinuser');

    if (!raw) {
      this.currentUserId = '';
      this.isUserVerified = false;
      return;
    }

    try {
      const user = JSON.parse(raw);

      this.currentUserId = user?._id || '';
      this.currentUserName = user?.name || 'Traveler';
      this.currentUserAvatar =
        user?.avatar || user?.profilepicture || this.currentUserAvatar;

      this.isUserVerified = user?.isVerified === true;
      this.isModerator = this.isUserVerified && ['moderator', 'admin'].includes(user?.role);
    } catch {
      this.currentUserId = '';
      this.isUserVerified = false;
    }
  }
  setTopic(topic: string): void {
    this.showModerationQueue = false;
    this.activeTopic = topic;
    this.loadPosts();
  }

  setLanguage(code: string): void {
    this.activeLanguage = code;
    this.loadPosts();
  }

  setSort(sortType: string): void {
    this.showModerationQueue = false;
    this.activeSort = sortType;
    this.loadPosts();
  }

  toggleModerationQueue(): void {
    if (!this.isModerator) return;
    this.showModerationQueue = !this.showModerationQueue;
    this.loadPosts();
  }

  public loadPosts(): void {
    this.isLoading = true;
    const request = this.showModerationQueue
      ? this.communityService.getModerationQueue()
      : this.communityService.getCommunityPosts(this.activeTopic, this.activeSort, this.searchCity, this.searchCity, this.activeLanguage);
    request.subscribe({
      next: (res) => {
        this.posts = res.data || [];
        this.isLoading = false;
      },
      error: () => {
        this.posts = [];
        this.isLoading = false;
        this.triggerNotification(this.i18n.translate('COMMUNITY.TOAST_LOAD_FAILED'));
      },
    });
  }
  onLike(post: CommunityPost): void {
    if (!this.currentUserId) {
      this.triggerNotification(
        this.i18n.translate('COMMUNITY.TOAST_LOGIN_TO_LIKE'),
      );
      return;
    }
    this.communityService.toggleLike(post._id, this.currentUserId).subscribe({
      next: (res) => {
        const index = post.likes.indexOf(this.currentUserId);
        if (res.liked && index === -1) {
          post.likes.push(this.currentUserId);
        } else if (!res.liked && index !== -1) {
          post.likes.splice(index, 1);
        }
      },
      error: () => this.triggerNotification(this.i18n.translate('COMMUNITY.TOAST_LIKE_FAILED')),
    });
  }
  toggleComment(post: CommunityPost): void {
    if (this.expandedCommentsPostId === post._id) {
      this.expandedCommentsPostId = null;
      return;
    }
    this.expandedCommentsPostId = post._id;
    this.communityService.getPostDetails(post._id).subscribe({
      next: (res) => {
        this.activeComments[post._id] = res.comments || [];
      },
    });
  }

  submitComment(postId: string): void {
    const text = this.newCommentText[postId];
    if (!text || !text.trim()) return;

    this.communityService
      .addComment(postId, this.currentUserId, text.trim())
      .subscribe({
        next: (res) => {
          if (!this.activeComments[postId]) {
            this.activeComments[postId] = [];
          }

          this.activeComments[postId].push(res.data);
          this.newCommentText[postId] = '';

          const targetPost = this.posts.find((p) => p._id === postId);
          if (targetPost) {
            targetPost.commentCount = (targetPost.commentCount || 0) + 1;
          }
        },
        error: () => this.triggerNotification(this.i18n.translate('COMMUNITY.TOAST_COMMENT_FAILED')),
      });
  }

  openCreateModal(): void {
    if (!this.isUserVerified) {
      this.triggerNotification(
        this.i18n.translate('COMMUNITY.TOAST_VERIFIED_ONLY_POST'),
      );
      return;
    }
    this.showCreateModal = true;
  }
  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  handleCreatePost(): void {
    if (!this.newPost.title.trim() || !this.newPost.content.trim()) {
      this.triggerNotification(this.i18n.translate('COMMUNITY.TOAST_TITLE_REQUIRED'));
      return;
    }

    const payload = {
      authorId: this.currentUserId,
      topic: this.newPost.topic,
      title: this.newPost.title,
      content: this.newPost.content,
      photos: this.newPost.photoUrl ? [this.newPost.photoUrl] : [],
      routeTag: {
        departure: this.newPost.departure,
        destination: this.newPost.destination,
      },
      destinationTag: this.newPost.destinationTag || this.newPost.destination,
    };

    this.communityService.createPost(payload).subscribe({
      next: (res) => {
        this.posts.unshift(res.data);
        this.showCreateModal = false;
        this.triggerNotification(this.i18n.translate('COMMUNITY.TOAST_PUBLISHED'));
        this.newPost = {
          topic: 'Journey Stories',
          title: '',
          content: '',
          photoUrl: '',
          departure: '',
          destination: '',
          destinationTag: '',
        };
      },
      error: (err) => {
        this.triggerNotification(err.error?.message || this.i18n.translate('COMMUNITY.TOAST_POST_FAILED'));
      },
    });
  }

  viewTravelerProfile(authorId: string): void {
    this.communityService.getTravelerProfile(authorId).subscribe({
      next: (res) => {
        this.selectedProfileData = res.data;
        this.showProfileModal = true;
      },
    });
  }
  closeProfileModal(): void {
    this.showProfileModal = false;
    this.selectedProfileData = null;
  }

  moderate(post: CommunityPost, action: 'approve' | 'flag' | 'remove', featured = false): void {
    if (!this.isModerator) return;
    this.communityService.moderatePost(post._id, action, featured).subscribe({
      next: (res) => {
        this.triggerNotification(res.message || this.i18n.translate('COMMUNITY.TOAST_MOD_DONE'));
        this.loadPosts();
      },
      error: (err) => this.triggerNotification(err.error?.message || this.i18n.translate('COMMUNITY.TOAST_MOD_FAILED')),
    });
  }

  onReportPost(post: CommunityPost): void {
    const reason = prompt(
      'Reason for flagging this post (e.g. Inappropriate content, spam, misinformation):',
    );
    if (!reason) return;

    this.communityService
      .reportPost(post._id, this.currentUserId, reason)
      .subscribe({
        next: (res) => this.triggerNotification(res.message),
        error: () => this.triggerNotification(this.i18n.translate('COMMUNITY.TOAST_REPORT_FAILED')),
      });
  }

  shareOnSocial(
    platform: 'whatsapp' | 'twitter' | 'copy',
    post: CommunityPost,
  ): void {
    const postUrl = `${window.location.origin}/community#post-${post._id}`;
    const shareText = `Check out "${post.title}" by ${post.author.name} on RedBus Travel Community:`;

    if (platform === 'whatsapp') {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + postUrl)}`,
        '_blank',
      );
    } else if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`,
        '_blank',
      );
    } else if (platform == 'copy') {
      navigator.clipboard.writeText(`${shareText} ${postUrl}`).then(() => {
        this.triggerNotification(this.i18n.translate('COMMUNITY.TOAST_LINK_COPIED'));
      });
    }
  }

  triggerNotification(msg: string): void {
    this.notificationMessage = msg;
    setTimeout(() => {
      this.notificationMessage = '';
    }, 4000);
  }
}
