const mongoose = require('mongoose');

const deliveryAttemptSchema =
  new mongoose.Schema(
    {
      channel: {
        type: String,
        enum: [
          'email',
          'push',
          'sms',
          'in_app'
        ],
        required: true
      },

      status: {
        type: String,
        enum: [
          'pending',
          'delivered',
          'failed'
        ],
        default: 'pending'
      },

      attemptNumber: {
        type: Number,
        default: 1
      },

      errorMessage: {
        type: String,
        default: ''
      },

      timestamp: {
        type: Date,
        default: Date.now
      }
    },
    {
      _id: false
    }
  );

const notificationSchema =
  new mongoose.Schema(
    {
      recipient: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        index: true
      },

      eventType: {
        type: String,
        enum: [
          'BOOKING_CONFIRMATION',
          'BOOKING_CANCELLATION',
          'SCHEDULE_CHANGE',
          'JOURNEY_REMINDER',
          'PROMOTIONAL_OFFER'
        ],
        required: true
      },

      title: {
        type: String,
        required: true
      },

      message: {
        type: String,
        required: true
      },

      language: {
        type: String,
        enum: [
          'en',
          'hi',
          'te',
          'ta'
        ],
        default: 'en'
      },

      deliveryChannels: {
        type: [String],
        enum: [
          'email',
          'push',
          'sms',
          'in_app'
        ],
        default: ['in_app']
      },

      deliveryStatus: {
        type: String,
        enum: [
          'queued',
          'delivered',
          'partially_delivered',
          'failed'
        ],
        default: 'queued'
      },

      deliveryLogs: [
        deliveryAttemptSchema
      ],

      retryCount: {
        type: Number,
        default: 0
      },

      maxRetries: {
        type: Number,
        default: 3
      },

      nextRetryAt: {
        type: Date,
        default: null,
        index: true
      },

      isRead: {
        type: Boolean,
        default: false
      },

      metadata: {
        pnr: {
          type: String
        },

        busName: {
          type: String
        },

        journeyDate: {
          type: Date
        },

        promoCode: {
          type: String
        },

        discountPercentage: {
          type: Number
        },

        reminderKey: {
          type: String,
          index: true
        }
      }
    },
    {
      timestamps: true
    }
  );

notificationSchema.index({
  recipient: 1,
  createdAt: -1
});

notificationSchema.index({
  recipient: 1,
  eventType: 1,
  'metadata.reminderKey': 1,
  createdAt: -1
});

module.exports =
  mongoose.model(
    'Notification',
    notificationSchema
  );