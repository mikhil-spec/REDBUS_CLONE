const express = require('express');
const router = express.Router();
const { createRateLimiter } = require("../middleware/rateLimit");
const bookingLimit = createRateLimiter({ windowMs: 60 * 1000, max: 20, message: "Too many booking attempts. Please wait a minute and try again." });
const bookingController = require('../controller/booking');
const { attachUser, bindCustomer, requireModerator } = require('../middleware/auth');

// Bookings are always made for the authenticated traveler (customerId is bound
// server-side), so one customer can never book or change another customer's trip.
router.post('/', bookingLimit, attachUser, bindCustomer, bookingController.addBooking);
// Must stay above "/:pnr", otherwise "mine" would be read as a PNR.
router.get('/mine', attachUser, bookingController.getMyBookings);
router.get('/:pnr', bookingController.getBooking);
router.get('/', bookingController.getBooking);
router.put('/cancel/:pnr', attachUser, bookingController.cancelBooking);
router.delete('/:id', attachUser, bookingController.cancelBooking);
router.patch('/:pnr/complete', attachUser, requireModerator, bookingController.completeBooking);
router.patch('/:pnr/schedule', attachUser, requireModerator, bookingController.changeSchedule);

module.exports = router;
