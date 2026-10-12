const mongoose = require("mongoose");

const reviewReportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Customer" ,
    },
    reason : {
      type : String,
      required: true,
      trim:true
    },
    reportedAt:{
      type : Date,
      default : Date.now
    }
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    customer :{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Customer" ,
      required : [true,"Customer reference is required"],
      index: true
    },
    bus : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Bus",
      required : [true, "Bus reference is required"] ,
      index : true
    },
    booking:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required : [true, 'Completed booking reference is required'],
      unique : true
    },
    departureCity:{
      type : String,
      required : true,
      trim : true,
      lowercase : true
    },

    destinationCity : {
      type : String,
      required : true,
      trim : true,
      lowercase : true
    },
    rating :{
      type : Number,
      required : [true, 'Star rating between 1 and 5 is required'],
      min : 1,
      max : 5 ,
    },
    language: {
      type: String,
      enum: ["en", "hi", "te", "ta"],
      default: "en"
    },

    headline : {
      type : String,
      trim : true,
      maxlength : 120,
      default :""
    },

    comment: {
      type : String,
      required : [true, "Review feedback text is required"],
      trim : true,
      minlength : [20 , "Review feedback must contain at least 20 characters to provide useful detail"],
      maxlength : [1000,"Review feedback cannot exceed 1000 characters"]
    },

    helpfulVotes : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
      }
    ],
    status:{
      type : String,
      enum : ["active" , "flagged" ,"hidden"],
      default : "active",
      index:true
    },
    reportCount: {
      type : Number,
      default : 0
    },

    reportHistory:[reviewReportSchema],
    editableUntil : {
      type:Date,
      required : true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Review", reviewSchema);