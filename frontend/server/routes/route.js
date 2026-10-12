
const express = require("express");
const router = express.Router();
const routeController = require("../controller/route");
const { attachUser, requireModerator } = require('../middleware/auth');


router.get("/cities", routeController.getAllCities);
router.get("/pairs", routeController.getRoutePairs);
router.get('/search', routeController.searchBusesByRoute);
router.get("/", routeController.searchBusesByRoute);
router.get("/:departure/:arrival/:date", routeController.getBusesForJourney);

// Add bus inventory
// Bus inventory changes are restricted to moderators/admins.
router.post('/', attachUser, requireModerator, routeController.createBus);
router.post("/bus", attachUser, requireModerator, routeController.createBus);

module.exports = router;