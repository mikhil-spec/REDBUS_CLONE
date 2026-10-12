// Sample buses for every route a traveler can search.
//
// Guarantee: on every route, every combination of up to three filter values has at least one bus.
// Filter values are: a departure slot, an arrival slot, a bus-type group, live tracking, reschedulable,
// and any set of amenities. Departure, arrival and bus-type values are OR-ed in the page, so at most one value
// from each of those groups is used in a combination. Each bus has its own departure and arrival times.
// The bus selection is the same on every route and is saved in seed-bus-templates.json.

const fs = require("fs");
const path = require("path");

const SLOT_START = [0, 6, 12, 18]; // before 6 am, 6 am to 12 pm, 12 pm to 6 pm, after 6 pm
const TYPE_GROUPS = {
  Seater: ["AC Seater", "Non-AC Seater"],
  Sleeper: ["AC Sleeper", "Non-AC Sleeper"],
  Ac: ["AC Seater", "AC Sleeper", "Volvo Multi-Axle"],
  Nonac: ["Non-AC Seater", "Non-AC Sleeper"],
};
const BUS_TYPES = ["AC Seater", "AC Sleeper", "Non-AC Seater", "Non-AC Sleeper", "Volvo Multi-Axle"];
const AMENITIES = ["wifi", "waterBottle", "blankets", "chargingPoint", "movie"];
// Every subset of the five amenities (32 sets).
const AMENITY_SETS = Array.from({ length: 32 }, (_, mask) => AMENITIES.filter((_, bit) => mask & (1 << bit)));
const OPERATORS = ["Royal Cruiser", "Golden Route", "Blue Horizon", "City Connect", "Desert Star", "Coastal Rider", "Hill Runner", "Sun Express"];
const TEMPLATE_FILE = path.join(__dirname, "seed-bus-templates.json");

// Cities in the From and To menus on the home page.
const FROM_CITIES = ["delhi", "mumbai", "bangalore", "kolkata", "chennai"];
const TO_CITIES = ["jaipur", "goa", "mysore", "darjeeling", "pondicherry"];

const pad = (n) => String(n).padStart(2, "0");

function slotOf(time) {
  return Math.floor(Number(String(time).split(":")[0]) / 6);
}

function groupsOf(busType) {
  return Object.keys(TYPE_GROUPS).filter((group) => TYPE_GROUPS[group].includes(busType));
}

// The filter values a bus satisfies, each with the group it belongs to.
function featuresOf(bus) {
  const features = [
    { cat: "dep", val: `d${bus.dep}` },
    { cat: "arr", val: `a${bus.arr}` },
  ];
  for (const group of groupsOf(bus.type)) features.push({ cat: "grp", val: `g${group}` });
  // The individual bus type must appear on every route; it is never combined with other values.
  features.push({ cat: "type", val: `t:${bus.type}` });
  if (bus.live) features.push({ cat: "live", val: "live" });
  if (bus.resch) features.push({ cat: "resch", val: "resch" });
  for (const amenity of bus.amen) features.push({ cat: "am", val: `am:${amenity}` });
  return features;
}

// Every combination of one to three filter values that the page can apply together.
function combinationKeys(features) {
  const keys = [];
  const usable = (indexes) => {
    const seen = new Set();
    for (const i of indexes) {
      const cat = features[i].cat;
      if (cat === "am") continue;
      if (seen.has(cat)) return false;
      seen.add(cat);
    }
    return true;
  };
  const key = (indexes) => indexes.map((i) => features[i].val).sort().join("|");
  const combinable = (i) => features[i].cat !== "type";
  for (let i = 0; i < features.length; i++) {
    keys.push(key([i]));
    if (!combinable(i)) continue;
    for (let j = i + 1; j < features.length; j++) {
      if (!combinable(j) || !usable([i, j])) continue;
      keys.push(key([i, j]));
      for (let k = j + 1; k < features.length; k++) {
        if (combinable(k) && usable([i, j, k])) keys.push(key([i, j, k]));
      }
    }
  }
  return keys;
}

// Every bus description the generator may choose from.
function allCandidates() {
  const list = [];
  for (let dep = 0; dep < 4; dep++) for (let arr = 0; arr < 4; arr++) for (const type of BUS_TYPES) {
    for (const live of [true, false]) for (const resch of [true, false]) for (const amen of AMENITY_SETS) {
      list.push({ dep, arr, type, live, resch, amen });
    }
  }
  return list;
}

let universeCache = null;
function universe() {
  if (!universeCache) {
    universeCache = new Set();
    for (const c of allCandidates()) combinationKeys(featuresOf(c)).forEach((k) => universeCache.add(k));
  }
  return universeCache;
}

let templateCache = null;

// The buses that cover every combination. Loaded from the saved file when present, otherwise computed.
function chooseTemplates() {
  if (templateCache) return templateCache;
  if (fs.existsSync(TEMPLATE_FILE)) {
    templateCache = JSON.parse(fs.readFileSync(TEMPLATE_FILE, "utf8"));
    return templateCache;
  }
  templateCache = computeTemplates();
  return templateCache;
}

// Turns live tracking and reschedulable off on about half of the buses, but only where every combination
// that bus covers is still covered by another bus. This makes those filters remove some buses, not none.
function balanceFlags(chosen) {
  const count = new Map();
  const keysOf = (c) => combinationKeys(featuresOf(c));
  chosen.forEach((c) => keysOf(c).forEach((k) => count.set(k, (count.get(k) || 0) + 1)));
  for (const flag of ["live", "resch"]) {
    const target = Math.floor(chosen.length / 2);
    let on = chosen.filter((c) => c[flag]).length;
    for (const c of chosen) {
      if (on <= target) break;
      if (!c[flag]) continue;
      const before = new Set(keysOf(c));
      const trial = { ...c, [flag]: false };
      const after = new Set(keysOf(trial));
      const lost = [...before].filter((k) => !after.has(k));
      if (lost.every((k) => count.get(k) > 1)) {
        lost.forEach((k) => count.set(k, count.get(k) - 1));
        c[flag] = false;
        on -= 1;
      }
    }
  }
  return chosen;
}

function computeTemplates() {
  const candidates = allCandidates().map((c) => ({ c, keys: combinationKeys(featuresOf(c)) }));
  const uncovered = new Set(universe());
  const chosen = [];
  while (uncovered.size > 0) {
    let best = null;
    let bestCount = 0;
    for (const x of candidates) {
      let count = 0;
      for (const k of x.keys) if (uncovered.has(k)) count++;
      if (count > bestCount) { best = x; bestCount = count; }
    }
    if (!best) break;
    chosen.push(best.c);
    best.keys.forEach((k) => uncovered.delete(k));
  }
  return balanceFlags(chosen);
}

// Combinations that no bus in the list satisfies (empty when every combination has a bus).
function coverageGaps(buses) {
  const covered = new Set();
  for (const bus of buses) {
    combinationKeys(featuresOf({
      dep: slotOf(bus.departureTime),
      arr: slotOf(bus.arrivalTime),
      type: bus.busType,
      live: bus.liveTracking,
      resch: bus.reschedulable,
      amen: bus.amenities || [],
    })).forEach((k) => covered.add(k));
  }
  return [...universe()].filter((k) => !covered.has(k));
}

function durationOf(departureHour, arrivalHour) {
  return (arrivalHour - departureHour + 24) % 24;
}

function buildRouteBuses(departure, arrival, routeIndex) {
  return chooseTemplates().map((t, k) => {
    const depHour = SLOT_START[t.dep] + ((k + routeIndex) % 6);
    let arrOffset = (k * 5 + 2 + routeIndex) % 6;
    let arrHour = SLOT_START[t.arr] + arrOffset;
    for (let tries = 0; tries < 6 && (arrHour === depHour || durationOf(depHour, arrHour) === 0); tries++) {
      arrOffset = (arrOffset + 1) % 6;
      arrHour = SLOT_START[t.arr] + arrOffset;
    }
    const operator = OPERATORS[(k + routeIndex) % OPERATORS.length];
    const seats = k % 2 === 0 ? 36 : 40;
    return {
      busName: `${operator} ${k + 1}`,
      busNumber: `CAT-${departure.toUpperCase()}-${arrival.toUpperCase()}-${k + 1}`,
      busType: t.type,
      companyName: operator,
      rating: 3.5 + (k % 3) * 0.5,
      totalSeats: seats,
      availableSeats: seats,
      fare: 300 + k * 60 + durationOf(depHour, arrHour) * 25,
      departureTime: `${pad(depHour)}:00`,
      arrivalTime: `${pad(arrHour)}:00`,
      departureCity: departure,
      destinationCity: arrival,
      amenities: [...t.amen],
      liveTracking: t.live,
      reschedulable: t.resch,
    };
  });
}

// The selectable routes, plus the sample routes from seed-reviews.js (duplicates are skipped).
function buildCatalog() {
  const { BUSES } = require("./seed-reviews");
  const routes = [];
  const seen = new Set();
  const add = (departure, arrival) => {
    const key = `${departure}-${arrival}`;
    if (!seen.has(key)) { seen.add(key); routes.push({ departure, arrival }); }
  };
  for (const from of FROM_CITIES) for (const to of TO_CITIES) add(from, to);
  for (const bus of BUSES) add(bus.departureCity, bus.destinationCity);

  const buses = [];
  routes.forEach((route, index) => buses.push(...buildRouteBuses(route.departure, route.arrival, index)));
  return { routes, buses };
}

module.exports = { buildCatalog, buildRouteBuses, chooseTemplates, computeTemplates, coverageGaps, universe, slotOf, AMENITIES, BUS_TYPES, TYPE_GROUPS, TEMPLATE_FILE };

// Run with: npm run seed:buses
if (require.main === module) {
  require("dotenv").config();
  const mongoose = require("mongoose");
  const Bus = require("./models/bus");
  (async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/redbus_db");
      console.log(`[Seed] connected to database "${mongoose.connection.name}" on ${mongoose.connection.host}`);
      const { routes, buses } = buildCatalog();
      // Upsert (not delete and re-insert) so bus ids stay stable: sample reviews reference these buses.
      const wanted = buses.map((b) => b.busNumber);
      await Bus.bulkWrite(buses.map((b) => ({ updateOne: { filter: { busNumber: b.busNumber }, update: { $set: b }, upsert: true } })));
      const stale = await Bus.deleteMany({ busNumber: { $regex: /^CAT-/, $nin: wanted } });
      console.log(`[Seed] upserted ${buses.length} catalog buses on ${routes.length} routes; removed ${stale.deletedCount} stale catalog buses.`);
      console.log(`[Seed] Database now holds ${await Bus.countDocuments({ busNumber: /^CAT-/ })} catalog buses.`);
    } catch (error) {
      console.error("[Seed] failed:", error.message);
      process.exitCode = 1;
    } finally {
      await mongoose.disconnect().catch(() => {});
    }
  })();
}
