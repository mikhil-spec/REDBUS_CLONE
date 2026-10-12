// Seats are reserved and released with single conditional updates on the bus document. MongoDB applies each
// update atomically, so two bookings can never take the same seat, even when they arrive at the same moment.
const Bus = require("../models/bus");

async function reserveSeats(busId, seats) {
  const result = await Bus.updateOne(
    { _id: busId, bookedSeats: { $nin: seats } },
    [
      { $set: { bookedSeats: { $concatArrays: [{ $ifNull: ["$bookedSeats", []] }, seats] } } },
      { $set: { availableSeats: { $subtract: ["$totalSeats", { $size: "$bookedSeats" }] } } },
    ],
  );
  if (result.matchedCount === 1) return { ok: true, taken: [] };
  const bus = await Bus.findById(busId).select("bookedSeats").lean();
  const current = (bus && bus.bookedSeats) || [];
  const taken = seats.filter((seat) => current.includes(seat));
  return { ok: false, taken: taken.length > 0 ? taken : [...seats] };
}

async function releaseSeats(busId, seats) {
  await Bus.updateOne({ _id: busId }, [
    { $set: { bookedSeats: { $setDifference: [{ $ifNull: ["$bookedSeats", []] }, seats] } } },
    { $set: { availableSeats: { $subtract: ["$totalSeats", { $size: "$bookedSeats" }] } } },
  ]);
}

module.exports = { reserveSeats, releaseSeats };
