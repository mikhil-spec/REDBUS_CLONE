const mongoose =
  require('mongoose');

const notificationPreferencesSchema =
  new mongoose.Schema(
    {
      preferredLanguage: {
        type: String,
        enum: [
          'en',
          'hi',
          'te',
          'ta'
        ],
        default: 'en'
      },

      channels: {
        email: {
          type: Boolean,
          default: true
        },

        push: {
          type: Boolean,
          default: true
        },

        sms: {
          type: Boolean,
          default: false
        }
      },

      eventSubscriptions: {
        bookingUpdates: {
          type: Boolean,
          default: true
        },

        journeyReminders: {
          type: Boolean,
          default: true
        },

        scheduleChanges: {
          type: Boolean,
          default: true
        },

        promotions: {
          type: Boolean,
          default: true
        }
      },

      pushToken: {
        type: String,
        default: ''
      },

      pushSubscription: {
        type: String,
        default: ''
      }
    },
    {
      _id: false
    }
  );

const customerSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [
          true,
          'Customer name is required'
        ],
        trim: true
      },

      email: {
        type: String,
        required: [
          true,
          'Email is required'
        ],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
          /^\S+@\S+\.\S+$/,
          'Please enter a valid email address'
        ]
      },

      googleId: {
        type: String,
        unique: true,
        sparse: true,
        index: true
      },

      phone: {
        type: String,
        required: [
          true,
          'Phone number is required'
        ],
        trim: true
      },

      gender: {
        type: String,
        enum: [
          'Male',
          'Female',
          'Other'
        ],
        default: 'Male'
      },

      age: {
        type: Number,
        min: 1,
        max: 120
      },

      isVerified: {
        type: Boolean,
        default: false
      },

      avatar: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      },

      bio: {
        type: String,
        default:
          'Passionate road traveler exploring scenic highways and sharing travel tips.'
      },

      role: {
        type: String,
        enum: [
          'traveler',
          'verified_guide',
          'moderator',
          'admin'
        ],
        default: 'traveler'
      },

      badges: {
        type: [String],
        default: [
          'Road Explorer'
        ]
      },

      notificationPreferences: {
        type:
          notificationPreferencesSchema,

        default: () => ({})
      },

      themePreference: {
        type: String,
        enum: [
          'light',
          'dark',
          null
        ],
        default: null
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    'Customer',
    customerSchema
  );