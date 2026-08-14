require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Route Handlers
const customerRoutes = require("./routes/customer");
const routeRoutes = require("./routes/route");
const bookingRoutes = require("./routes/booking");

const app = express();

// Middleware Setup
app.use(cors());
app.use(express.json()); // Replaced deprecated body-parser with native Express JSON parser
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use(bookingRoutes);
app.use(routeRoutes);
app.use(customerRoutes);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).send("Hello, Ted bus API is running");
});

// Database Connection & Server Startup
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:admin@tedbus.vqk1yid.mongodb.net/?retryWrites=true&w=majority&appName=tedbus";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });