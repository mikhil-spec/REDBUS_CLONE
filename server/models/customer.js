const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    googleId: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      min: 0,
    },
    gender: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customers", customerSchema);