const mongoose = require('mongoose');

const passengerDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  age: { type: Number, required: true },
  seatNumber: { type: Number, required: true }
});

const bookingSchema = new mongoose.Schema(
  {
    pnr: {
      type: String,
      unique: true,
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: true
    },
    departureCity: {
      type: String,
      required: true
    },
    destinationCity: {
      type: String,
      required: true
    },
    journeyDate: {
      type: Date,
      required: true
    },
    seatsBooked: {
      type: [Number],
      required: true,
      validate: [array => array.length > 0, 'At least one seat must be selected']
    },
    passengers: [passengerDetailSchema],
    discountAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    offerCode: {
      type: String,
      trim: true,
      uppercase: true
    },
    totalFare: {
      type: Number,
      required: true,
      min: 0
    },
    boardingPoint: {
      location: String,
      time: String
    },
    droppingPoint: {
      location: String,
      time: String
    },
    // Lifecycle: Pending/Confirmed -> Completed (journey finished) or Cancelled.
    // Only "Completed" bookings may be reviewed.
    bookingStatus: {
      type: String,
      enum: ['Confirmed', 'Cancelled', 'Pending', 'Completed'],
      default: 'Confirmed'
    },
    completedAt: {
      type: Date,
      default: null
    },
    // null = completed automatically by the scheduler after scheduled arrival;
    // otherwise the moderator/admin customer id who confirmed completion.
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
