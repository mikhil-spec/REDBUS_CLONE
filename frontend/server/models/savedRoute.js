const mongoose = require("mongoose");

const waypointSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },

      lat: {
        type: Number,
        required: true
      },

      lng: {
        type: Number,
        required: true
      },

      stopDurationMinutes: {
        type: Number,
        default: 15,
        min: 0
      }
    },
    {
      _id: false
    }
  );

const savedRouteSchema =
  new mongoose.Schema(
    {
      customer: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        index: true
      },

      routeName: {
        type: String,
        required: [
          true,
          "Custom route name is required"
        ],
        trim: true,
        maxlength: 80
      },

      origin: {
        name: {
          type: String,
          required: true,
          trim: true
        },

        lat: {
          type: Number,
          required: true
        },

        lng: {
          type: Number,
          required: true
        }
      },

      destination: {
        name: {
          type: String,
          required: true,
          trim: true
        },

        lat: {
          type: Number,
          required: true
        },

        lng: {
          type: Number,
          required: true
        }
      },

      waypoints: {
        type: [waypointSchema],
        default: []
      },

      preferredRouteType: {
        type: String,
        enum: [
          "fastest",
          "least_traffic",
          "scenic"
        ],
        default: "fastest"
      },

      distanceKm: {
        type: Number,
        required: true,
        min: 0
      },

      estimatedDurationMinutes: {
        type: Number,
        required: true,
        min: 0
      },

      tags: {
        type: [String],
        default: [
          "Frequent Highway"
        ]
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "SavedRoute",
    savedRouteSchema
  );