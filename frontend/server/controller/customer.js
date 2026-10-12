const Customer = require("../models/customer");

// Fields that must never be returned to the account owner's client.
const PRIVATE_FIELDS = "-googleId -notificationPreferences.pushSubscription";

// Update the authenticated caller's own profile fields only.
// Accounts are NOT created here: creation happens only through verified Google
// sign-in. Identity fields (googleId, email, isVerified, role) are never writable here.
const setCustomer = async (req, res) => {
  try {
    const { name, phone, gender, age } = req.body || {};
    const customer = await Customer.findById(req.user._id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }

    if (typeof name === "string" && name.trim()) customer.name = name.trim().slice(0, 80);
    if (typeof phone === "string" && phone.trim()) customer.phone = phone.trim().slice(0, 20);
    if (["Male", "Female", "Other"].includes(gender)) customer.gender = gender;
    if (Number.isInteger(Number(age)) && Number(age) >= 1 && Number(age) <= 120) customer.age = Number(age);

    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Customer details updated successfully.",
      data: await Customer.findById(customer._id).select(PRIVATE_FIELDS),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to process customer data.",
      error: error.message,
    });
  }
};

// Returns only the authenticated caller's own record.
const getCustomer = async (req, res) => {
  try {
    const requestedId = req.params.id || req.query.id || String(req.user._id);

    if (String(requestedId) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You can only access your own account data.",
      });
    }

    const customer = await Customer.findById(req.user._id).select(PRIVATE_FIELDS);

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found." });
    }

    return res.status(200).json({ success: true, data: customer });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve customer.",
      error: error.message,
    });
  }
};

// Update language
const updateLanguagePreference = async (req, res) => {
  try {
    const { customerId } = req.params;

    const { language } = req.body;

    if (!language || !["en", "hi", "te", "ta"].includes(language)) {
      return res.status(400).json({
        success: false,
        message: "Valid language code is required (en, hi, te, ta).",
      });
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    if (!customer.notificationPreferences) {
      customer.notificationPreferences = {};
    }

    customer.notificationPreferences.preferredLanguage = language;

    await customer.save();

    return res.status(200).json({
      success: true,
      message: `Language updated to ${language}`,
      data: {
        preferredLanguage: customer.notificationPreferences.preferredLanguage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update language.",
      error: error.message,
    });
  }
};

// Update theme
const updateThemePreference = async (req, res) => {
  try {
    const { customerId } = req.params;

    const { theme } = req.body;

    if (!theme || !["light", "dark"].includes(theme)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid theme value. Allowed values: "light" or "dark".',
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      customerId,
      { themePreference: theme },
      { new: true },
    ).select("themePreference name");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Theme updated to ${theme}`,
      data: {
        themePreference: customer.themePreference,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update theme preference.",
      error: error.message,
    });
  }
};

module.exports = {
  setCustomer,
  getCustomer,
  updateLanguagePreference,
  updateThemePreference,
};
