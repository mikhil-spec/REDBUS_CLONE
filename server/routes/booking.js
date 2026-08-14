const express = require("express");
const router = express.Router();
const bookingController = require("../controller/booking");

// @route   POST /booking
// @desc    Create a new bus booking
router.post("/booking", bookingController.addbooking);

// @route   GET /booking/:id
// @desc    Get all bookings for a specific customer ID
router.get("/booking/:id", bookingController.getBooking);

module.exports = router;