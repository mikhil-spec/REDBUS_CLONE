const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: [true, 'Bus/Operator name is required'],
      trim: true
    },
    busNumber: {
      type: String,
      required: [true, 'Bus number is required'],
      unique: true,
      uppercase: true,
      trim: true
    },
    busType: {
      type: String,
      enum: ['AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Volvo Multi-Axle'],
      default: 'AC Seater'
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 1,
      max: 5
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 10,
      max: 60
    },
    availableSeats: {
      type: Number,
      required: true
    },
    bookedSeats: {
      type: [Number],
      default: []
    },
    fare: {
      type: Number,
      required: [true, 'Fare per seat is required'],
      min: 0
    },
    departureTime: {
      type: String,
      required: true
    },
    arrivalTime: {
      type: String,
      required: true
    },
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
    amenities: {
      type: [String],
      default: []
    },
    liveTracking: {
      type: Boolean,
      default: false
    },
    reschedulable: {
      type: Boolean,
      default: false
    },
    operatingDays: {
      type: [String],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Bus', busSchema);