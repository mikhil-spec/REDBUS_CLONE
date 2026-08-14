const express = require("express");
const router = express.Router();
const routeController = require("../controller/route");

// @route   GET /routes/:departure/:arrival/:date
// @desc    Fetch matching route, buses, and booked seats for a specific date
router.get("/routes/:departure/:arrival/:date", routeController.getoneroute);

module.exports = router;