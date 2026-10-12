const Booking = require('../models/booking');
const Notification = require('../models/notification');
const { dispatchNotification, retryFailedNotification } = require('./notificationDispatcher');
const { getScheduledJourney } = require('../utils/journeyTime');

const HOUR_MS = 60 * 60 * 1000;
let timer = null;
let runningReminders = false;
let runningCompletions = false;

// Reminders use the boarding-point time when the traveler chose one, otherwise the bus departure.
function reminderDepartureAt(booking) {
  const boardingTime = /^\d{1,2}:\d{2}$/.test(String(booking.boardingPoint?.time || '').trim())
    ? String(booking.boardingPoint.time).trim()
    : undefined;
  return getScheduledJourney(booking, { departureTime: boardingTime })?.departureAt || null;
}

async function processJourneyReminders() {
  if (runningReminders) return;
  runningReminders = true;
  try {
    const now = Date.now();
    // Date-only journey dates are stored at UTC midnight, so widen the window generously.
    const bookings = await Booking.find({
      bookingStatus: 'Confirmed',
      journeyDate: { $gte: new Date(now - 36 * HOUR_MS), $lte: new Date(now + 26 * HOUR_MS) },
    }).populate('bus', 'busName departureTime arrivalTime');

    for (const booking of bookings) {
      // Isolate each booking so one bad record cannot stop reminders for everyone else.
      try {
        const start = reminderDepartureAt(booking);
        if (!start) continue;
        const hours = (start.getTime() - now) / HOUR_MS;
        let reminderKey = null;
        if (hours <= 24 && hours > 2) reminderKey = `journey:${booking._id}:${start.getTime()}:24h`;
        else if (hours <= 2 && hours > 0) reminderKey = `journey:${booking._id}:${start.getTime()}:2h`;
        if (!reminderKey) continue;

        const exists = await Notification.exists({ 'metadata.reminderKey': reminderKey });
        if (exists) continue;

        await dispatchNotification({
          recipientId: booking.customer,
          eventType: 'JOURNEY_REMINDER',
          templateData: {
            pnr: booking.pnr,
            departure: booking.departureCity.toUpperCase(),
            destination: booking.destinationCity.toUpperCase(),
            busName: booking.bus?.busName || 'Your bus',
            time: booking.boardingPoint?.time || booking.bus?.departureTime || '',
            boardingPoint: booking.boardingPoint?.location || booking.departureCity,
          },
          metadata: { pnr: booking.pnr, journeyDate: booking.journeyDate, reminderKey },
        });
      } catch (error) {
        console.error('[Notification Scheduler] reminder failed for', String(booking._id), error.message);
      }
    }
  } catch (error) {
    console.error('[Notification Scheduler]', error.message);
  } finally {
    runningReminders = false;
  }
}

// Marks confirmed journeys as Completed once their scheduled arrival has passed.
// This is the only automatic path to review eligibility; moderators can also complete a journey manually.
async function processJourneyCompletions() {
  if (runningCompletions) return;
  runningCompletions = true;
  try {
    const now = Date.now();
    const candidates = await Booking.find({
      bookingStatus: 'Confirmed',
      journeyDate: { $gte: new Date(now - 4 * 24 * HOUR_MS), $lte: new Date(now) },
    }).populate('bus', 'departureTime arrivalTime');

    for (const booking of candidates) {
      try {
        const journey = getScheduledJourney(booking);
        if (!journey || !journey.arrivalAt || journey.arrivalAt.getTime() > now) continue;
        // Guarded update: only transitions a booking that is still Confirmed.
        await Booking.updateOne(
          { _id: booking._id, bookingStatus: 'Confirmed' },
          { $set: { bookingStatus: 'Completed', completedAt: new Date(), completedBy: null } },
        );
      } catch (error) {
        console.error('[Journey Completion] failed for', String(booking._id), error.message);
      }
    }
  } catch (error) {
    console.error('[Journey Completion]', error.message);
  } finally {
    runningCompletions = false;
  }
}

async function processNotificationRetries() {
  try {
    const records = await Notification.find({
      deliveryStatus: { $in: ['failed', 'partially_delivered'] },
      retryCount: { $lt: 3 },
      nextRetryAt: { $lte: new Date() }
    }).limit(50);
    for (const record of records) {
      try { await retryFailedNotification(record._id); }
      catch (error) { console.error('[Notification Retry]', error.message); }
    }
  } catch (error) {
    console.error('[Notification Retry Worker]', error.message);
  }
}

function runAll() {
  processJourneyCompletions();
  processJourneyReminders();
  processNotificationRetries();
}

function startNotificationScheduler() {
  if (timer) return;
  runAll();
  timer = setInterval(runAll, 60 * 1000);
}

module.exports = { startNotificationScheduler, processJourneyReminders, processJourneyCompletions };
