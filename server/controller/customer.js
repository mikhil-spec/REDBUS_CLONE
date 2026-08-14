const Customer = require("../models/customer");

// Add new customer or retrieve existing customer
exports.addnewcustomer = async (req, res) => {
  try {
    const { name, email, googleId, profilepicture } = req.body;

    let existingCustomer = await Customer.findOne({ email }).lean().exec();

    if (existingCustomer) {
      return res.status(200).json(existingCustomer);
    }

    const newCustomer = await Customer.create({
      name,
      email,
      googleId,
      profilepicture,
    });

    return res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error adding customer:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};