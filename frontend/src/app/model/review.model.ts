export interface ReviewAuthor{
  _id : string;
  name : string;
  avatar? : string;
  isVerified : boolean;
  role : string;
  badges?:string[];
}

export interface RouteReview{
  _id:string;
  customer : ReviewAuthor;
  bus?: {
    _id : string;
    busName : string;
    busNumber : string;
    companyName : string;
  };

  booking : string;
  departureCity : string;
  destinationCity : string;
  language? : "en" | "hi" | "te" | "ta";
  rating:number;
  headline? : string;
  comment : string;
  helpfulVotes :string[];
  status : "active" | "flagged" | "hidden";
  editableUntil : string;
  isTrustedReviewer? : boolean;
  canEdit? : boolean;
  createdAt : string;
  updatedAt : string;
}

export interface ReviewRatingSummary{
  averageRating : number;
  totalReviews : number;
  starBreakdown: {
    [star : number] : number;
  };
}

export interface EligibleBooking{
  _id : string;
  pnr : string;
  bus : {
    _id : string;
    busName : string;
    busNumber : string;
    companyName : string;
  };
  
  departureCity: string;
  destinationCity:string;
  journeyDate : string;
  seatsBooked : number[];
  totalFare : number;
}