const express = require("express");
const router = express.Router();
const customerController = require('../controller/customer');
const { attachUser, bindCustomer } = require('../middleware/auth');

// Accounts are created only through verified Google sign-in (/api/auth/google).
// These routes act on the authenticated caller's own account only.
router.post("/", attachUser, customerController.setCustomer);
router.get("/", attachUser, customerController.getCustomer);
router.get("/:id", attachUser, customerController.getCustomer);
router.put("/:customerId/language", attachUser, bindCustomer, customerController.updateLanguagePreference);
router.put('/:customerId/theme', attachUser, bindCustomer, customerController.updateThemePreference);

module.exports = router;
