const mongoose = require("mongoose");

const Review = require("../models/review");

const Booking = require("../models/booking");

const Bus = require("../models/bus");

const Customer = require("../models/customer");

const { moderateText } = require("../utils/contentModeration");

const EDIT_WINDOW_MS = 24 * 60 * 60 * 1000;
const LANGUAGES = ["en", "hi", "te", "ta"];
// "flagged" = reported once or twice: still shown and counted until it reaches the hide threshold.
const VISIBLE_STATUSES = ["active", "flagged"];

// Recalculate active review rating. Hidden/flagged reviews are excluded.
async function updateBusAggregateRating(busId) {
  const objectId = new mongoose.Types.ObjectId(busId);

  const stats = await Review.aggregate([
    {
      $match: {
        bus: objectId,
        status: { $in: VISIBLE_STATUSES },
      },
    },

    {
      $group: {
        _id: "$bus",

        avgRating: {
          $avg: "$rating",
        },

        totalReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  const newRating =
    stats.length > 0 ? Number(stats[0].avgRating.toFixed(1)) : 0;

  await Bus.findByIdAndUpdate(busId, {
    rating: newRating,
  });

  return {
    newRating,
    totalReviews: stats.length > 0 ? stats[0].totalReviews : 0,
  };
}

// Create review
exports.createReview = async (req, res) => {
  try {
    const { customerId, bookingId, rating, headline, comment } = req.body;

    if (!customerId || !bookingId || rating === undefined || !comment) {
      return res.status(400).json({
        success: false,
        message:"Customer ID, Booking ID, rating and feedback comment are required.",
      });
    }

    if (!mongoose.isValidObjectId(bookingId)) {
      return res.status(400).json({ success: false, message: "Invalid booking reference." });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 || numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a whole number between 1 and 5.",
      });
    }

    if (typeof comment !== "string" || comment.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least 20 characters in your review.",
      });
    }

    const contentCheck = moderateText(comment);

    if (!contentCheck.allowed) {
      return res.status(422).json({
        success: false,
        message: contentCheck.reason,
      });
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Traveler profile not found.",
      });
    }

    if (!customer.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Only verified traveler accounts can publish route reviews.",
      });
    }

    const booking = await Booking.findById(bookingId).populate(
      "bus",
      "busName busNumber companyName departureTime arrivalTime",
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking record not found.",
      });
    }

    if (String(booking.customer) !== String(customerId)) {
      return res.status(403).json({
        success: false,
        message: "You can only review your own booking.",
      });
    }

    // Eligibility is an explicit lifecycle state set by the scheduler (after the
    // scheduled arrival) or by a moderator. Pending, confirmed-but-not-yet-travelled,
    // cancelled and merely time-expired bookings are all rejected here.
    if (booking.bookingStatus !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Reviews are available only after this journey has been completed.",
      });
    }

    const existingReview = await Review.findOne({
      booking: bookingId,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a review for this journey.",
      });
    }

    const editableUntil = new Date(Date.now() + EDIT_WINDOW_MS);

    const review = await Review.create({
      customer: customerId,

      bus: booking.bus._id,

      booking: bookingId,

      departureCity: booking.departureCity,

      destinationCity: booking.destinationCity,

      rating: numericRating,

      language: LANGUAGES.includes(req.body.language) ? req.body.language : "en",
      headline: typeof headline === "string" ? headline.trim().slice(0, 120) : "",

      comment: comment.trim(),

      editableUntil,

      status: "active",
    });

    await updateBusAggregateRating(booking.bus._id);

    const populatedReview = await Review.findById(review._id)
      .populate("customer", "name avatar isVerified role badges")
      .populate("bus", "busName busNumber companyName");

    return res.status(201).json({
      success: true,
      message: "Thank you! Your route review has been published.",
      data: populatedReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create review record.",
      error: error.message,
    });
  }
};

// Get route reviews
// Route reviews. busId "all" returns reviews across every route.
// Filters: star (1-5) and language (en, hi, te, ta). Sorts: recent (default), highest, lowest, helpful.
exports.getRouteReviews = async (req, res) => {
  try {
    const { busId } = req.params;
    const { sort, star, language } = req.query;
    const allRoutes = busId === "all";

    if (!allRoutes && !mongoose.isValidObjectId(busId)) {
      return res.status(400).json({ success: false, message: "Invalid bus reference." });
    }

    const scope = allRoutes
      ? { status: { $in: VISIBLE_STATUSES } }
      : { bus: busId, status: { $in: VISIBLE_STATUSES } };

    const query = { ...scope };
    if (star && Number(star) >= 1 && Number(star) <= 5) query.rating = Number(star);
    if (language && LANGUAGES.includes(language)) query.language = language;

    const reviews = await Review.find(query)
      .populate("customer", "name avatar isVerified role badges")
      .populate("bus", "busName busNumber companyName");

    const newestFirst = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "highest") reviews.sort((a, b) => b.rating - a.rating || newestFirst(a, b));
    else if (sort === "lowest") reviews.sort((a, b) => a.rating - b.rating || newestFirst(a, b));
    else if (sort === "helpful") reviews.sort((a, b) => b.helpfulVotes.length - a.helpfulVotes.length || newestFirst(a, b));
    else reviews.sort(newestFirst);

    // Summary covers the whole selected scope, not only the current star/language filter.
    const allActiveReviews = await Review.find(scope);
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let scoreSum = 0;
    allActiveReviews.forEach((review) => {
      scoreSum += review.rating;
      if (breakdown[review.rating] !== undefined) breakdown[review.rating] += 1;
    });
    const totalCount = allActiveReviews.length;
    const averageRating = totalCount > 0 ? Number((scoreSum / totalCount).toFixed(1)) : 0;

    // Trusted reviewer: cumulative helpful votes across the author's active reviews.
    const reviewerIds = [
      ...new Set(reviews.map((r) => r.customer?._id).filter(Boolean).map((id) => id.toString())),
    ];
    const helpfulMap = new Map();
    if (reviewerIds.length) {
      const helpfulStats = await Review.aggregate([
        { $match: { customer: { $in: reviewerIds.map((id) => new mongoose.Types.ObjectId(id)) }, status: { $in: VISIBLE_STATUSES } } },
        { $project: { customer: 1, helpfulCount: { $size: { $ifNull: ["$helpfulVotes", []] } } } },
        { $group: { _id: "$customer", total: { $sum: "$helpfulCount" } } },
      ]);
      helpfulStats.forEach((item) => helpfulMap.set(item._id.toString(), item.total));
    }

    const formattedReviews = reviews.map((review) => {
      const obj = review.toObject();
      const customerId = obj.customer?._id?.toString();
      const cumulativeHelpful = customerId ? helpfulMap.get(customerId) || 0 : 0;
      obj.isTrustedReviewer = cumulativeHelpful >= 3 || (obj.customer && obj.customer.role === "verified_guide");
      obj.helpfulCount = obj.helpfulVotes?.length || 0;
      obj.canEdit = new Date() <= new Date(obj.editableUntil);
      return obj;
    });

    return res.status(200).json({
      success: true,
      summary: { averageRating, totalReviews: totalCount, starBreakdown: breakdown },
      data: formattedReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews for this route.",
      error: error.message,
    });
  }
};

// Buses that a traveler can filter reviews by, with their rating and review count.
exports.listReviewedBuses = async (req, res) => {
  try {
    const buses = await Bus.find({})
      .select("busName busNumber companyName departureCity destinationCity rating")
      .sort({ departureCity: 1, destinationCity: 1, busName: 1 })
      .lean();
    const counts = await Review.aggregate([
      { $match: { status: { $in: VISIBLE_STATUSES } } },
      { $group: { _id: "$bus", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));
    const data = buses.map((bus) => ({ ...bus, reviewCount: countMap.get(String(bus._id)) || 0 }));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load routes.", error: error.message });
  }
};

// Edit review (24-hour window; rating and text both locked after that)
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const { customerId, rating, headline, comment } = req.body;

    if (!mongoose.isValidObjectId(reviewId)) {
      return res.status(404).json({ success: false, message: "Review entry not found." });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review entry not found.",
      });
    }

    if (review.customer.toString() !== String(customerId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to modify this review.",
      });
    }

    if (new Date() > new Date(review.editableUntil)) {
      return res.status(403).json({
        success: false,
        message: "The 24-hour edit window has expired.",
      });
    }

    if (rating !== undefined) {
      const numericRating = Number(rating);

      if (
        !Number.isInteger(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5.",
        });
      }

      review.rating = numericRating;
    }

    if (comment !== undefined) {
      if (typeof comment !== "string" || comment.trim().length < 20) {
        return res.status(400).json({
          success: false,
          message: "Feedback text must be at least 20 characters.",
        });
      }

      const contentCheck = moderateText(comment);

      if (!contentCheck.allowed) {
        return res.status(422).json({
          success: false,
          message: contentCheck.reason,
        });
      }

      review.comment = comment.trim();
    }

    if (headline !== undefined) {
      review.headline = typeof headline === "string" ? headline.trim().slice(0, 120) : "";
    }

    await review.save();

    await updateBusAggregateRating(review.bus);

    return res.status(200).json({
      success: true,
      message: "Review updated successfully within the permitted edit window.",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update review.",
      error: error.message,
    });
  }
};

// Helpful vote (toggle)
exports.voteHelpfulReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const { customerId } = req.body;

    if (!customerId || !mongoose.isValidObjectId(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Customer ID and a valid review reference are required.",
      });
    }

    const voter = await Customer.findById(customerId).select("isVerified");

    if (!voter || !voter.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Only verified users can vote on reviews.",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review || !VISIBLE_STATUSES.includes(review.status)) {
      return res.status(404).json({
        success: false,
        message: "Active review not found.",
      });
    }

    if (review.customer.toString() === String(customerId)) {
      return res.status(403).json({
        success: false,
        message: "You cannot vote on your own review.",
      });
    }

    const existingIdx = review.helpfulVotes.findIndex(
      (id) => id.toString() === String(customerId),
    );

    if (existingIdx === -1) {
      review.helpfulVotes.push(customerId);
    } else {
      review.helpfulVotes.splice(existingIdx, 1);
    }

    await review.save();

    return res.status(200).json({
      success: true,

      upvoted: existingIdx === -1,

      helpfulCount: review.helpfulVotes.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to record helpful vote.",
      error: error.message,
    });
  }
};

// Report review
exports.reportReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const { customerId, reason } = req.body;

    if (!customerId || typeof reason !== "string" || !reason.trim() || !mongoose.isValidObjectId(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "A verified user, a valid review and a report reason are required.",
      });
    }

    const reporter = await Customer.findById(customerId).select("isVerified");

    if (!reporter || !reporter.isVerified) {
      return res.status(403).json({
        success: false,
        message: "A verified account is required to report a review.",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review entry not found.",
      });
    }

    const alreadyReported = review.reportHistory.some(
      (report) =>
        report.reportedBy && report.reportedBy.toString() === String(customerId),
    );

    if (alreadyReported) {
      return res.status(409).json({
        success: false,
        message: "You have already reported this review.",
      });
    }

    review.reportCount += 1;

    review.reportHistory.push({
      reportedBy: customerId,

      reason: reason.trim().slice(0, 500),

      reportedAt: new Date(),
    });

    if (review.reportCount >= 3) {
      review.status = "hidden";
    } else if (review.reportCount >= 1 && review.status === "active") {
      review.status = "flagged";
    }

    await review.save();

    await updateBusAggregateRating(review.bus);

    return res.status(200).json({
      success: true,
      message:
        review.status === "hidden"
          ? "Review has been hidden pending administrative review."
          : "Review has been reported to moderators.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to report review.",
      error: error.message,
    });
  }
};

// Eligible completed bookings (completed, not yet reviewed)
exports.getEligibleCompletedBookings = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId).select("isVerified");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    if (!customer.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Only verified travelers can submit reviews.",
      });
    }

    const bookings = await Booking.find({
      customer: customerId,

      bookingStatus: "Completed",
    }).populate(
      "bus",
      "busName busNumber companyName departureTime arrivalTime",
    );

    const reviewedBookingIds = await Review.distinct("booking", {
      customer: customerId,
    });

    const reviewedSet = new Set(reviewedBookingIds.map((id) => id.toString()));

    const eligible = bookings.filter(
      (booking) => !reviewedSet.has(booking._id.toString()),
    );

    return res.status(200).json({
      success: true,
      count: eligible.length,
      data: eligible,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve completed journey records.",
      error: error.message,
    });
  }
};
