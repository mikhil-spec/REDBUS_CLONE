export interface DeliveryAttempt{
  channel: "email"  | "push"| "sms"  | "in_app";
  status: "pending"| "delivered"  | 'failed';
  attemptNumber:number;
  errorMessage? : string;
  timestamp:string ;

}

export interface UserNotification{
  _id : string;
  recipient:string; 
  eventType : "BOOKING_CONFIRMATION"  |  "BOOKING_CANCELLATION" | "SCHEDULE_CHANGE"  | "JOURNEY_REMINDER"  | "PROMOTIONAL_OFFER";
  title :string;
  message :string;
  language : "en" | "hi"  | "te" |  "ta";
  deliveryChannels:("email" |"push" | "sms"  | "in_app" )[];
  deliveryStatus :"queued"  | "delivered" | "partially_delivered" |"failed";
  deliveryLogs : DeliveryAttempt[];
  retryCount : number;
  maxRetries:number;
  isRead :boolean;
  metadata? :{
    pnr? : string;
    busName? :string;
    journeyDate? : string;
    promoCode?:string;
    discountPercentage? :number;
  };

  createdAt : string;
  updatedAt:string;
}

export interface NotificationPreferences{
  preferredLanguage: "en"  | "hi" |"te" | "ta" ;
  channels :{
    email : boolean;
    push:boolean;
    sms :boolean;
  };
  eventSubscriptions:{
    bookingUpdates: boolean;
    journeyReminders :boolean;
    scheduleChanges : boolean;
    promotions:boolean;
  };
  pushToken? : string;
};