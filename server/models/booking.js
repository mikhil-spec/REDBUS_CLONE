const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passengerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const bookingSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customers",
      required: true,
      index: true,
    },
    busId: {
      type: Schema.Types.ObjectId,
      ref: "Buses",
      required: true,
      index: true,
    },
    passengerDetails: [passengerSchema],
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    fare: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["BOOKED", "CANCELLED", "PENDING"],
      default: "BOOKED",
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    seats: {
      type: [Number],
      required: true,
    },
    departureDetails: {
      city: { type: String, required: true, trim: true },
      time: { type: String, required: true },
      date: { type: String, required: true, index: true },
    },
    arrivalDetails: {
      city: { type: String, required: true, trim: true },
      time: { type: String, required: true },
      date: { type: String, required: true },
    },
    duration: {
      type: String,
      required: true,
    },
    isBusinessTravel: {
      type: Boolean,
      default: false,
    },
    businessDetails: {
      gst: { type: String, default: "" },
      name: { type: String, default: "" },
      address: { type: String, default: "" },
      email: { type: String, default: "" },
    },
    isInsurance: {
      type: Boolean,
      default: false,
    },
    isCovidDonated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookings", bookingSchema);