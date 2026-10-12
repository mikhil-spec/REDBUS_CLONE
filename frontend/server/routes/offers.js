const express = require("express");
const router = express.Router();
const { evaluateOffer } = require("../utils/offers");
const { createRateLimiter } = require("../middleware/rateLimit");

const validateLimit = createRateLimiter({ windowMs: 60 * 1000, max: 60 });

// Checks an offer code for a route and amount. Returns the discount when the code can be used.
router.post("/validate", validateLimit, (req, res) => {
  const { code, departure, destination, amount } = req.body || {};
  const result = evaluateOffer({ code, departure, destination, amount });
  return res.status(200).json({ success: result.valid, ...result });
});

module.exports = router;
