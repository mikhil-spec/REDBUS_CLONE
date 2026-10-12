const express = require('express');
const router = express.Router();
const { createRateLimiter } = require("../middleware/rateLimit");
const googleLimit = createRateLimiter({ windowMs: 60 * 1000, max: 20, message: "Too many sign-in attempts. Please wait a minute and try again." });
const authController = require('../controller/auth');

router.post('/google', googleLimit, authController.googleLogin);

module.exports = router;
