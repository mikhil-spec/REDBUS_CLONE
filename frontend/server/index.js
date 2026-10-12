const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customer");
const routeRoutes = require("./routes/route");
const bookingRoutes = require("./routes/booking");
const communityRoutes = require("./routes/community");
const notificationRoutes = require('./routes/notification');
const routePlannerRoutes = require("./routes/routePlanner");
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/auth");
const offersRoutes = require("./routes/offers");
const { startNotificationScheduler } = require("./services/notificationScheduler");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/redbus_db";

if (process.env.NODE_ENV === 'production' && (!process.env.AUTH_TOKEN_SECRET || process.env.AUTH_TOKEN_SECRET === 'change-this-secret-before-production')) {
  console.error('[Security] AUTH_TOKEN_SECRET must be configured in production.');
  process.exit(1);
}

const allowedOrigins = String(process.env.CLIENT_ORIGIN || '*').split(',').map(value => value.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS origin not allowed.'));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded( {extended:true }));

// Clear error while the database is not connected.
app.use((req, res, next) => {
  if (req.method === "OPTIONS" || req.path === "/" || mongoose.connection.readyState === 1) return next();
  return res.status(503).json({
    success: false,
    message: "The RedBus database is not connected. Start MongoDB and check MONGODB_URI in server/.env, then restart the server."
  });
});

// core API routing
app.use("/customer", customerRoutes);
app.use("/api/customer" , customerRoutes);

app.use("/route", routeRoutes);
app.use("/routes", routeRoutes);
app.use("/api/route" , routeRoutes);
app.use("/api/routes" ,routeRoutes);

app.use("/booking", bookingRoutes);
app.use("/api/booking", bookingRoutes);

// Community Platform
app.use("/community", communityRoutes);
app.use("/api/community", communityRoutes);

// Advanced Multi-channel notifications
app.use("/notification", notificationRoutes);
app.use("/notifications", notificationRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/notifications", notificationRoutes);

// Interactive Route Planning & Traffic Engine
app.use("/route-planner", routePlannerRoutes);
app.use("/api/route-planner", routePlannerRoutes);
app.use("/api/offers", offersRoutes);

// Genuine Completed-Journey Ratings & Reviews
app.use("/review", reviewRoutes);
app.use("/reviews", reviewRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/reviews", reviewRoutes);

// Authentication
app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

app.get("/health", (req, res)=> {
  res.status(200).json({status : "healthy", timestamp: new Date().toISOString()} );
});

app.get("/", (req, res)=> {
  res.send("RedBus Clone MEAN API is active.");
});

// The HTTP server always starts, so the browser gets a clear answer instead of
// "connection refused" when the database is unavailable.
app.listen(PORT, ()=> {
  console.log(`[Server] RedBus clone server running on port ${PORT}`);
});

mongoose
  .connect(MONGODB_URI)
  .then(()=> {
    console.log("[Database] MongoDB connection established successfully.");
    console.log(`[Database] Using database "${mongoose.connection.name}" on ${mongoose.connection.host}`);
    startNotificationScheduler();
  })
  .catch(err=> {
    console.error("[Database] MongoDB connection error:", err.message);
    console.error("[Database] Start MongoDB or correct MONGODB_URI in server/.env. API requests return 503 until the database is connected.");
  });