// Timezone-safe scheduling helpers for bus journeys.
//
// Bus timetables ("21:00", "06:30") are written in the operator's local time.
// They must NOT be applied with setHours(), because that uses the server's
// timezone (usually UTC on hosting platforms), which shifts every departure
// and arrival by hours. Times are instead converted using a fixed offset.
// India Standard Time is UTC+05:30 (330 minutes); override with
// BUS_TIMEZONE_OFFSET_MINUTES if the operator is elsewhere.

const DEFAULT_OFFSET_MINUTES = 330;
const DAY_MS = 24 * 60 * 60 * 1000;

function getOffsetMinutes() {
  const configured = Number(process.env.BUS_TIMEZONE_OFFSET_MINUTES);
  return Number.isFinite(configured) ? configured : DEFAULT_OFFSET_MINUTES;
}

// Accepts "HH:MM" (24-hour). Returns null for anything else.
function parseClock(value) {
  const match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

// Calendar day (year/month/day) that the journey falls on in the operator's timezone.
function journeyCalendarDay(journeyDate, offsetMinutes = getOffsetMinutes()) {
  const date = new Date(journeyDate);
  if (Number.isNaN(date.getTime())) return null;
  const shifted = new Date(date.getTime() + offsetMinutes * 60 * 1000);
  return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth(), day: shifted.getUTCDate() };
}

// Convert a local wall-clock time on a given operator day into a UTC Date.
function zonedToUtc(day, clock, offsetMinutes) {
  return new Date(Date.UTC(day.year, day.month, day.day, clock.hours, clock.minutes) - offsetMinutes * 60 * 1000);
}

// Returns { departureAt, arrivalAt } as UTC Date objects, or null when the
// journey date or bus timetable cannot be parsed.
// arrivalAt rolls over to the next day when it is not after departureAt
// (overnight buses, e.g. depart 21:00 and arrive 06:30).
// options.departureTime overrides the bus departure (e.g. a boarding-point time).
function getScheduledJourney(booking, options = {}) {
  const offsetMinutes = options.offsetMinutes ?? getOffsetMinutes();
  const day = journeyCalendarDay(booking.journeyDate, offsetMinutes);
  const departure = parseClock(options.departureTime || booking.bus?.departureTime);
  const arrival = parseClock(booking.bus?.arrivalTime);
  if (!day || !departure) return null;

  const departureAt = zonedToUtc(day, departure, offsetMinutes);
  if (!arrival) return { departureAt, arrivalAt: null };

  let arrivalAt = zonedToUtc(day, arrival, offsetMinutes);
  if (arrivalAt.getTime() <= departureAt.getTime()) {
    arrivalAt = new Date(arrivalAt.getTime() + DAY_MS);
  }
  return { departureAt, arrivalAt };
}

module.exports = { getOffsetMinutes, parseClock, journeyCalendarDay, getScheduledJourney, DEFAULT_OFFSET_MINUTES };
