const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer");

// @route   POST /customer
// @desc    Create a new customer or fetch existing profile
router.post("/customer", customerController.addnewcustomer);

module.exports = router;