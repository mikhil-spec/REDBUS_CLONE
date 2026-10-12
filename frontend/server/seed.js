const mongoose = require("mongoose");
const Bus = require("./models/bus");
const Route = require("./models/route");
const Customer = require("./models/customer");
const Post = require("./models/post");
const Comment = require("./models/comment");
const Booking = require("./models/booking");
const Review = require("./models/review");
require("dotenv").config();

const sampleTravelers= [
  {
    name : "Aarav Sharma",
    email : "aarav.travels@redbus.local",
    phone : "9811223344",
    gender : "Male",
    age : 28 ,
    isVerified:true,
    avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    bio: "Backpacker & luxury bus journey reviewer across North & West India." ,
    role : "verified_guide",
    badges : ["Top Storyteller" , "Route Veteran"]
  },
  {
    name : "Pooja Iyer",
    email : "pooja.routes@redbus.local" ,
    phone : "9844556677",
    gender : "Female",
    age : 26,
    isVerified : true,
    avatar : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" ,
    bio: "Solo woman traveler sharing safety advice, clean pitstop tips, and sleeper bus hacks." ,
    role : "verified_guide",
    badges : ["Solo Travel Guide" , "Verified Explorer"]
  }
];

const sampleBuses = [
  {
    busName: "IntrCity SmartBus" ,
    busNumber : "DL01AB1234",
    busType : "Volvo Multi-Axle",
    companyName : "IntrCity",
    rating: 4.8,
    totalSeats : 40,
    availableSeats : 38,
    bookedSeats : [3, 4],
    fare: 850 ,
    departureTime : "21:00" ,
    arrivalTime : "06:30",
    departureCity : "delhi",
    destinationCity: "jaipur",
    operatingDays : ["Monday" , "Tuesday", "Wednesday", "Thursday", "Friday" ,"Saturday", "Sunday"]
  },

  {
    busName : "Zingbus Plus" ,
    busNumber : "HR26XY9876",
    busType : "AC Sleeper",
    companyName : "Zingbus" ,
    rating:4.4,
    totalSeats : 36,
    availableSeats : 36,
    bookedSeats: [],
    fare : 1100,
    departureTime : "22:30",
    arrivalTime : "07:45",
    departureCity : "delhi",
    destinationCity : "jaipur",
    operatingDays: ["Monday", "Tuesday", "Wednesday" , "Thursday", "Friday", "Saturday" ,"Sunday"]
  }
];

const sampleRoutes=[
  {
    departureCity : "delhi",
    destinationCity : "jaipur" ,
    distanceKm:280,
    estimatedDuration : "5h 30m",
    boardingPoints:[
      {location: "Kashmere Gate ISBT", time:"20:30"} ,
      {location: "Dhaula Kuan", time: "21:15"}
    ],
    droppingPoints: [
      { location: "Sindhi Camp", time: "06:00"},
      {location : "Narayan Singh Circle", time: "06:30"},
    ]
  }
];

async function seedDatabase(){
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/redbus_db" ;
    await mongoose.connect(mongoUri);
    console.log("[Seed] Connected to MongoDB at: ", mongoUri);

    await Bus.deleteMany({});
    await Route.deleteMany({});
    // Customers are kept, so signed-in accounts still work after re-seeding.
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});

    const savedTravelers = await Customer.insertMany(sampleTravelers);
    const savedBuses = await Bus.insertMany(sampleBuses);
    await Route.insertMany(sampleRoutes);

    // Create completed historical booking (journey completed yesterday)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const pastBooking = await Booking.create({
      pnr : "RB-TESTPAST01",
      customer : savedTravelers[0]._id,
      bus : savedBuses[0]._id,
      departureCity: "delhi",
      destinationCity: "jaipur",
      journeyDate : yesterday,
      seatsBooked : [5],
      passengers : [{name: "Aarav Sharma", gender:"Male", age:28, seatNumber: 5}],
      totalFare: 850,
      boardingPoint : {location: "Kashmere Gate ISBT", time: "20:30"},
      droppingPoint : {location: "Sindhi Camp" , time: "06:00" },
      bookingStatus : "Confirmed"
    });

    // Create authentic verified route review
    await Review.create({
      customer : savedTravelers[0]._id,
      bus : savedBuses[0]._id,
      booking : pastBooking._id,
      departureCity : "delhi",
      destinationCity : "jaipur",
      rating : 5,
      headline : "Smooth highway cruise & clean sleeper berths",
      comment : "The bus was right on time at Kashmere Gate. Charging points worked properly throughout the trip and the driver kept safe speeds on the expressway stretch.",
      helpfulVotes : [savedTravelers[1]._id],
      editableUntil : new Date(Date.now() + 18 * 60 * 60 * 1000), // Within 24-hr edit window
      status: "active" ,
    });

    console.log("[Seed] Seeded buses, verified accounts, historical bookings, and route reviews cleanly.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("[Seed Error]: ", error.message);
    process.exit(1);
  }
}

seedDatabase();