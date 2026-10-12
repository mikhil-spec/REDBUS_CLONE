const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
  {
    departureCity: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    destinationCity: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    distanceKm: {
      type: Number,
      min: 1
    },
    estimatedDuration: {
      type: String,
      default: '6h 30m'
    },
    boardingPoints: [
      {
        location: { type: String, required: true },
        time: { type: String, required: true }
      }
    ],
    droppingPoints: [
      {
        location: { type: String, required: true },
        time: { type: String, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
);

routeSchema.index({ departureCity: 1, destinationCity: 1 }, { unique: true });

module.exports = mongoose.model('Route', routeSchema);