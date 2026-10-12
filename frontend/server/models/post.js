const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Author reference is mandatory']
    },
    language: {
      type: String,
      enum: ['en', 'hi', 'te', 'ta'],
      default: 'en'
    },
    topic: {
      type: String,
      enum: ['Journey Stories', 'Travel Tips', 'Route Advice', 'Destination Guide', 'General Discussion'],
      default: 'Journey Stories',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Post title cannot be empty'],
      trim: true,
      maxlength: 180
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true
    },
    photos: {
      type: [String],
      default: []
    },
    routeTag: {
      departure: { type: String, trim: true, lowercase: true },
      destination: { type: String, trim: true, lowercase: true }
    },
    destinationTag: {
      type: String,
      trim: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
      }
    ],
    views: {
      type: Number,
      default: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['active', 'flagged', 'removed'],
      default: 'active'
    },
    reportCount: {
      type: Number,
      default: 0
    },
    reportHistory: [
      {
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        reason: { type: String, required: true },
        reportedAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.virtual('likeCount').get(function () {
  return this.likes ? this.likes.length : 0;
});

module.exports = mongoose.model('Post', postSchema);