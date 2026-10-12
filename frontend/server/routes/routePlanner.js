const express = require('express');
const router = express.Router();
const { createRateLimiter } = require("../middleware/rateLimit");
const planLimit = createRateLimiter({ windowMs: 60 * 1000, max: 30, message: "Too many route requests. Please wait a minute and try again." });
const trafficLimit = createRateLimiter({ windowMs: 60 * 1000, max: 60, message: "Too many live traffic requests. Please wait a minute and try again." });
const plannerController = require('../controller/routePlanner');
const { attachUser, requireVerified, bindCustomer } = require('../middleware/auth');

router.post('/plan', planLimit, plannerController.planRoute);
router.get('/traffic-stream', trafficLimit, plannerController.getLiveTrafficFeed);
router.post('/saved', attachUser, requireVerified, bindCustomer, plannerController.saveCustomRoute);
router.get('/saved/:customerId', attachUser, bindCustomer, plannerController.getUserSavedRoutes);
router.delete('/saved/:routeId', attachUser, requireVerified, bindCustomer, plannerController.deleteSavedRoute);

module.exports = router;
