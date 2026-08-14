const Booking = require("../models/booking");

// Create a new booking
exports.addbooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    return res.status(201).json(booking);
  } catch (error) {
    console.error("Error adding booking:", error);
    return res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

// Fetch bookings for a specific customer
exports.getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Direct MongoDB filter query instead of fetching all documents into memory
    const bookings = await Booking.find({ customerId: id }).lean().exec();

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};