const Route = require("../models/route");
const Bus = require("../models/bus");
const Booking = require("../models/booking");

exports.getoneroute = async (req, res) => {
  try {
    const { departure, arrival, date } = req.params;

    // 1. Query DB using case-insensitive regex instead of fetching all routes into Node memory
    const route = await Route.findOne({
      "departureLocation.name": { $regex: new RegExp(`^${departure}$`, "i") },
      "arrivalLocation.name": { $regex: new RegExp(`^${arrival}$`, "i") },
    }).lean().exec();

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    // 2. Fetch only buses linked to this specific route ID
    const matchedBuses = await Bus.find({ routes: route._id }).lean().exec();
    const matchedBusIds = matchedBuses.map((bus) => bus._id);

    // 3. Query bookings matching the bus IDs and the target date
    const bookings = await Booking.find({
      busId: { $in: matchedBusIds },
      "departureDetails.date": date,
    }).lean().exec();

    // 4. Map booked seats per bus efficiently
    const busidwithseatobj = {};
    
    matchedBuses.forEach((bus) => {
      const busIdStr = bus._id.toString();
      const busBookings = bookings.filter(
        (b) => b.busId && b.busId.toString() === busIdStr
      );

      const currentBusSeats = busBookings.reduce(
        (acc, b) => acc.concat(b.seats || []),
        []
      );

      busidwithseatobj[busIdStr] = currentBusSeats;
    });

    return res.status(200).json({
      route,
      matchedBuses,
      busidwithseatobj,
    });
  } catch (error) {
    console.error("Error fetching route data:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};