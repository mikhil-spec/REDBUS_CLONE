const Booking = require("../models/booking");
const Bus = require("../models/bus");
const Customer = require("../models/customer");
const { dispatchNotification } = require("../services/notificationDispatcher");
const { getScheduledJourney } = require("../utils/journeyTime");

// to generate a unique readable PNR
const generatePNR = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "RB-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const isModeratorUser = (user) => ["moderator", "admin"].includes(user?.role);

const { reserveSeats, releaseSeats } = require("../utils/seatReservation");
const { evaluateOffer } = require("../utils/offers");

// The payment page sends its own field names. Convert them to the booking format before validation.
function toSeatNumber(value) {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) return value;
  if (value && typeof value === "object") return toSeatNumber(value.seatNumber ?? value.seat ?? value.number);
  const parsed = parseInt(String(value ?? ""), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function normalizeGender(value) {
  const text = String(value || "").toLowerCase();
  if (text.startsWith("m")) return "Male";
  if (text.startsWith("f")) return "Female";
  return "Other";
}

function normalizeBookingPayload(raw = {}) {
  const body = { ...raw };
  if (!Array.isArray(body.selectedSeats) && Array.isArray(body.seats)) {
    body.selectedSeats = body.seats.map(toSeatNumber).filter(Boolean);
  }
  if (!body.journeyDate && body.departureDetails && body.departureDetails.date) {
    body.journeyDate = body.departureDetails.date;
  }
  if (!Array.isArray(body.passengers) || body.passengers.length === 0) {
    const source = Array.isArray(body.passengerDetails) ? body.passengerDetails : [];
    const seats = Array.isArray(body.selectedSeats) ? body.selectedSeats : [];
    body.passengers = source.map((passenger, index) => {
      const age = Number(passenger && passenger.age);
      return {
        name: String((passenger && (passenger.name || passenger.passengerName)) || "Passenger").trim().slice(0, 80) || "Passenger",
        gender: normalizeGender(passenger && passenger.gender),
        age: Number.isInteger(age) && age >= 1 && age <= 120 ? age : 30,
        seatNumber: toSeatNumber(passenger && (passenger.seatNumber ?? passenger.seat)) || seats[index] || 1,
      };
    });
  }
  return body;
}

// process new Seat Reservation with automated notification dispatch
const addBooking = async (req, res) => {
  try {
    req.body = normalizeBookingPayload(req.body);
    const {
      busId,
      customerId,
      journeyDate,
      selectedSeats,
      passengers,
      boardingPoint,
      droppingPoint,
    } = req.body;

    if (!busId || !customerId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "busId, customerId, and selectedSeats are required.",
      });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found.",
      });
    }

    // A booking for a departure that has already left could later be
    // auto-completed and reviewed without the journey ever taking place.
    const schedule = getScheduledJourney({ journeyDate: journeyDate || Date.now(), bus });
    if (schedule && schedule.departureAt.getTime() <= Date.now()) {
      return res.status(400).json({
        success: false,
        message: "This departure has already left. Please choose an upcoming journey.",
      });
    }

    // Offer code: checked against this journey before any seat is reserved.
    const grossFare = bus.fare * selectedSeats.length;
    let discountAmount = 0;
    const offerCode = req.body.offerCode ? String(req.body.offerCode).trim().toUpperCase() : "";
    if (offerCode) {
      const offer = evaluateOffer({
        code: offerCode,
        departure: bus.departureCity,
        destination: bus.destinationCity,
        amount: grossFare,
      });
      if (!offer.valid) {
        return res.status(400).json({ success: false, reason: offer.reason, message: offer.message });
      }
      discountAmount = offer.discount;
    }

    // All seats are reserved in one atomic update. If any seat is already taken, nothing is reserved.
    const reservation = await reserveSeats(bus._id, selectedSeats);
    if (!reservation.ok) {
      return res.status(409).json({
        success: false,
        message: `Seats [${reservation.taken.join(", ")}] have already been booked.`,
      });
    }

    const createdPnr = generatePNR();
    let booking;
    try {
      booking = await Booking.create({
        pnr: createdPnr,
        customer: customerId,
        bus: busId,
        departureCity: bus.departureCity,
        destinationCity: bus.destinationCity,
        journeyDate: new Date(journeyDate || Date.now()),
        seatsBooked: selectedSeats,
        passengers: passengers || [],
        totalFare: grossFare - discountAmount,
        discountAmount,
        offerCode: offerCode || undefined,
        boardingPoint,
        droppingPoint,
        bookingStatus: "Confirmed",
      });
    } catch (createError) {
      // The booking was not saved, so the seats are given back.
      await releaseSeats(bus._id, selectedSeats);
      throw createError;
    }

    const populated = await Booking.findById(booking._id)
      .populate("customer", "name email phone notificationPreferences")
      .populate(
        "bus",
        "busName busNumber companyName departureTime arrivalTime",
      );

    // trigger async Multi-channel booking confirmation notification
    try {
      await dispatchNotification({
        recipientId: customerId,
        eventType: "BOOKING_CONFIRMATION",
        templateData: {
          pnr: createdPnr,
          departure: bus.departureCity.toUpperCase(),
          destination: bus.destinationCity.toUpperCase(),
          busName: bus.busName,
          seats: selectedSeats.join(", "),
        },
        metadata: {
          pnr: createdPnr,
          busName: bus.busName,
          journeyDate: booking.journeyDate,
        },
      });
    } catch (notifyErr) {
      console.error("[Notification Dispatch Warning]:", notifyErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Booking confirmed and notification dispatched!",
      data: populated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Booking failed.",
      error: error.message,
    });
  }
};

// Retrieve Booking by PNR or ID. Customer contact details are reduced to the
// traveler name so that a PNR lookup does not expose account secrets.
const getBooking = async (req, res) => {
  try {
    const identifier = req.params.pnr || req.query.pnr || req.params.id;
    if (!identifier) {
      return res
        .status(400)
        .json({ success: false, message: "PNR or Booking ID is required." });
    }

    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId
      ? { _id: identifier }
      : { pnr: identifier.toUpperCase() };

    const booking = await Booking.findOne(query)
      .populate("customer", "name avatar")
      .populate("bus");
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error looking up booking.",
      error: error.message,
    });
  }
};

// cancel an existing ticket and dispatch cancellation notification.
// Only the booking owner or a moderator/admin may cancel.
const cancelBooking = async (req, res) => {
  try {
    const identifier = (req.params.pnr || req.params.id || "").toUpperCase();
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: identifier } : { pnr: identifier };

    const booking = await Booking.findOne(query);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });
    }

    const isOwner = String(booking.customer) === String(req.user?._id);
    if (!isOwner && !isModeratorUser(req.user)) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own bookings.",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Booking is already cancelled." });
    }

    if (booking.bookingStatus === "Completed") {
      return res.status(400).json({
        success: false,
        message: "A completed journey cannot be cancelled.",
      });
    }

    if (booking.bus) {
      await releaseSeats(booking.bus, booking.seatsBooked);
    }
    booking.bookingStatus = "Cancelled";
    await booking.save();

    // trigger Booking Cancellation notification
    try {
      await dispatchNotification({
        recipientId: booking.customer,
        eventType: "BOOKING_CANCELLATION",
        templateData: {
          pnr: booking.pnr,
          departure: booking.departureCity.toUpperCase(),
          destination: booking.destinationCity.toUpperCase(),
        },
        metadata: {
          pnr: booking.pnr,
        },
      });
    } catch (notifyErr) {
      console.error("[Notification Dispatch Warning]:", notifyErr.message);
    }

    return res.status(200).json({
      success: true,
      message: `Booking ${booking.pnr} has been cancelled. Cancellation alert sent.`,
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error cancelling booking.",
      error: error.message,
    });
  }
};

// Moderator/admin confirms that a journey was completed (for example, from
// operator manifest data). Only completed bookings can be reviewed.
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ pnr: String(req.params.pnr).toUpperCase() });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });
    if (booking.bookingStatus !== "Confirmed") {
      return res.status(400).json({
        success: false,
        message: `Only confirmed bookings can be completed (current status: ${booking.bookingStatus}).`,
      });
    }

    booking.bookingStatus = "Completed";
    booking.completedAt = new Date();
    booking.completedBy = req.user._id;
    await booking.save();

    return res.status(200).json({ success: true, message: "Journey marked as completed.", data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to complete booking.", error: error.message });
  }
};

const changeSchedule = async (req, res) => {
  try {
    const booking = await Booking.findOne({ pnr: String(req.params.pnr).toUpperCase() });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    if (booking.bookingStatus === 'Cancelled') return res.status(400).json({ success: false, message: 'Cancelled booking cannot be rescheduled.' });
    if (booking.bookingStatus === 'Completed') return res.status(400).json({ success: false, message: 'Completed journey cannot be rescheduled.' });

    const { journeyDate, boardingPoint, droppingPoint, newTime } = req.body || {};

    let newClock = null;
    if (newTime !== undefined && newTime !== null && String(newTime).trim() !== '') {
      newClock = String(newTime).trim();
      if (!/^([01]?\d|2[0-3]):[0-5]\d$/.test(newClock)) {
        return res.status(400).json({ success: false, message: 'newTime must be a 24-hour time such as 06:30.' });
      }
    }

    if (journeyDate) {
      const parsedDate = new Date(journeyDate);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ success: false, message: 'journeyDate is not a valid date.' });
      }
      booking.journeyDate = parsedDate;
    }
    if (boardingPoint) booking.boardingPoint = { ...booking.boardingPoint?.toObject?.(), ...boardingPoint };
    if (droppingPoint) booking.droppingPoint = { ...booking.droppingPoint?.toObject?.(), ...droppingPoint };
    // A revised departure time becomes the boarding time, so the stored booking, the
    // reminders and the notification all agree on the same time.
    if (newClock) booking.boardingPoint = { location: booking.boardingPoint?.location, time: newClock };

    await booking.save();

    let notified = true;
    try {
      await dispatchNotification({
        recipientId: booking.customer,
        eventType: 'SCHEDULE_CHANGE',
        templateData: {
          pnr: booking.pnr,
          departure: booking.departureCity.toUpperCase(),
          destination: booking.destinationCity.toUpperCase(),
          busName: 'Your booked bus',
          newTime: String(newClock || booking.boardingPoint?.time || 'updated time').slice(0, 40),
        },
        metadata: { pnr: booking.pnr, journeyDate: booking.journeyDate },
      });
    } catch (notifyError) {
      // The schedule is already saved; a delivery problem must not report the change as failed.
      notified = false;
      console.error('[Notification Dispatch Warning]:', notifyError.message);
    }

    return res.status(200).json({
      success: true,
      message: notified
        ? 'Journey schedule updated and notification dispatched.'
        : 'Journey schedule updated. The notification could not be dispatched; check the delivery log.',
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to change journey schedule.', error: error.message });
  }
};

// The signed-in traveler's own bookings, newest journey first.
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .sort({ journeyDate: -1 })
      .limit(50)
      .populate("bus", "busName busNumber companyName departureTime arrivalTime")
      .select("pnr bookingStatus journeyDate seatsBooked totalFare departureCity destinationCity bus createdAt");
    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load your bookings.", error: error.message });
  }
};

module.exports = {
  normalizeBookingPayload,
  addBooking,
  getMyBookings,
  getBooking,
  cancelBooking,
  completeBooking,
  createBooking: addBooking,
  getBookingByPNR: getBooking,
  changeSchedule,
};
