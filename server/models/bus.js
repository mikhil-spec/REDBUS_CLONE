const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busSchema = new Schema(
  {
    operatorName: {
      type: String,
      required: true,
      trim: true,
    },
    busType: {
      type: String,
      required: true,
      trim: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    rating: {
      type: [Number],
      default: [],
    },
    totalSeats: {
      type: Number,
      default: 40,
    },
    routes: {
      type: Schema.Types.ObjectId,
      ref: "Routes",
      required: true,
      index: true,
    },
    images: {
      type: String,
      required: true,
    },
    liveTracking: {
      type: Boolean,
      default: false,
    },
    reschedulable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Buses", busSchema);