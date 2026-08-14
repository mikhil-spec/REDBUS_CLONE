const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subLocations: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const routesSchema = new Schema(
  {
    departureLocation: {
      type: locationSchema,
      required: true,
    },
    arrivalLocation: {
      type: locationSchema,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast route queries by departure & arrival location names
routesSchema.index({
  "departureLocation.name": 1,
  "arrivalLocation.name": 1,
});

module.exports = mongoose.model("Routes", routesSchema);