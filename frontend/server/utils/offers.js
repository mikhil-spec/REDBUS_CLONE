// Offer codes shown on the home page. Each code gives a flat discount on eligible routes, valid until 30 Nov 2026.
// A route is eligible when its departure or destination city is in one of the listed states.

const VALID_UNTIL = new Date("2026-11-30T23:59:59+05:30");

const CITY_STATE = {
  delhi: "DL", agra: "UP", chandigarh: "CH",
  mumbai: "MH", pune: "MH", nashik: "MH", mahabaleshwar: "MH",
  bangalore: "KA", mysore: "KA",
  kolkata: "WB", darjeeling: "WB",
  chennai: "TN", madurai: "TN",
  pondicherry: "PY",
  jaipur: "RJ",
  goa: "GA",
  hyderabad: "TS",
  vijayawada: "AP",
  kochi: "KL", munnar: "KL", trivandrum: "KL",
};

const OFFERS = {
  FIRST: { amount: 250, states: null },
  SUPERHIT: { amount: 300, states: ["AP", "TS"] },
  BUS300: { amount: 300, states: ["RJ", "MH", "GA", "MP"] },
  RBTRIP: { amount: 200, states: ["KL"] },
};

const MESSAGES = {
  unknown: "This offer code is not valid.",
  expired: "This offer has expired.",
  not_eligible: "This offer does not apply to this route.",
};

function stateOf(city) {
  return CITY_STATE[String(city || "").trim().toLowerCase()] || null;
}

// Returns whether the code can be used on the route, and the discount for an amount.
function evaluateOffer({ code, departure, destination, amount, now = new Date() }) {
  const key = String(code || "").trim().toUpperCase();
  const offer = Object.prototype.hasOwnProperty.call(OFFERS, key) ? OFFERS[key] : null;
  if (!offer) return { valid: false, reason: "unknown", message: MESSAGES.unknown };
  if (now.getTime() > VALID_UNTIL.getTime()) return { valid: false, reason: "expired", message: MESSAGES.expired };
  if (offer.states) {
    const states = [stateOf(departure), stateOf(destination)];
    if (!states.some((state) => state && offer.states.includes(state))) {
      return { valid: false, reason: "not_eligible", message: MESSAGES.not_eligible };
    }
  }
  const total = Math.max(0, Number(amount) || 0);
  return { valid: true, reason: "ok", code: key, discount: Math.min(offer.amount, total), message: "" };
}

module.exports = { evaluateOffer, stateOf, OFFERS, VALID_UNTIL };
