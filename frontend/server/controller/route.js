const Route = require('../models/route');
const Bus = require('../models/bus');

// Search available buses based on source, destination, and day
exports.searchBusesByRoute = async (req, res) => {
  try {
    const { departure, destination, date } = req.query;

    if (!departure || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Please specify both departure and destination cities.'
      });
    }

    const depCity = departure.trim().toLowerCase();
    const destCity = destination.trim().toLowerCase();

    const buses = await Bus.find({
      departureCity: depCity,
      destinationCity: destCity
    });

    const routeInfo = await Route.findOne({
      departureCity: depCity,
      destinationCity: destCity
    });

    return res.status(200).json({
      success: true,
      totalCount: buses.length,
      routeDetails: routeInfo || null,
      data: buses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error searching available buses.',
      error: error.message
    });
  }
};

// List all distinct cities for source/destination dropdowns
exports.getAllCities = async (req, res) => {
  try {
    const departureCities = await Bus.distinct('departureCity');
    const destinationCities = await Bus.distinct('destinationCity');
    const mergedCities = Array.from(new Set([...departureCities, ...destinationCities])).sort();

    return res.status(200).json({
      success: true,
      data: mergedCities
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch available cities.',
      error: error.message
    });
  }
};

// Add or update a bus inventory entry
exports.createBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Bus created successfully.',
      data: bus
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Unable to create bus record.',
      error: error.message
    });
  }
};

// Buses for one journey, in the shape the seat-selection page reads:
// matchedBuses, busidwithseatobj (booked seat numbers per bus id) and route (cities and duration in hours).
const SEAT_PAGE_BUS_TYPE = {
  "AC Sleeper": "sleeper",
  "Non-AC Sleeper": "standard",
  "AC Seater": "A/C Seater",
  "Non-AC Seater": "standard",
  "Volvo Multi-Axle": "A/C Seater",
};

function minutesOf(hhmm) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || "").trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function cityName(city) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

exports.getBusesForJourney = async (req, res) => {
  try {
    const departure = String(req.params.departure || "").trim().toLowerCase();
    const arrival = String(req.params.arrival || "").trim().toLowerCase();
    if (!departure || !arrival) {
      return res.status(400).json({ success: false, message: "Please specify both departure and arrival cities." });
    }

    const buses = await Bus.find({ departureCity: departure, destinationCity: arrival }).sort({ departureTime: 1 }).lean();
    const routeInfo = await Route.findOne({ departureCity: departure, destinationCity: arrival }).lean();

    // Duration in hours: from the route's text (e.g. "6h 30m") if set, otherwise from the first bus timetable.
    let duration = 0;
    const first = buses[0];
    const departMinutes = minutesOf(first && first.departureTime);
    const arriveMinutes = minutesOf(first && first.arrivalTime);
    if (departMinutes !== null && arriveMinutes !== null) {
      duration = Math.round((((arriveMinutes - departMinutes + 1440) % 1440) / 60) * 10) / 10;
    }
    const estimate = routeInfo && routeInfo.estimatedDuration && /(\d+)\s*h(?:\s*(\d+)\s*m)?/i.exec(routeInfo.estimatedDuration);
    if (estimate) {
      duration = Number(estimate[1]) + (estimate[2] ? Number(estimate[2]) / 60 : 0);
    }

    const matchedBuses = buses.map((bus) => ({
      _id: String(bus._id),
      busName: bus.busName,
      busNumber: bus.busNumber,
      operatorName: bus.companyName,
      busType: SEAT_PAGE_BUS_TYPE[bus.busType] || "standard",
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      fare: bus.fare,
      totalSeats: bus.totalSeats,
      rating: bus.rating || 0,
      busTypeName: bus.busType,
      amenities: bus.amenities || [],
      liveTracking: bus.liveTracking ? 1 : 0,
      reschedulable: bus.reschedulable ? 1 : 0,
    }));

    const busidwithseatobj = {};
    buses.forEach((bus) => {
      busidwithseatobj[String(bus._id)] = bus.bookedSeats || [];
    });

    return res.status(200).json({
      success: true,
      matchedBuses,
      busidwithseatobj,
      route: {
        departureLocation: { name: cityName(departure) },
        arrivalLocation: { name: cityName(arrival) },
        duration,
        distanceKm: routeInfo ? routeInfo.distanceKm : null,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error loading buses for this journey.", error: error.message });
  }
};

// Every route that has buses, with the number of buses. The From and To menus on the home page use this list.
exports.getRoutePairs = async (req, res) => {
  try {
    const rows = await Bus.aggregate([
      { $group: { _id: { departureCity: "$departureCity", destinationCity: "$destinationCity" }, busCount: { $sum: 1 } } },
      { $sort: { "_id.departureCity": 1, "_id.destinationCity": 1 } },
    ]);
    const data = rows.map((row) => ({
      departure: row._id.departureCity,
      destination: row._id.destinationCity,
      busCount: row.busCount,
    }));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load routes.", error: error.message });
  }
};
