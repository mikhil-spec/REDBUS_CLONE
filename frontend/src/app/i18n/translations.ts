export interface AppTranslations{
  NAV: {
    NEW_TO_REDBUS: string;
    WELCOME_NEW: string;
    ERR_SERVER_UNREACHABLE: string;
    ERR_SIGN_IN_FAILED: string;
    DASHBOARD: string;
    ACCOUNT_DETAILS: string;
    THEME_TO_LIGHT: string;
    THEME_TO_DARK: string;
    SIGN_IN: string;
    SIGN_IN_NOT_CONFIGURED: string;
    HOME : string;
    ROUTE_PLANNER: string;
    COMMUNITY : string;
    NOTIFICATIONS : string;
    SELECT_LANGUAGE:string;
    BUS_TICKETS:string;
    REVIEWS:string;
    HELP:string;
    ACCOUNT:string;
    MY_TRIPS:string;
    WALLET:string;
    MY_PROFILE:string;
    SIGN_OUT:string;
  } ;

  COMMON : {
    SAVE:string;
    CANCEL : string;
    DELETE : string;
    SEARCH: string ;
    SUBMIT : string;
    RETRY: string;
    CONFIRM: string ;
    LOADING:string;
    STATUS: string;
    LANGUAGE :string;
    SUCCESS : string;
    ERROR: string;
  };
  VALIDATION: {
    REQUIRED: string ;
    INVALID_EMAIL: string;
    PHONE_REQUIRED: string;
    MIN_SEATS: string;
    TITLE_REQUIRED: string;
    CONTENT_REQUIRED: string;
  } ;
  PLANNER: {
    TITLE : string;
    SUBTITLE: string;
    ORIGIN_LABEL : string;
    DEST_LABEL:string ;
    WAYPOINTS :string;
    ADD_WAYPOINT : string;
    RECOMPUTE_BTN: string ;
    LIVE_TRAFFIC : string;
    ESTIMATED_NOTICE : string;
    SUGGESTED_ROUTES : string;
    FASTEST_BADGE : string;
    TOLL_INFO:  string;
    SAVE_ROUTE_BTN:string;
    CHOKE_POINTS :string;
    TAB_ROUTES : string ;
    TAB_COMPARE : string;
    TAB_SAVED: string;
    COMPARE_TITLE: string;
    COMPARE_SUBTITLE :string;
  };

  REVIEWS: {
    NO_ROUTES: string;
    ROUTES_UNAVAILABLE: string;
    ALL_ROUTES: string;
    LANG_ALL: string;
    SORT_HIGHEST: string;
    SORT_LOWEST: string;
    TOAST_LOAD_REVIEWS_FAILED: string;
    TOAST_LOAD_ROUTES_FAILED: string;
    TOAST_VERIFIED_ONLY: string;
    TOAST_NO_ELIGIBLE: string;
    TOAST_EDIT_EXPIRED: string;
    TOAST_MIN_CHARS: string;
    TOAST_UPDATED: string;
    TOAST_UPDATE_FAILED: string;
    TOAST_PUBLISHED: string;
    TOAST_SUBMIT_FAILED: string;
    TOAST_VOTE_FAILED: string;
    TOAST_REPORT_FAILED: string;
    HERO_TAG: string;
    TITLE: string;
    SUBTITLE: string;
    RATE_BTN: string;
    AVAILABLE: string;
    SELECT_ROUTE: string;
    ALL_REVIEWS: string;
    ONLY_STAR: string;
    SORT: string;
    SORT_RECENT: string;
    SORT_HELPFUL: string;
    VERIFIED_RATINGS: string;
    INTEGRITY_TITLE: string;
    INTEGRITY_1: string;
    INTEGRITY_2: string;
    INTEGRITY_3: string;
    INTEGRITY_4: string;
    LOADING: string;
    EMPTY_TITLE: string;
    EMPTY_SUB: string;
    WRITE_REVIEW: string;
    TRUSTED_REVIEWER: string;
    TRUSTED_TITLE: string;
    VERIFIED_PASSENGER: string;
    JOURNEY: string;
    TO: string;
    RATING_OUT_OF: string;
    HELPFUL: string;
    REPORT: string;
    REPORT_TITLE: string;
    EDIT_BTN: string;
    EDIT_LOCKED: string;
    MODAL_EDIT: string;
    MODAL_NEW: string;
    SELECT_JOURNEY: string;
    PNR: string;
    RATING_LABEL: string;
    STARS_SELECTED: string;
    HEADLINE_LABEL: string;
    HEADLINE_PLACEHOLDER: string;
    COMMENT_LABEL: string;
    COMMENT_PLACEHOLDER: string;
    CHAR_COUNT: string;
    SUBMIT_NEW: string;
    SUBMIT_EDIT: string;
  },
    LANDING: {
      NO_FILTER_MATCH: string;
      FAQ_Q8: string;
      FAQ_A8: string;
      FAQ_Q9: string;
      FAQ_A9: string;
      NO_BUSES: string;
      TIME_LABEL: string;
      TIME_ANY: string;
      TIME_EARLY: string;
      TIME_MORNING: string;
      TIME_AFTERNOON: string;
      TIME_EVENING: string;
      ALERT_SAME_CITY: string;
      HERO_TITLE: string;
      FROM: string;
      TO: string;
      DATE: string;
      SEARCH_BUSES: string;
      OFFERS_TITLE: string;
      VIEW_ALL: string;
      OFFER_BADGE: string;
      OFFER_1: string;
      OFFER_2: string;
      OFFER_3: string;
      OFFER_4: string;
      VALID_TILL: string;
      FAQ_TITLE: string;
      FAQ_TAB_GENERAL: string;
      FAQ_TAB_TICKET: string;
      FAQ_TAB_MORE: string;
      FAQ_TAB_PAYMENT: string;
      FAQ_TAB_CANCEL: string;
      FAQ_TAB_INSURANCE: string;
      FAQ_Q1: string;
      FAQ_Q2: string;
      FAQ_Q3: string;
      FAQ_Q4: string;
      FAQ_Q5: string;
      FAQ_Q6: string;
      FAQ_Q7: string;
      FAQ_A1: string;
      FAQ_A2: string;
      FAQ_A3: string;
      FAQ_A4: string;
      FAQ_A5: string;
      FAQ_A6: string;
      FAQ_A7: string;
      ALERT_FILL: string;
      DIALOG_TITLE: string;
      DIALOG_NO: string;
      DIALOG_FROM: string;
      DIALOG_TO: string;
      DIALOG_BUSES: string;
    },
    ACCOUNT: {
      SESSION_EXPIRED: string;
      TITLE: string;
      SUBTITLE: string;
      SIGN_IN_PROMPT: string;
      LOADING: string;
      LOAD_FAILED: string;
      FIELD_NAME: string;
      FIELD_EMAIL: string;
      EMAIL_NOTE: string;
      FIELD_PHONE: string;
      PHONE_NOT_ADDED: string;
      FIELD_GENDER: string;
      FIELD_AGE: string;
      FIELD_VERIFICATION: string;
      VERIFIED: string;
      NOT_VERIFIED: string;
      FIELD_ROLE: string;
      FIELD_LANGUAGE: string;
      FIELD_THEME: string;
      THEME_LIGHT: string;
      THEME_DARK: string;
      EDIT_TITLE: string;
      SAVE: string;
      SAVING: string;
      SAVED: string;
      SAVE_FAILED: string;
      GENDER_MALE: string;
      GENDER_FEMALE: string;
      GENDER_OTHER: string;
      SIGN_OUT: string;
    },
    DASHBOARD: {
      TITLE: string;
      SUBTITLE: string;
      SIGN_IN_PROMPT: string;
      LOADING: string;
      LOAD_FAILED: string;
      STAT_UPCOMING: string;
      STAT_TOTAL: string;
      STAT_UNREAD: string;
      STAT_REVIEWS: string;
      TRIPS_HEADING: string;
      NO_TRIPS: string;
      BOOK_NOW: string;
      STATUS_CONFIRMED: string;
      STATUS_CANCELLED: string;
      STATUS_COMPLETED: string;
      STATUS_PENDING: string;
      PNR: string;
      SEATS: string;
      FARE: string;
      JOURNEY: string;
      QUICK_LINKS: string;
      GO_HOME: string;
      GO_NOTIFICATIONS: string;
      GO_REVIEWS: string;
      GO_COMMUNITY: string;
      GO_PLANNER: string;
    },
    PROFILE: {
      SIGN_IN_PROMPT: string;
      TAB_DASHBOARD: string;
      TAB_TRIPS: string;
      TAB_PROFILE: string;
      TAB_PREFERENCES: string;
      PREF_THEME: string;
      PREF_THEME_DESC: string;
      PREF_LIGHT: string;
      PREF_DARK: string;
      PREF_LANGUAGE: string;
      PREF_LANGUAGE_DESC: string;
      PREF_ALERTS: string;
      PREF_ALERTS_DESC: string;
      GO_NOTIFICATIONS: string;
      GO_REVIEWS: string;
      GO_COMMUNITY: string;
      SIGN_OUT: string;
    },
    OFFER: {
      TITLE: string;
      PLACEHOLDER: string;
      APPLY: string;
      REMOVE: string;
      DISCOUNT: string;
      APPLIED: string;
      UNKNOWN: string;
      EXPIRED: string;
      NOT_ELIGIBLE: string;
      UNAVAILABLE: string;
    },
    TRIPS: {
      SESSION_EXPIRED: string;
      SORT_LABEL: string;
      SORT_NEWEST: string;
      SORT_OLDEST_TRIP: string;
      SORT_FARE_HIGH: string;
      SORT_FARE_LOW: string;
      TITLE: string;
      SUBTITLE: string;
      FILTER_ALL: string;
      FILTER_UPCOMING: string;
      FILTER_COMPLETED: string;
      FILTER_CANCELLED: string;
      EMPTY: string;
      LOADING: string;
      CANCEL_BTN: string;
      CANCEL_CONFIRM: string;
      CANCELLED_OK: string;
      CANCEL_FAILED: string;
      REVIEW_TRIP: string;
    },
  COMMUNITY :{
    LANG_LABEL: string;
    LANG_ALL: string;
    SORT_LIKED: string;
    SORT_DISCUSSED: string;
    SORT_VIEWED: string;
    SORT_OLDEST: string;
    TOAST_LOAD_FAILED: string;
    TOAST_LOGIN_TO_LIKE: string;
    TOAST_LIKE_FAILED: string;
    TOAST_COMMENT_FAILED: string;
    TOAST_VERIFIED_ONLY_POST: string;
    TOAST_TITLE_REQUIRED: string;
    TOAST_PUBLISHED: string;
    TOAST_POST_FAILED: string;
    TOAST_MOD_DONE: string;
    TOAST_MOD_FAILED: string;
    TOAST_REPORT_FAILED: string;
    TOAST_LINK_COPIED: string;
    SEARCH_PLACEHOLDER: string;
    SEARCH_BTN: string;
    SORT_LABEL: string;
    MOD_BACK: string;
    MOD_QUEUE: string;
    LOADING_STORIES: string;
    EMPTY_TITLE: string;
    EMPTY_SUB: string;
    WRITE_FIRST: string;
    MOD_APPROVE: string;
    MOD_FLAG: string;
    MOD_REMOVE: string;
    MOD_FEATURE: string;
    REPORT_TITLE: string;
    VERIFIED_TITLE: string;
    GUIDE: string;
    LIKES: string;
    COMMENTS: string;
    VIEWS: string;
    SHARE_WHATSAPP: string;
    SHARE_X: string;
    SHARE_COPY: string;
    SHARE_WHATSAPP_TITLE: string;
    SHARE_X_TITLE: string;
    COPY_LINK_TITLE: string;
    DISCUSSION: string;
    COMMENT_PLACEHOLDER: string;
    CREATE_TITLE: string;
    CATEGORY_LABEL: string;
    STORY_TITLE_LABEL: string;
    STORY_TITLE_PLACEHOLDER: string;
    FROM_CITY: string;
    TO_CITY: string;
    PHOTO_LABEL: string;
    STORY_LABEL: string;
    STORY_PLACEHOLDER: string;
    PUBLISH_NOW: string;
    PROFILE_TITLE: string;
    STORIES_SHARED: string;
    COMMUNITY_LIKES: string;
    TOPIC_ALL: string;
    TOPIC_JOURNEY_STORIES: string;
    TOPIC_TRAVEL_TIPS: string;
    TOPIC_ROUTE_ADVICE: string;
    TOPIC_DESTINATION_GUIDE: string;
    TOPIC_GENERAL_DISCUSSION: string;
    HERO_TAG : string;
    TITLE :string ;
    SUBTITLE : string;
    SHARE_BTN  : string;
    ALL_TOPICS : string;
    SORT_RECENT:string;
    SORT_TRENDING: string;
    FEATURED : string;
    REPLY_BTN:string ;
    REPORT_BTN: string;
    SHARE:string
  };
  NOTIFICATIONS : {
    CHANNELS_DESC: string;
    FILTER_ALL: string;
    FILTER_BOOKINGS: string;
    FILTER_REMINDERS: string;
    FILTER_SCHEDULE: string;
    FILTER_OFFERS: string;
    SYNC_LOGS: string;
    EMPTY_TITLE: string;
    EMPTY_DESC: string;
    LANGUAGE_TAG: string;
    STATUS_LABEL: string;
    RETRY_BTN: string;
    DEFAULT_SUFFIX: string;
    CHANNEL_EMAIL_TITLE: string;
    CHANNEL_EMAIL_DESC: string;
    CHANNEL_PUSH_TITLE: string;
    CHANNEL_PUSH_DESC: string;
    CHANNEL_SMS_TITLE: string;
    CHANNEL_SMS_DESC: string;
    EVENTS_HEADING: string;
    EVENTS_DESC: string;
    PROMO_TITLE: string;
    PROMO_DESC: string;
    SCHEDULE_TITLE: string;
    SCHEDULE_DESC: string;
    SIM_TITLE: string;
    SIM_DESC: string;
    EVENT_TYPE: string;
    EV_REMINDER: string;
    EV_SCHEDULE: string;
    EV_PROMO: string;
    EV_BOOKING: string;
    DEPARTURE_CITY: string;
    DESTINATION_CITY: string;
    NEW_TIME: string;
    PROMO_CODE: string;
    DISCOUNT_PCT: string;
    DISPATCH_BTN: string;
    TOAST_SIGN_IN_FIRST: string;
    TOAST_SESSION_INVALID: string;
    TOAST_LOAD_FAILED: string;
    TOAST_PREFS_SAVED: string;
    TOAST_PREFS_FAILED: string;
    TOAST_ALL_READ: string;
    TOAST_RETRY_DONE: string;
    TOAST_RETRY_FAILED: string;
    TOAST_SENT: string;
    TOAST_SIM_FAILED: string;
    TAG:string;
    TITLE : string;
    SUBTITLE : string;
    TAB_INBOX: string;
    TAB_PREFERENCES: string ;
    TAB_SIMULATOR :string;
    UNREAD_ONLY : string;
    MARK_ALL_READ:string;
    LANG_HEADING: string;
    LANG_DESC : string;
    CHANNELS_HEADING : string;
    SAVE_PREF_BTN:string ;
  } ;
}

export const TRANSLATION_DICTIONARY : Record<string,AppTranslations>= {
  en:{
    NAV : {
      NEW_TO_REDBUS: "New to RedBus?",
      WELCOME_NEW: "Welcome to RedBus! Your account has been created.",
      ERR_SERVER_UNREACHABLE: "Cannot reach the RedBus server. Make sure the backend is running, then try again.",
      ERR_SIGN_IN_FAILED: "Google sign-in could not be completed. Please try again.",
      DASHBOARD: "Dashboard",
      ACCOUNT_DETAILS: "Account details",
      THEME_TO_LIGHT: "Switch to Light Mode",
      THEME_TO_DARK: "Switch to Dark Mode",
      SIGN_IN: "Sign In",
      SIGN_IN_NOT_CONFIGURED: "Google sign-in is not configured on this site yet.",
      HOME : "Home" ,
      ROUTE_PLANNER : "Route Planner",
      COMMUNITY :"Travel Community",
      NOTIFICATIONS:'Notifications' ,
      SELECT_LANGUAGE : "Language",
      BUS_TICKETS: "Bus Tickets",
      REVIEWS: "Reviews",
      HELP: "Help",
      ACCOUNT: "Account",
      MY_TRIPS: "My Trips",
      WALLET: "Wallet / Cards",
      MY_PROFILE: "My Profile",
      SIGN_OUT: "Sign Out"
    } ,
    COMMON:{
      SAVE: "Save" ,
      CANCEL: "Cancel",
      DELETE : 'Delete',
      SEARCH:"Search",
      SUBMIT : "Submit",
      RETRY: "Retry",
      CONFIRM :"Confirm",
      LOADING : "Loading...",
      STATUS : "Status",
      LANGUAGE: "Language",
      SUCCESS : "Success",
      ERROR : "Error",
    },
    VALIDATION : {
      REQUIRED : "This field is required." ,
      INVALID_EMAIL: "Please enter a valid email address.",
      PHONE_REQUIRED:"Phone number is mandatory." ,
      MIN_SEATS : "Please select at least one seat.",
      TITLE_REQUIRED : "Post title is required.",
      CONTENT_REQUIRED :"Story description cannot be blank.",
    },
    PLANNER :{
      TITLE: "Interactive Route Planner",
      SUBTITLE : "Configure custom waypoints, evaluate alternative expressways, and avoid traffic bottlenecks.",
      ORIGIN_LABEL : "Start Location (Origin)",
      DEST_LABEL : 'Destination' ,
      WAYPOINTS : 'Intermediate Waypoints',
      ADD_WAYPOINT:"+ Add" ,
      RECOMPUTE_BTN: "Recompute Live Routes",
      LIVE_TRAFFIC :"Real-time traffic auto-sync active",
      ESTIMATED_NOTICE : "Estimated times only: live traffic is not connected on the server, so congestion figures are approximate.",
      SUGGESTED_ROUTES : "Suggested Highway Routes" ,
      FASTEST_BADGE : "Fastest Route",
      TOLL_INFO:"Tolls",
      SAVE_ROUTE_BTN : "Save This Route",
      CHOKE_POINTS: "Choke points",
      TAB_ROUTES : "Trip Routes",
      TAB_COMPARE : "Route Comparison",
      TAB_SAVED : 'Saved Routes',
      COMPARE_TITLE :"Multi-Route Evaluation Matrix",
      COMPARE_SUBTITLE : "Compare distance, delays, toll expenses, and live congestion factors across routes." 
    } ,
    REVIEWS: {
      NO_ROUTES: "No bus routes are available yet.",
      ROUTES_UNAVAILABLE: "The route list could not be loaded. Check that the server is running.",
      ALL_ROUTES: "All routes",
      LANG_ALL: "All languages",
      SORT_HIGHEST: "Highest rated",
      SORT_LOWEST: "Lowest rated",
      TOAST_LOAD_REVIEWS_FAILED: "Unable to load route reviews.",
      TOAST_LOAD_ROUTES_FAILED: "Unable to load bus routes.",
      TOAST_VERIFIED_ONLY: "Only verified travelers with completed journey tickets can post reviews.",
      TOAST_NO_ELIGIBLE: "No unreviewed completed journeys found for your account.",
      TOAST_EDIT_EXPIRED: "The 24-hour edit window for this review has expired.",
      TOAST_MIN_CHARS: "Please write at least 20 characters in your feedback.",
      TOAST_UPDATED: "Review updated successfully.",
      TOAST_UPDATE_FAILED: "Error updating review.",
      TOAST_PUBLISHED: "Review published successfully!",
      TOAST_SUBMIT_FAILED: "Failed to submit review.",
      TOAST_VOTE_FAILED: "Failed to record upvote.",
      TOAST_REPORT_FAILED: "Error submitting review report.",
      HERO_TAG: "Verified Journey Reviews Only",
      TITLE: "Route Ratings & Traveler Feedback",
      SUBTITLE: "Transparent ratings submitted exclusively by passengers who completed their journey. Reviews can be edited within 24 hours of posting.",
      RATE_BTN: "Rate Your Completed Journey",
      AVAILABLE: "({{count}} Available)",
      SELECT_ROUTE: "Select Bus Operator & Route:",
      ALL_REVIEWS: "All Reviews",
      ONLY_STAR: "{{star}} ★ Only",
      SORT: "Sort:",
      SORT_RECENT: "Recent",
      SORT_HELPFUL: "Most Helpful",
      VERIFIED_RATINGS: "{{count}} verified ratings",
      INTEGRITY_TITLE: "Review Integrity",
      INTEGRITY_1: "Ratings permitted only after journey completes.",
      INTEGRITY_2: "1 review per ticketed booking.",
      INTEGRITY_3: "24-hour edit window after submission.",
      INTEGRITY_4: "Reported/hidden reviews excluded from rating average.",
      LOADING: "Loading verified travel reviews...",
      EMPTY_TITLE: "No reviews found under this filter.",
      EMPTY_SUB: "Completed a trip on this route? Be the first to share your experience!",
      WRITE_REVIEW: "Write Review",
      TRUSTED_REVIEWER: "Trusted Reviewer",
      TRUSTED_TITLE: "Frequently helpful reviewer",
      VERIFIED_PASSENGER: "Verified Passenger",
      JOURNEY: "Journey:",
      TO: "to",
      RATING_OUT_OF: "{{rating}} / 5",
      HELPFUL: "Helpful ({{count}})",
      REPORT: "Report",
      REPORT_TITLE: "Report review",
      EDIT_BTN: "Edit Review (24h window active)",
      EDIT_LOCKED: "Edit window locked",
      MODAL_EDIT: "Edit Route Review",
      MODAL_NEW: "Submit Route Rating & Review",
      SELECT_JOURNEY: "Select Your Completed Journey",
      PNR: "PNR:",
      RATING_LABEL: "Your Rating (1 to 5 Stars)",
      STARS_SELECTED: "Stars Selected",
      HEADLINE_LABEL: "Review Headline (Optional)",
      HEADLINE_PLACEHOLDER: "e.g. On-time departure, smooth highway ride",
      COMMENT_LABEL: "Feedback & Travel Experience (Min. 20 Characters)",
      COMMENT_PLACEHOLDER: "Tell fellow passengers about seat comfort, punctuality, driver safety, and hygiene...",
      CHAR_COUNT: "{{count}} / 20 characters required",
      SUBMIT_NEW: "Publish Verified Review",
      SUBMIT_EDIT: "Update Review",
    },
      LANDING: {
        NO_FILTER_MATCH: "No buses match the selected filters. Clear some filters to see more buses.",
        FAQ_Q8: "How do I cancel my bus ticket?",
        FAQ_A8: "Open My trips, choose an upcoming confirmed trip and select Cancel booking. The seats are released straight away. This version does not process refunds automatically, so contact the bus operator about any refund.",
        FAQ_Q9: "Can I add travel insurance to my booking?",
        FAQ_A9: "Yes, insurance is optional. Tick the insurance checkbox on the booking form before you continue, and read the terms shown there. Leave it unticked if you do not want cover.",
        NO_BUSES: "No buses found for this route on {{date}}. Try another date or time slot, or choose another route.",
        TIME_LABEL: "Departure time",
        TIME_ANY: "Any time",
        TIME_EARLY: "12 AM - 6 AM",
        TIME_MORNING: "6 AM - 12 PM",
        TIME_AFTERNOON: "12 PM - 6 PM",
        TIME_EVENING: "6 PM - 12 AM",
        ALERT_SAME_CITY: "Please choose two different cities.",
        HERO_TITLE: "India's No. 1 Online Bus Ticket Booking Site",
        FROM: "From",
        TO: "To",
        DATE: "Date",
        SEARCH_BUSES: "SEARCH BUSES",
        OFFERS_TITLE: "TRENDING OFFERS",
        VIEW_ALL: "View All",
        OFFER_BADGE: "BUS",
        OFFER_1: "Save up to Rs 250 on bus tickets",
        OFFER_2: "Save up to Rs 300 on AP, TS routes",
        OFFER_3: "Save up to Rs 300 on RJ,MH, Goa, MP,",
        OFFER_4: "Save up to Rs 200 in Kerala routes.",
        VALID_TILL: "Valid till 30 Nov",
        FAQ_TITLE: "FREQUENTLY ASKED QUESTIONS",
        FAQ_TAB_GENERAL: "General",
        FAQ_TAB_TICKET: "Ticket-related",
        FAQ_TAB_MORE: "More",
        FAQ_TAB_PAYMENT: "Payment",
        FAQ_TAB_CANCEL: "Cancellation & Refund",
        FAQ_TAB_INSURANCE: "Insurance",
        FAQ_Q1: "Can I track the location of my booked bus online?",
        FAQ_Q2: "Why book bus tickets online on tedbus?",
        FAQ_Q3: "Do I need to create an account on the tedbus site to book my bus ticket?",
        FAQ_Q4: "Does bus booking online cost me more?",
        FAQ_Q5: "How can I get the discounts on the bus booking?",
        FAQ_Q6: "What's New in Bus Booking on tedbus?",
        FAQ_Q7: "Can I book a Government bus ticket on tedbus?",
        FAQ_A1: "RedBus does not show a live GPS position of your bus yet. Your trip details, including the operator, bus name, route, boarding point and departure time, are in My trips. For the bus's current location, contact the bus operator directly.",
        FAQ_A2: "Booking online lets you see every bus on your route, choose your own seats, pay before you travel, and keep all your tickets in My trips. You also receive booking, schedule-change and journey reminders by email, push or in-app notification. You can cancel an upcoming confirmed trip from My trips.",
        FAQ_A3: "Yes. RedBus uses Google sign-in, so you need a Google account. There is no separate RedBus password. Your RedBus account is created automatically the first time you choose Sign up with Google or Sign in with Google. Verified accounts can also publish community posts and route reviews.",
        FAQ_A4: "No. The fare shown for each bus is the price per seat. The payment page shows the total for the seats you selected before you pay, and it has no separate booking-fee line. Check the total on the payment page before you confirm.",
        FAQ_A5: "The offers on the home page, such as FIRST, SUPERHIT, BUS300 and RBTRIP, are listed with their validity dates. In this version, offer codes are not applied automatically at checkout, so the payment page shows the full fare. Check the offer details on the home page before you book.",
        FAQ_A6: "New in this version: a travel community with stories, tips and photos; a route planner with traffic information, alternative routes, route comparison and saved routes; a notification center with email, push, in-app and optional SMS alerts; verified route reviews that can be filtered by route, language and rating and sorted by newest, highest, lowest or most helpful; dark mode; and English, Hindi, Telugu and Tamil.",
        FAQ_A7: "RedBus lists buses from the private operators in our catalog. Government (state transport) buses are not listed separately on this website yet, so they cannot be booked here. For government bus tickets, use the official state transport corporation's website or counter.",
        ALERT_FILL: "Please fill up the details!",
        DIALOG_TITLE: "Bus Routes Available",
        DIALOG_NO: "No.",
        DIALOG_FROM: "From",
        DIALOG_TO: "To",
        DIALOG_BUSES: "No. of Buses",
      },
      ACCOUNT: {
        SESSION_EXPIRED: "Your session has ended because the account is no longer valid. Please sign in again with Google.",
        TITLE: "Account details",
        SUBTITLE: "Your personal information used for bookings and alerts.",
        SIGN_IN_PROMPT: "Please sign in to view your account.",
        LOADING: "Loading account details...",
        LOAD_FAILED: "Could not load your account details.",
        FIELD_NAME: "Name",
        FIELD_EMAIL: "Email",
        EMAIL_NOTE: "Your email comes from your Google account and cannot be changed here.",
        FIELD_PHONE: "Phone",
        PHONE_NOT_ADDED: "Not added yet",
        FIELD_GENDER: "Gender",
        FIELD_AGE: "Age",
        FIELD_VERIFICATION: "Verification",
        VERIFIED: "Verified traveler",
        NOT_VERIFIED: "Not verified",
        FIELD_ROLE: "Account type",
        FIELD_LANGUAGE: "Preferred language",
        FIELD_THEME: "Theme",
        THEME_LIGHT: "Light",
        THEME_DARK: "Dark",
        EDIT_TITLE: "Edit details",
        SAVE: "Save changes",
        SAVING: "Saving...",
        SAVED: "Account details updated.",
        SAVE_FAILED: "Could not update your details.",
        GENDER_MALE: "Male",
        GENDER_FEMALE: "Female",
        GENDER_OTHER: "Other",
        SIGN_OUT: "Sign out",
      },
      DASHBOARD: {
        TITLE: "My Dashboard",
        SUBTITLE: "Your trips, reviews and notifications in one place.",
        SIGN_IN_PROMPT: "Please sign in to view your dashboard.",
        LOADING: "Loading your dashboard...",
        LOAD_FAILED: "Could not load your trips. Please try again.",
        STAT_UPCOMING: "Upcoming trips",
        STAT_TOTAL: "Total bookings",
        STAT_UNREAD: "Unread notifications",
        STAT_REVIEWS: "Journeys to review",
        TRIPS_HEADING: "My trips",
        NO_TRIPS: "You have no bookings yet.",
        BOOK_NOW: "Book a ticket",
        STATUS_CONFIRMED: "Confirmed",
        STATUS_CANCELLED: "Cancelled",
        STATUS_COMPLETED: "Completed",
        STATUS_PENDING: "Pending",
        PNR: "PNR",
        SEATS: "Seats",
        FARE: "Fare",
        JOURNEY: "Journey",
        QUICK_LINKS: "Quick links",
        GO_HOME: "Book tickets",
        GO_NOTIFICATIONS: "Notifications",
        GO_REVIEWS: "Route reviews",
        GO_COMMUNITY: "Community",
        GO_PLANNER: "Route planner",
      },
      PROFILE: {
        SIGN_IN_PROMPT: "Please sign in to view your profile.",
        TAB_DASHBOARD: "Dashboard",
        TAB_TRIPS: "My trips",
        TAB_PROFILE: "My profile",
        TAB_PREFERENCES: "Preferences",
        PREF_THEME: "Theme",
        PREF_THEME_DESC: "Choose light or dark mode for the whole app.",
        PREF_LIGHT: "Light",
        PREF_DARK: "Dark",
        PREF_LANGUAGE: "Language",
        PREF_LANGUAGE_DESC: "Language for the app and your booking alerts.",
        PREF_ALERTS: "Alerts and activity",
        PREF_ALERTS_DESC: "Notification settings, your route reviews and community posts.",
        GO_NOTIFICATIONS: "Notification settings",
        GO_REVIEWS: "Your route reviews",
        GO_COMMUNITY: "Community posts",
        SIGN_OUT: "Sign out",
      },
      OFFER: {
        TITLE: "Offer code",
        PLACEHOLDER: "Enter offer code",
        APPLY: "Apply",
        REMOVE: "Remove",
        DISCOUNT: "Offer discount",
        APPLIED: "Offer applied.",
        UNKNOWN: "This offer code is not valid.",
        EXPIRED: "This offer has expired.",
        NOT_ELIGIBLE: "This offer does not apply to this route.",
        UNAVAILABLE: "The offer could not be checked. Please try again.",
      },
      TRIPS: {
        SESSION_EXPIRED: "Your session has ended because the account is no longer valid. Please sign in again with Google.",
        SORT_LABEL: "Sort:",
        SORT_NEWEST: "Newest journey",
        SORT_OLDEST_TRIP: "Oldest journey",
        SORT_FARE_HIGH: "Fare: high to low",
        SORT_FARE_LOW: "Fare: low to high",
        TITLE: "My trips",
        SUBTITLE: "Upcoming, completed and cancelled bookings.",
        FILTER_ALL: "All",
        FILTER_UPCOMING: "Upcoming",
        FILTER_COMPLETED: "Completed",
        FILTER_CANCELLED: "Cancelled",
        EMPTY: "No trips in this list.",
        LOADING: "Loading your trips...",
        CANCEL_BTN: "Cancel booking",
        CANCEL_CONFIRM: "Cancel booking {{pnr}}? Your seats will be released.",
        CANCELLED_OK: "Booking cancelled. Your seats have been released.",
        CANCEL_FAILED: "This booking could not be cancelled.",
        REVIEW_TRIP: "Review this trip",
      },
    COMMUNITY: {
      LANG_LABEL: "Language:",
      LANG_ALL: "All languages",
      SORT_LIKED: "Most liked",
      SORT_DISCUSSED: "Most discussed",
      SORT_VIEWED: "Most viewed",
      SORT_OLDEST: "Oldest",
      TOAST_LOAD_FAILED: "Unable to load community stories.",
      TOAST_LOGIN_TO_LIKE: "Please select or log in with a traveler profile to like",
      TOAST_LIKE_FAILED: "Failed to register like action",
      TOAST_COMMENT_FAILED: "Error adding comment.",
      TOAST_VERIFIED_ONLY_POST: "Only verified travelers are allowed to publish stories.",
      TOAST_TITLE_REQUIRED: "Title and content are required.",
      TOAST_PUBLISHED: "Your travel story has been published!",
      TOAST_POST_FAILED: "Failed to submit post",
      TOAST_MOD_DONE: "Moderation action completed.",
      TOAST_MOD_FAILED: "Moderation action failed.",
      TOAST_REPORT_FAILED: "Error submitting report.",
      TOAST_LINK_COPIED: "Post link copied to clipboard!",
      SEARCH_PLACEHOLDER: "Search destination or route",
      SEARCH_BTN: "Search",
      SORT_LABEL: "Sort:",
      MOD_BACK: "Back to community feed",
      MOD_QUEUE: "Reported-content moderation queue",
      LOADING_STORIES: "Loading community travel stories...",
      EMPTY_TITLE: "No stories found under \"{{topic}}\"",
      EMPTY_SUB: "Be the first verified explorer to post tips for this topic!",
      WRITE_FIRST: "Write First Post",
      MOD_APPROVE: "Approve",
      MOD_FLAG: "Flag",
      MOD_REMOVE: "Remove",
      MOD_FEATURE: "★ Feature",
      REPORT_TITLE: "Report post",
      VERIFIED_TITLE: "Verified Traveler",
      GUIDE: "Guide",
      LIKES: "{{count}} Likes",
      COMMENTS: "{{count}} Comments",
      VIEWS: "{{count}} views",
      SHARE_WHATSAPP: "WhatsApp",
      SHARE_X: "X",
      SHARE_COPY: "Copy",
      SHARE_WHATSAPP_TITLE: "Share to WhatsApp",
      SHARE_X_TITLE: "Share to X",
      COPY_LINK_TITLE: "Copy link",
      DISCUSSION: "Discussion ({{count}})",
      COMMENT_PLACEHOLDER: "Share your experience or advice...",
      CREATE_TITLE: "Publish Journey Story or Tip",
      CATEGORY_LABEL: "Category / Forum Topic",
      STORY_TITLE_LABEL: "Story / Advice Title",
      STORY_TITLE_PLACEHOLDER: "e.g. Bangalore to Goa Sleeper Bus: Top 5 Pitstops",
      FROM_CITY: "From City",
      TO_CITY: "To City",
      PHOTO_LABEL: "Photo Image URL (Optional)",
      STORY_LABEL: "Your Travel Story / Tips",
      STORY_PLACEHOLDER: "Write your experience, sleeper quality, hygiene rating, or highway recommendations...",
      PUBLISH_NOW: "Publish Now",
      PROFILE_TITLE: "Traveler Community Profile",
      STORIES_SHARED: "Stories Shared",
      COMMUNITY_LIKES: "Community Likes",
      TOPIC_ALL: "All",
      TOPIC_JOURNEY_STORIES: "Journey Stories",
      TOPIC_TRAVEL_TIPS: "Travel Tips",
      TOPIC_ROUTE_ADVICE: "Route Advice",
      TOPIC_DESTINATION_GUIDE: "Destination Guide",
      TOPIC_GENERAL_DISCUSSION: "General Discussion",
      HERO_TAG : "Community Hub",
      TITLE : "Traveler Stories & Route Insights",
      SUBTITLE: "Connect with verified bus travelers, read authentic route reviews, and discover highway travel hacks across India.",
      SHARE_BTN:'Share Journey Story',
      ALL_TOPICS : 'All',
      SORT_RECENT : "Recent",
      SORT_TRENDING : "Trending" ,
      FEATURED : 'Featured Story',
      REPLY_BTN :"Reply",
      REPORT_BTN: "Report",
      SHARE : "Share" ,
    },

    NOTIFICATIONS :{
      CHANNELS_DESC: "Select which communication channels you would like to receive notifications through.",
      FILTER_ALL: "All",
      FILTER_BOOKINGS: "Bookings",
      FILTER_REMINDERS: "Reminders",
      FILTER_SCHEDULE: "Schedule",
      FILTER_OFFERS: "Offers",
      SYNC_LOGS: "Synchronizing notification logs...",
      EMPTY_TITLE: "No notifications found.",
      EMPTY_DESC: "You are all caught up! Automated trip reminders and booking confirmations will appear here.",
      LANGUAGE_TAG: "Language: {{code}}",
      STATUS_LABEL: "Status:",
      RETRY_BTN: "Retry failed deliveries",
      DEFAULT_SUFFIX: "(Default)",
      CHANNEL_EMAIL_TITLE: "Email Notifications",
      CHANNEL_EMAIL_DESC: "Receive tickets, invoices, and comprehensive alerts via email.",
      CHANNEL_PUSH_TITLE: "Push Notifications",
      CHANNEL_PUSH_DESC: "Instant lockscreen notifications on web and mobile devices.",
      CHANNEL_SMS_TITLE: "SMS Gateway",
      CHANNEL_SMS_DESC: "Critical boarding reminders sent directly as text messages.",
      EVENTS_HEADING: "Event Subscriptions & Marketing Opt-in",
      EVENTS_DESC: "Control optional messages such as highway deals and seasonal promotions.",
      PROMO_TITLE: "Promotional Offers & Discounts",
      PROMO_DESC: "Opt-in to receive weekly highway coupons and route discounts.",
      SCHEDULE_TITLE: "Schedule Changes & Delays",
      SCHEDULE_DESC: "Instant updates if your bus operator revises boarding or arrival times.",
      SIM_TITLE: "Multi-Channel Event Dispatch Simulator",
      SIM_DESC: "Test real-time message localization, multi-channel routing, and retry logic on demand.",
      EVENT_TYPE: "Event Type",
      EV_REMINDER: "Upcoming Journey Reminder",
      EV_SCHEDULE: "Schedule Change / Delay Alert",
      EV_PROMO: "Exclusive Highway Promotional Offer",
      EV_BOOKING: "Booking Confirmation Test",
      DEPARTURE_CITY: "Departure City",
      DESTINATION_CITY: "Destination City",
      NEW_TIME: "New Revised Departure Time",
      PROMO_CODE: "Promo Code",
      DISCOUNT_PCT: "Discount (%)",
      DISPATCH_BTN: "Dispatch Notification Now",
      TOAST_SIGN_IN_FIRST: "Please sign in before opening notifications.",
      TOAST_SESSION_INVALID: "Your session is invalid. Please sign in again.",
      TOAST_LOAD_FAILED: "Error loading notification history.",
      TOAST_PREFS_SAVED: "Preferences saved successfully.",
      TOAST_PREFS_FAILED: "Failed to save preferences.",
      TOAST_ALL_READ: "All notifications marked as read.",
      TOAST_RETRY_DONE: "Delivery retry completed.",
      TOAST_RETRY_FAILED: "Retry attempt failed.",
      TOAST_SENT: "Notification sent and logged in real-time!",
      TOAST_SIM_FAILED: "Simulation failed.",
      TAG: "Reliable Messaging Hub",
      TITLE : "Notification Center" ,
      SUBTITLE:"Real-time alerts, multi-channel delivery tracking, and custom communication preferences.",
      TAB_INBOX: 'Inbox',
      TAB_PREFERENCES : "Preferences" ,
      TAB_SIMULATOR : "Event Simulator" ,
      UNREAD_ONLY : "Unread Only" ,
      MARK_ALL_READ :"Mark All Read",
      LANG_HEADING:"Language & Localization",
      LANG_DESC: "Choose your preferred language for all booking alerts, SMS messages, and journey updates.",
      CHANNELS_HEADING : "Delivery Channels",
      SAVE_PREF_BTN : "Save Notification Settings"
    }
  },

  hi: {
    NAV :{
      NEW_TO_REDBUS: "RedBus पर नए हैं?",
      WELCOME_NEW: "RedBus में स्वागत है! आपका खाता बन गया है।",
      ERR_SERVER_UNREACHABLE: "RedBus सर्वर से संपर्क नहीं हो पा रहा। जांचें कि बैकएंड चल रहा है, फिर पुनः प्रयास करें।",
      ERR_SIGN_IN_FAILED: "Google साइन इन पूरा नहीं हो सका। कृपया फिर से प्रयास करें।",
      DASHBOARD: "डैशबोर्ड",
      ACCOUNT_DETAILS: "खाता विवरण",
      THEME_TO_LIGHT: "लाइट मोड पर जाएं",
      THEME_TO_DARK: "डार्क मोड पर जाएं",
      SIGN_IN: "साइन इन",
      SIGN_IN_NOT_CONFIGURED: "इस साइट पर Google साइन इन अभी कॉन्फ़िगर नहीं है।",
      HOME : "होम",
      ROUTE_PLANNER : "मार्ग योजनाकार",
      COMMUNITY : "यात्रा समुदाय" ,
      NOTIFICATIONS:"सूचनाएं",
      SELECT_LANGUAGE : "भाषा",
      BUS_TICKETS: "बस टिकट",
      REVIEWS: "समीक्षाएं",
      HELP: "मदद",
      ACCOUNT: "खाता",
      MY_TRIPS: "मेरी यात्राएं",
      WALLET: "वॉलेट / कार्ड",
      MY_PROFILE: "मेरी प्रोफ़ाइल",
      SIGN_OUT: "साइन आउट"
    },
    COMMON :{
      SAVE : "सुरक्षित करें",
      CANCEL:"रद्द करें",
      DELETE : "हटाएं",
      SEARCH : "खोजें",
      SUBMIT :'जमा करें',
      RETRY : "पुनः प्रयास करें",
      CONFIRM: "पुष्टि करें" ,
      LOADING: "लोड हो रहा है...",
      STATUS:'स्थिति',
      LANGUAGE : "भाषा",
      SUCCESS: "सफल",
      ERROR:"त्रुटि"
    } ,

    VALIDATION : {
      REQUIRED : "यह फ़ील्ड आवश्यक है।",
      INVALID_EMAIL: "कृपया मान्य ईमेल दर्ज करें।" ,
      PHONE_REQUIRED:"फ़ोन नंबर अनिवार्य है।",
      MIN_SEATS :  "कम से कम एक सीट चुनें।",
      TITLE_REQUIRED : "शीर्षक आवश्यक है।",
      CONTENT_REQUIRED : 'विवरण रिक्त नहीं हो सकता।'
    },
    PLANNER :{
      TITLE: "इंटरैक्टिव मार्ग योजनाकार",
      SUBTITLE: "कस्टम वेपॉइंट्स सेट करें, वैकल्पिक हाईवे की तुलना करें और ट्रैफिक जाम से बचें।",
      ORIGIN_LABEL: "प्रारंभिक स्थान (स्रोत)",
      DEST_LABEL: "गंतव्य" ,
      WAYPOINTS: "मध्यवर्ती पड़ाव (वेपॉइंट)" ,
      ADD_WAYPOINT: '+ जोड़ें',
      RECOMPUTE_BTN: "लाइव मार्ग की गणना करें",
      LIVE_TRAFFIC: "लाइव ट्रैफिक ऑटो-सिंक सक्रिय है",
      ESTIMATED_NOTICE : "केवल अनुमानित समय: सर्वर पर लाइव ट्रैफ़िक जुड़ा नहीं है, इसलिए भीड़ के आँकड़े अनुमानित हैं।",
      SUGGESTED_ROUTES: "सुझाए गए हाईवे मार्ग",
      FASTEST_BADGE: "सबसे तेज़ मार्ग",
      TOLL_INFO: 'टोल टैक्स',
      SAVE_ROUTE_BTN:"यह मार्ग सुरक्षित करें" ,
      CHOKE_POINTS: "ट्रैफिक जाम बिंदु",
      TAB_ROUTES: "यात्रा मार्ग",
      TAB_COMPARE: "मार्ग तुलना",
      TAB_SAVED: "सुरक्षित मार्ग",
      COMPARE_TITLE: "मार्ग मूल्यांकन तुलना तालिका" ,
      COMPARE_SUBTITLE: 'दूरी, देरी, टोल खर्च और वास्तविक समय की भीड़ की तुलना करें।',
    },
    REVIEWS: {
      NO_ROUTES: "अभी कोई बस मार्ग उपलब्ध नहीं है।",
      ROUTES_UNAVAILABLE: "मार्ग सूची लोड नहीं हो सकी। जांचें कि सर्वर चल रहा है।",
      ALL_ROUTES: "सभी मार्ग",
      LANG_ALL: "सभी भाषाएं",
      SORT_HIGHEST: "सबसे अधिक रेटिंग",
      SORT_LOWEST: "सबसे कम रेटिंग",
      TOAST_LOAD_REVIEWS_FAILED: "मार्ग समीक्षाएं लोड नहीं हो सकीं।",
      TOAST_LOAD_ROUTES_FAILED: "बस मार्ग लोड नहीं हो सके।",
      TOAST_VERIFIED_ONLY: "केवल पूरी की गई यात्रा टिकट वाले सत्यापित यात्री ही समीक्षा पोस्ट कर सकते हैं।",
      TOAST_NO_ELIGIBLE: "आपके खाते में बिना समीक्षा की पूरी यात्रा नहीं मिली।",
      TOAST_EDIT_EXPIRED: "इस समीक्षा की 24 घंटे की संपादन अवधि समाप्त हो चुकी है।",
      TOAST_MIN_CHARS: "कृपया अपनी प्रतिक्रिया में कम से कम 20 अक्षर लिखें।",
      TOAST_UPDATED: "समीक्षा सफलतापूर्वक अपडेट हुई।",
      TOAST_UPDATE_FAILED: "समीक्षा अपडेट करने में त्रुटि।",
      TOAST_PUBLISHED: "समीक्षा सफलतापूर्वक प्रकाशित हुई!",
      TOAST_SUBMIT_FAILED: "समीक्षा सबमिट नहीं हो सकी।",
      TOAST_VOTE_FAILED: "उपयोगी वोट दर्ज नहीं हो सका।",
      TOAST_REPORT_FAILED: "समीक्षा की रिपोर्ट सबमिट करने में त्रुटि।",
      HERO_TAG: "केवल सत्यापित यात्रा समीक्षाएं",
      TITLE: "मार्ग रेटिंग और यात्री प्रतिक्रिया",
      SUBTITLE: "केवल अपनी यात्रा पूरी करने वाले यात्रियों द्वारा दी गई पारदर्शी रेटिंग। पोस्ट करने के 24 घंटे के भीतर समीक्षा संपादित की जा सकती है।",
      RATE_BTN: "अपनी पूरी की गई यात्रा रेट करें",
      AVAILABLE: "({{count}} उपलब्ध)",
      SELECT_ROUTE: "बस ऑपरेटर और मार्ग चुनें:",
      ALL_REVIEWS: "सभी समीक्षाएं",
      ONLY_STAR: "केवल {{star}} ★",
      SORT: "क्रमबद्ध करें:",
      SORT_RECENT: "हाल का",
      SORT_HELPFUL: "सबसे उपयोगी",
      VERIFIED_RATINGS: "{{count}} सत्यापित रेटिंग",
      INTEGRITY_TITLE: "समीक्षा की विश्वसनीयता",
      INTEGRITY_1: "यात्रा पूरी होने के बाद ही रेटिंग दी जा सकती है।",
      INTEGRITY_2: "प्रति टिकट बुकिंग 1 समीक्षा।",
      INTEGRITY_3: "सबमिट करने के बाद 24 घंटे का संपादन समय।",
      INTEGRITY_4: "रिपोर्ट की गई/छिपी समीक्षाएं औसत रेटिंग में शामिल नहीं होतीं।",
      LOADING: "सत्यापित यात्रा समीक्षाएं लोड हो रही हैं...",
      EMPTY_TITLE: "इस फ़िल्टर में कोई समीक्षा नहीं मिली।",
      EMPTY_SUB: "इस मार्ग पर यात्रा पूरी की है? अपना अनुभव साझा करने वाले पहले व्यक्ति बनें!",
      WRITE_REVIEW: "समीक्षा लिखें",
      TRUSTED_REVIEWER: "भरोसेमंद समीक्षक",
      TRUSTED_TITLE: "अक्सर उपयोगी समीक्षक",
      VERIFIED_PASSENGER: "सत्यापित यात्री",
      JOURNEY: "यात्रा:",
      TO: "से",
      RATING_OUT_OF: "{{rating}} / 5",
      HELPFUL: "उपयोगी ({{count}})",
      REPORT: "रिपोर्ट करें",
      REPORT_TITLE: "समीक्षा रिपोर्ट करें",
      EDIT_BTN: "समीक्षा संपादित करें (24 घंटे की अवधि सक्रिय)",
      EDIT_LOCKED: "संपादन अवधि बंद",
      MODAL_EDIT: "मार्ग समीक्षा संपादित करें",
      MODAL_NEW: "मार्ग रेटिंग और समीक्षा सबमिट करें",
      SELECT_JOURNEY: "अपनी पूरी की गई यात्रा चुनें",
      PNR: "PNR:",
      RATING_LABEL: "आपकी रेटिंग (1 से 5 स्टार)",
      STARS_SELECTED: "स्टार चुने गए",
      HEADLINE_LABEL: "समीक्षा शीर्षक (वैकल्पिक)",
      HEADLINE_PLACEHOLDER: "उदा. समय पर प्रस्थान, आरामदायक हाईवे सफ़र",
      COMMENT_LABEL: "प्रतिक्रिया और यात्रा अनुभव (न्यूनतम 20 अक्षर)",
      COMMENT_PLACEHOLDER: "सीट की आराम, समय की पाबंदी, ड्राइवर की सुरक्षा और स्वच्छता के बारे में बताएं...",
      CHAR_COUNT: "{{count}} / 20 अक्षर आवश्यक",
      SUBMIT_NEW: "सत्यापित समीक्षा प्रकाशित करें",
      SUBMIT_EDIT: "समीक्षा अपडेट करें",
    },
      LANDING: {
        NO_FILTER_MATCH: "चुने गए फ़िल्टर से कोई बस मेल नहीं खाती। अधिक बसें देखने के लिए कुछ फ़िल्टर हटाएं।",
        FAQ_Q8: "मैं अपना बस टिकट कैसे रद्द करूं?",
        FAQ_A8: "\"मेरी यात्राएं\" खोलें, कोई आने वाली पुष्ट यात्रा चुनें और \"बुकिंग रद्द करें\" दबाएं। सीटें तुरंत छूट जाती हैं। इस संस्करण में रिफंड अपने-आप नहीं होता, इसलिए रिफंड के लिए बस ऑपरेटर से संपर्क करें।",
        FAQ_Q9: "क्या मैं अपनी बुकिंग में यात्रा बीमा जोड़ सकता हूं?",
        FAQ_A9: "हां, बीमा वैकल्पिक है। आगे बढ़ने से पहले बुकिंग फ़ॉर्म पर बीमा का चेकबॉक्स चुनें और वहां दी गई शर्तें पढ़ें। बीमा नहीं चाहिए तो इसे बिना चुने छोड़ दें।",
        NO_BUSES: "इस मार्ग पर {{date}} के लिए कोई बस नहीं मिली। कोई दूसरी तारीख या समय चुनें, या दूसरा मार्ग चुनें।",
        TIME_LABEL: "प्रस्थान का समय",
        TIME_ANY: "कोई भी समय",
        TIME_EARLY: "सुबह 12 - 6 बजे",
        TIME_MORNING: "सुबह 6 - दोपहर 12",
        TIME_AFTERNOON: "दोपहर 12 - शाम 6",
        TIME_EVENING: "शाम 6 - रात 12",
        ALERT_SAME_CITY: "कृपया दो अलग-अलग शहर चुनें।",
        HERO_TITLE: "भारत की नंबर 1 ऑनलाइन बस टिकट बुकिंग साइट",
        FROM: "कहां से",
        TO: "कहां तक",
        DATE: "तारीख",
        SEARCH_BUSES: "बसें खोजें",
        OFFERS_TITLE: "लोकप्रिय ऑफ़र",
        VIEW_ALL: "सभी देखें",
        OFFER_BADGE: "बस",
        OFFER_1: "बस टिकट पर ₹250 तक बचाएं",
        OFFER_2: "AP, TS मार्गों पर ₹300 तक बचाएं",
        OFFER_3: "RJ, MH, गोवा, MP पर ₹300 तक बचाएं",
        OFFER_4: "केरल के मार्गों पर ₹200 तक बचाएं",
        VALID_TILL: "30 नवंबर तक वैध",
        FAQ_TITLE: "अक्सर पूछे जाने वाले प्रश्न",
        FAQ_TAB_GENERAL: "सामान्य",
        FAQ_TAB_TICKET: "टिकट संबंधी",
        FAQ_TAB_MORE: "और",
        FAQ_TAB_PAYMENT: "भुगतान",
        FAQ_TAB_CANCEL: "रद्दीकरण और रिफंड",
        FAQ_TAB_INSURANCE: "बीमा",
        FAQ_Q1: "क्या मैं अपनी बुक की गई बस का स्थान ऑनलाइन ट्रैक कर सकता हूं?",
        FAQ_Q2: "tedbus पर बस टिकट ऑनलाइन क्यों बुक करें?",
        FAQ_Q3: "बस टिकट बुक करने के लिए क्या मुझे tedbus साइट पर खाता बनाना होगा?",
        FAQ_Q4: "क्या ऑनलाइन बस बुकिंग में मुझे ज़्यादा पैसे लगते हैं?",
        FAQ_Q5: "बस बुकिंग पर छूट कैसे पाऊं?",
        FAQ_Q6: "tedbus पर बस बुकिंग में नया क्या है?",
        FAQ_Q7: "क्या मैं tedbus पर सरकारी बस टिकट बुक कर सकता हूं?",
        FAQ_A1: "RedBus अभी आपकी बस की लाइव GPS स्थिति नहीं दिखाता। आपकी यात्रा की जानकारी, जिसमें ऑपरेटर, बस का नाम, मार्ग, बोर्डिंग पॉइंट और प्रस्थान का समय शामिल हैं, \"मेरी यात्राएं\" में उपलब्ध है। बस की वर्तमान स्थिति जानने के लिए सीधे बस ऑपरेटर से संपर्क करें।",
        FAQ_A2: "ऑनलाइन बुकिंग में आप अपने मार्ग की हर बस देख सकते हैं, अपनी सीटें चुन सकते हैं, यात्रा से पहले भुगतान कर सकते हैं और सभी टिकट \"मेरी यात्राएं\" में रख सकते हैं। आपको बुकिंग, समय-सारणी बदलाव और यात्रा रिमाइंडर ईमेल, पुश या ऐप सूचना के रूप में मिलते हैं। आप \"मेरी यात्राएं\" से आने वाली पुष्ट यात्रा रद्द कर सकते हैं।",
        FAQ_A3: "हां। RedBus Google साइन इन का उपयोग करता है, इसलिए आपको एक Google खाते की आवश्यकता है। RedBus का अलग पासवर्ड नहीं है। जब आप पहली बार Google से साइन अप या साइन इन चुनते हैं, तब आपका RedBus खाता अपने-आप बन जाता है। सत्यापित खाते समुदाय पोस्ट और मार्ग समीक्षाएं भी प्रकाशित कर सकते हैं।",
        FAQ_A4: "नहीं। हर बस पर दिखाया गया किराया प्रति सीट का मूल्य है। भुगतान पेज पर भुगतान से पहले आपकी चुनी हुई सीटों का कुल योग दिखता है, और वहां कोई अलग बुकिंग शुल्क की पंक्ति नहीं है। पुष्टि करने से पहले भुगतान पेज पर कुल राशि जांच लें।",
        FAQ_A5: "होम पेज पर दिए गए ऑफ़र, जैसे FIRST, SUPERHIT, BUS300 और RBTRIP, उनकी वैधता तिथि के साथ सूचीबद्ध हैं। इस संस्करण में ऑफ़र कोड चेकआउट पर अपने-आप लागू नहीं होते, इसलिए भुगतान पेज पूरा किराया दिखाता है। बुकिंग से पहले होम पेज पर ऑफ़र का विवरण जांच लें।",
        FAQ_A6: "इस संस्करण में नया: कहानियों, सुझावों और फ़ोटो वाला यात्रा समुदाय; ट्रैफ़िक जानकारी, वैकल्पिक मार्ग, मार्ग तुलना और सहेजे गए मार्गों वाला मार्ग योजनाकार; ईमेल, पुश, ऐप और वैकल्पिक SMS अलर्ट वाला सूचना केंद्र; सत्यापित मार्ग समीक्षाएं जिन्हें मार्ग, भाषा और रेटिंग से छाना जा सकता है और नवीनतम, सबसे अधिक, सबसे कम या सबसे उपयोगी के अनुसार क्रमबद्ध किया जा सकता है; डार्क मोड; और अंग्रेज़ी, हिन्दी, तेलुगु और तमिल।",
        FAQ_A7: "RedBus हमारी सूची के निजी ऑपरेटरों की बसें दिखाता है। सरकारी (राज्य परिवहन) बसें अभी इस वेबसाइट पर अलग से सूचीबद्ध नहीं हैं, इसलिए यहां उनकी बुकिंग नहीं हो सकती। सरकारी बस टिकट के लिए राज्य परिवहन निगम की आधिकारिक वेबसाइट या काउंटर का उपयोग करें।",
        ALERT_FILL: "कृपया सभी विवरण भरें!",
        DIALOG_TITLE: "उपलब्ध बस मार्ग",
        DIALOG_NO: "क्र.",
        DIALOG_FROM: "से",
        DIALOG_TO: "तक",
        DIALOG_BUSES: "बसों की संख्या",
      },
      ACCOUNT: {
        SESSION_EXPIRED: "आपका सत्र समाप्त हो गया है। कृपया Google से फिर से साइन इन करें।",
        TITLE: "खाता विवरण",
        SUBTITLE: "बुकिंग और अलर्ट के लिए उपयोग होने वाली आपकी व्यक्तिगत जानकारी।",
        SIGN_IN_PROMPT: "अपना खाता देखने के लिए साइन इन करें।",
        LOADING: "खाता विवरण लोड हो रहा है...",
        LOAD_FAILED: "आपके खाते का विवरण लोड नहीं हो सका।",
        FIELD_NAME: "नाम",
        FIELD_EMAIL: "ईमेल",
        EMAIL_NOTE: "आपका ईमेल आपके Google खाते से आता है और यहां बदला नहीं जा सकता।",
        FIELD_PHONE: "फ़ोन",
        PHONE_NOT_ADDED: "अभी नहीं जोड़ा",
        FIELD_GENDER: "लिंग",
        FIELD_AGE: "उम्र",
        FIELD_VERIFICATION: "सत्यापन",
        VERIFIED: "सत्यापित यात्री",
        NOT_VERIFIED: "सत्यापित नहीं",
        FIELD_ROLE: "खाता प्रकार",
        FIELD_LANGUAGE: "पसंदीदा भाषा",
        FIELD_THEME: "थीम",
        THEME_LIGHT: "लाइट",
        THEME_DARK: "डार्क",
        EDIT_TITLE: "विवरण संपादित करें",
        SAVE: "बदलाव सहेजें",
        SAVING: "सहेजा जा रहा है...",
        SAVED: "खाता विवरण अपडेट हो गया।",
        SAVE_FAILED: "आपका विवरण अपडेट नहीं हो सका।",
        GENDER_MALE: "पुरुष",
        GENDER_FEMALE: "महिला",
        GENDER_OTHER: "अन्य",
        SIGN_OUT: "साइन आउट",
      },
      DASHBOARD: {
        TITLE: "मेरा डैशबोर्ड",
        SUBTITLE: "आपकी यात्राएं, समीक्षाएं और सूचनाएं एक ही जगह।",
        SIGN_IN_PROMPT: "अपना डैशबोर्ड देखने के लिए साइन इन करें।",
        LOADING: "आपका डैशबोर्ड लोड हो रहा है...",
        LOAD_FAILED: "आपकी यात्राएं लोड नहीं हो सकीं। कृपया फिर से प्रयास करें।",
        STAT_UPCOMING: "आगामी यात्राएं",
        STAT_TOTAL: "कुल बुकिंग",
        STAT_UNREAD: "बिना पढ़ी सूचनाएं",
        STAT_REVIEWS: "समीक्षा के लिए यात्राएं",
        TRIPS_HEADING: "मेरी यात्राएं",
        NO_TRIPS: "आपकी अभी कोई बुकिंग नहीं है।",
        BOOK_NOW: "टिकट बुक करें",
        STATUS_CONFIRMED: "पुष्टि हुई",
        STATUS_CANCELLED: "रद्द",
        STATUS_COMPLETED: "पूरी हुई",
        STATUS_PENDING: "लंबित",
        PNR: "PNR",
        SEATS: "सीटें",
        FARE: "किराया",
        JOURNEY: "यात्रा",
        QUICK_LINKS: "त्वरित लिंक",
        GO_HOME: "टिकट बुक करें",
        GO_NOTIFICATIONS: "सूचनाएं",
        GO_REVIEWS: "मार्ग समीक्षाएं",
        GO_COMMUNITY: "समुदाय",
        GO_PLANNER: "मार्ग योजनाकार",
      },
      PROFILE: {
        SIGN_IN_PROMPT: "अपनी प्रोफ़ाइल देखने के लिए साइन इन करें।",
        TAB_DASHBOARD: "डैशबोर्ड",
        TAB_TRIPS: "मेरी यात्राएं",
        TAB_PROFILE: "मेरी प्रोफ़ाइल",
        TAB_PREFERENCES: "प्राथमिकताएं",
        PREF_THEME: "थीम",
        PREF_THEME_DESC: "पूरे ऐप के लिए लाइट या डार्क मोड चुनें।",
        PREF_LIGHT: "लाइट",
        PREF_DARK: "डार्क",
        PREF_LANGUAGE: "भाषा",
        PREF_LANGUAGE_DESC: "ऐप और आपकी बुकिंग अलर्ट की भाषा।",
        PREF_ALERTS: "अलर्ट और गतिविधि",
        PREF_ALERTS_DESC: "सूचना सेटिंग, आपकी मार्ग समीक्षाएं और समुदाय पोस्ट।",
        GO_NOTIFICATIONS: "सूचना सेटिंग",
        GO_REVIEWS: "आपकी मार्ग समीक्षाएं",
        GO_COMMUNITY: "समुदाय पोस्ट",
        SIGN_OUT: "साइन आउट",
      },
      OFFER: {
        TITLE: "ऑफ़र कोड",
        PLACEHOLDER: "ऑफ़र कोड लिखें",
        APPLY: "लागू करें",
        REMOVE: "हटाएं",
        DISCOUNT: "ऑफ़र छूट",
        APPLIED: "ऑफ़र लागू हो गया।",
        UNKNOWN: "यह ऑफ़र कोड मान्य नहीं है।",
        EXPIRED: "यह ऑफ़र समाप्त हो गया है।",
        NOT_ELIGIBLE: "यह ऑफ़र इस मार्ग पर लागू नहीं होता।",
        UNAVAILABLE: "ऑफ़र जांचा नहीं जा सका। कृपया फिर से प्रयास करें।",
      },
      TRIPS: {
        SESSION_EXPIRED: "आपका सत्र समाप्त हो गया है। कृपया Google से फिर से साइन इन करें।",
        SORT_LABEL: "क्रमबद्ध करें:",
        SORT_NEWEST: "नवीनतम यात्रा",
        SORT_OLDEST_TRIP: "सबसे पुरानी यात्रा",
        SORT_FARE_HIGH: "किराया: अधिक से कम",
        SORT_FARE_LOW: "किराया: कम से अधिक",
        TITLE: "मेरी यात्राएं",
        SUBTITLE: "आगामी, पूरी और रद्द बुकिंग।",
        FILTER_ALL: "सभी",
        FILTER_UPCOMING: "आगामी",
        FILTER_COMPLETED: "पूरी हुई",
        FILTER_CANCELLED: "रद्द",
        EMPTY: "इस सूची में कोई यात्रा नहीं।",
        LOADING: "आपकी यात्राएं लोड हो रही हैं...",
        CANCEL_BTN: "बुकिंग रद्द करें",
        CANCEL_CONFIRM: "बुकिंग {{pnr}} रद्द करें? आपकी सीटें छोड़ दी जाएंगी।",
        CANCELLED_OK: "बुकिंग रद्द हो गई। आपकी सीटें छोड़ दी गई हैं।",
        CANCEL_FAILED: "यह बुकिंग रद्द नहीं हो सकी।",
        REVIEW_TRIP: "इस यात्रा की समीक्षा करें",
      },
    COMMUNITY : {
      LANG_LABEL: "भाषा:",
      LANG_ALL: "सभी भाषाएं",
      SORT_LIKED: "सबसे अधिक पसंद",
      SORT_DISCUSSED: "सबसे अधिक चर्चा",
      SORT_VIEWED: "सबसे अधिक देखे गए",
      SORT_OLDEST: "सबसे पुराने",
      TOAST_LOAD_FAILED: "समुदाय की कहानियां लोड नहीं हो सकीं।",
      TOAST_LOGIN_TO_LIKE: "पसंद करने के लिए यात्री प्रोफ़ाइल से लॉग इन करें।",
      TOAST_LIKE_FAILED: "पसंद दर्ज नहीं हो सकी।",
      TOAST_COMMENT_FAILED: "टिप्पणी जोड़ने में त्रुटि।",
      TOAST_VERIFIED_ONLY_POST: "केवल सत्यापित यात्रियों को कहानियां प्रकाशित करने की अनुमति है।",
      TOAST_TITLE_REQUIRED: "शीर्षक और सामग्री आवश्यक हैं।",
      TOAST_PUBLISHED: "आपकी यात्रा कहानी प्रकाशित हो गई है!",
      TOAST_POST_FAILED: "पोस्ट सबमिट नहीं हो सकी।",
      TOAST_MOD_DONE: "मॉडरेशन कार्रवाई पूरी हुई।",
      TOAST_MOD_FAILED: "मॉडरेशन कार्रवाई विफल रही।",
      TOAST_REPORT_FAILED: "रिपोर्ट सबमिट करने में त्रुटि।",
      TOAST_LINK_COPIED: "पोस्ट लिंक क्लिपबोर्ड पर कॉपी हो गया!",
      SEARCH_PLACEHOLDER: "गंतव्य या मार्ग खोजें",
      SEARCH_BTN: "खोजें",
      SORT_LABEL: "क्रमबद्ध करें:",
      MOD_BACK: "समुदाय फ़ीड पर वापस जाएं",
      MOD_QUEUE: "रिपोर्ट की गई सामग्री की समीक्षा सूची",
      LOADING_STORIES: "यात्रा कहानियां लोड हो रही हैं...",
      EMPTY_TITLE: "\"{{topic}}\" में कोई कहानी नहीं मिली",
      EMPTY_SUB: "इस विषय पर सुझाव देने वाले पहले सत्यापित यात्री बनें!",
      WRITE_FIRST: "पहली पोस्ट लिखें",
      MOD_APPROVE: "स्वीकृत करें",
      MOD_FLAG: "चिह्नित करें",
      MOD_REMOVE: "हटाएं",
      MOD_FEATURE: "★ विशेष बनाएं",
      REPORT_TITLE: "पोस्ट रिपोर्ट करें",
      VERIFIED_TITLE: "सत्यापित यात्री",
      GUIDE: "गाइड",
      LIKES: "{{count}} पसंद",
      COMMENTS: "{{count}} टिप्पणियां",
      VIEWS: "{{count}} बार देखा गया",
      SHARE_WHATSAPP: "WhatsApp",
      SHARE_X: "X",
      SHARE_COPY: "कॉपी",
      SHARE_WHATSAPP_TITLE: "WhatsApp पर साझा करें",
      SHARE_X_TITLE: "X पर साझा करें",
      COPY_LINK_TITLE: "लिंक कॉपी करें",
      DISCUSSION: "चर्चा ({{count}})",
      COMMENT_PLACEHOLDER: "अपना अनुभव या सलाह साझा करें...",
      CREATE_TITLE: "यात्रा कहानी या सुझाव प्रकाशित करें",
      CATEGORY_LABEL: "श्रेणी / मंच विषय",
      STORY_TITLE_LABEL: "कहानी / सलाह का शीर्षक",
      STORY_TITLE_PLACEHOLDER: "उदा. बेंगलुरु से गोवा स्लीपर बस: शीर्ष 5 पड़ाव",
      FROM_CITY: "प्रस्थान शहर",
      TO_CITY: "गंतव्य शहर",
      PHOTO_LABEL: "फ़ोटो इमेज URL (वैकल्पिक)",
      STORY_LABEL: "आपकी यात्रा कहानी / सुझाव",
      STORY_PLACEHOLDER: "अपना अनुभव, स्लीपर की गुणवत्ता, स्वच्छता या हाईवे सिफारिशें लिखें...",
      PUBLISH_NOW: "अभी प्रकाशित करें",
      PROFILE_TITLE: "यात्री समुदाय प्रोफ़ाइल",
      STORIES_SHARED: "साझा की गई कहानियां",
      COMMUNITY_LIKES: "समुदाय पसंद",
      TOPIC_ALL: "सभी",
      TOPIC_JOURNEY_STORIES: "यात्रा कहानियां",
      TOPIC_TRAVEL_TIPS: "यात्रा सुझाव",
      TOPIC_ROUTE_ADVICE: "मार्ग सलाह",
      TOPIC_DESTINATION_GUIDE: "गंतव्य गाइड",
      TOPIC_GENERAL_DISCUSSION: "सामान्य चर्चा",
      HERO_TAG:"समुदाय केंद्र" ,
      TITLE : "यात्री कहानियां और मार्ग समीक्षाएं",
      SUBTITLE : "सत्यापित बस यात्रियों से जुड़ें, प्रामाणिक समीक्षाएं पढ़ें और यात्रा के टिप्स जानें।",
      SHARE_BTN : "यात्रा की कहानी साझा करें",
      ALL_TOPICS :'सभी',
      SORT_RECENT : "हाल का",
      SORT_TRENDING : "ट्रेंडिंग",
      FEATURED : "विशेष कहानी",
      REPLY_BTN: "उत्तर दें",
      REPORT_BTN : "रिपोर्ट करें",
      SHARE : "साझा करें"
    },

    NOTIFICATIONS: {
      CHANNELS_DESC: "आप किन संचार चैनलों के माध्यम से सूचनाएं प्राप्त करना चाहते हैं, चुनें।",
      FILTER_ALL: "सभी",
      FILTER_BOOKINGS: "बुकिंग",
      FILTER_REMINDERS: "रिमाइंडर",
      FILTER_SCHEDULE: "समय-सारणी",
      FILTER_OFFERS: "ऑफ़र",
      SYNC_LOGS: "सूचना लॉग सिंक हो रहे हैं...",
      EMPTY_TITLE: "कोई सूचना नहीं मिली।",
      EMPTY_DESC: "आप सब अपडेट हैं! स्वचालित यात्रा रिमाइंडर और बुकिंग पुष्टिकरण यहां दिखाई देंगे।",
      LANGUAGE_TAG: "भाषा: {{code}}",
      STATUS_LABEL: "स्थिति:",
      RETRY_BTN: "विफल डिलीवरी फिर से भेजें",
      DEFAULT_SUFFIX: "(डिफ़ॉल्ट)",
      CHANNEL_EMAIL_TITLE: "ईमेल सूचनाएं",
      CHANNEL_EMAIL_DESC: "ईमेल के माध्यम से टिकट, इनवॉइस और विस्तृत अलर्ट प्राप्त करें।",
      CHANNEL_PUSH_TITLE: "पुश सूचनाएं",
      CHANNEL_PUSH_DESC: "वेब और मोबाइल डिवाइस पर तुरंत लॉक-स्क्रीन सूचनाएं।",
      CHANNEL_SMS_TITLE: "SMS गेटवे",
      CHANNEL_SMS_DESC: "महत्वपूर्ण बोर्डिंग रिमाइंडर सीधे टेक्स्ट संदेश के रूप में भेजे जाते हैं।",
      EVENTS_HEADING: "इवेंट सदस्यता और मार्केटिंग सहमति",
      EVENTS_DESC: "हाईवे डील और मौसमी प्रमोशन जैसे वैकल्पिक संदेश नियंत्रित करें।",
      PROMO_TITLE: "प्रमोशनल ऑफ़र और छूट",
      PROMO_DESC: "साप्ताहिक हाईवे कूपन और मार्ग छूट प्राप्त करने के लिए सहमति दें।",
      SCHEDULE_TITLE: "समय-सारणी बदलाव और देरी",
      SCHEDULE_DESC: "यदि आपका बस ऑपरेटर बोर्डिंग या आगमन का समय बदलता है, तो तुरंत अपडेट।",
      SIM_TITLE: "मल्टी-चैनल इवेंट डिस्पैच सिम्युलेटर",
      SIM_DESC: "रीयल-टाइम संदेश स्थानीयकरण, मल्टी-चैनल रूटिंग और रिट्राई लॉजिक की जांच करें।",
      EVENT_TYPE: "इवेंट प्रकार",
      EV_REMINDER: "आगामी यात्रा रिमाइंडर",
      EV_SCHEDULE: "समय-सारणी बदलाव / देरी अलर्ट",
      EV_PROMO: "विशेष हाईवे प्रमोशनल ऑफ़र",
      EV_BOOKING: "बुकिंग पुष्टि परीक्षण",
      DEPARTURE_CITY: "प्रस्थान शहर",
      DESTINATION_CITY: "गंतव्य शहर",
      NEW_TIME: "नया संशोधित प्रस्थान समय",
      PROMO_CODE: "प्रोमो कोड",
      DISCOUNT_PCT: "छूट (%)",
      DISPATCH_BTN: "अभी सूचना भेजें",
      TOAST_SIGN_IN_FIRST: "नोटिफ़िकेशन खोलने से पहले साइन इन करें।",
      TOAST_SESSION_INVALID: "आपका सत्र अमान्य है। कृपया फिर से साइन इन करें।",
      TOAST_LOAD_FAILED: "सूचना इतिहास लोड करने में त्रुटि।",
      TOAST_PREFS_SAVED: "प्राथमिकताएं सफलतापूर्वक सहेजी गईं।",
      TOAST_PREFS_FAILED: "प्राथमिकताएं सहेजने में विफल।",
      TOAST_ALL_READ: "सभी सूचनाएं पढ़ी हुई चिह्नित की गईं।",
      TOAST_RETRY_DONE: "डिलीवरी पुनः प्रयास पूरा हुआ।",
      TOAST_RETRY_FAILED: "पुनः प्रयास विफल रहा।",
      TOAST_SENT: "सूचना भेजी गई और रीयल-टाइम में लॉग की गई!",
      TOAST_SIM_FAILED: "सिमुलेशन विफल रहा।",
      TAG : "विश्वसनीय संदेश केंद्र",
      TITLE:"सूचना केंद्र",
      SUBTITLE : "रियल-टाइम अलर्ट, मल्टी-चैनल डिलीवरी ट्रैकिंग और कस्टम प्राथमिकताएं।",
      TAB_INBOX : "इनबॉक्स",
      TAB_PREFERENCES: 'प्राथमिकताएं',
      TAB_SIMULATOR : "इवेंट सिम्युलेटर",
      UNREAD_ONLY:"केवल न पढ़े गए",
      MARK_ALL_READ:"सभी को पढ़ा हुआ चिह्नित करें",
      LANG_HEADING :"भाषा और स्थानीयकरण",
      LANG_DESC : "सभी बुकिंग अलर्ट और यात्रा अपडेट के लिए अपनी पसंदीदा भाषा चुनें।" ,
      CHANNELS_HEADING : "वितरण चैनल",
      SAVE_PREF_BTN : 'सेटिंग्स सुरक्षित करें',
    }
  } ,

  te:{
    NAV:{
      NEW_TO_REDBUS: "RedBus కి కొత్తవారా?",
      WELCOME_NEW: "RedBus కి స్వాగతం! మీ ఖాతా సృష్టించబడింది.",
      ERR_SERVER_UNREACHABLE: "RedBus సర్వర్‌కు చేరలేకపోతున్నాము. బ్యాకెండ్ నడుస్తోందో చూసి మళ్లీ ప్రయత్నించండి.",
      ERR_SIGN_IN_FAILED: "Google సైన్ ఇన్ పూర్తి కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.",
      DASHBOARD: "డాష్‌బోర్డ్",
      ACCOUNT_DETAILS: "ఖాతా వివరాలు",
      THEME_TO_LIGHT: "లైట్ మోడ్‌కు మారండి",
      THEME_TO_DARK: "డార్క్ మోడ్‌కు మారండి",
      SIGN_IN: "సైన్ ఇన్",
      SIGN_IN_NOT_CONFIGURED: "ఈ సైట్‌లో Google సైన్ ఇన్ ఇంకా కాన్ఫిగర్ చేయబడలేదు.",
      HOME : "హోమ్",
      ROUTE_PLANNER:"రూట్ ప్లానర్",
      COMMUNITY :"ట్రావెల్ కమ్యూనిటీ",
      NOTIFICATIONS : "నోటిఫికేషన్లు" ,
      SELECT_LANGUAGE : 'భాష',
      BUS_TICKETS: 'బస్ టికెట్లు',
      REVIEWS: 'సమీక్షలు',
      HELP: 'సహాయం',
      ACCOUNT: 'ఖాతా',
      MY_TRIPS: 'నా ప్రయాణాలు',
      WALLET: 'వాలెట్ / కార్డులు',
      MY_PROFILE: 'నా ప్రొఫైల్',
      SIGN_OUT: 'సైన్ అవుట్'
    } ,
    COMMON: {
      SAVE: "సేవ్ చేయండి",
      CANCEL:"రద్దు చేయండి",
      DELETE : "తొలగించండి",
      SEARCH : "శోధించండి",
      SUBMIT:'సమర్పించండి',
      RETRY :"మళ్ళీ ప్రయత్నించండి",
      CONFIRM : "నిర్ధారించండి",
      LOADING : "లోడ్ అవుతోంది...",
      STATUS : "స్థితి",
      LANGUAGE : "భాష",
      SUCCESS : "విజయవంతం" ,
      ERROR:"లోపం"
    },
    VALIDATION : {
      REQUIRED : "ఈ ఫీల్డ్ తప్పనిసరి.",
      INVALID_EMAIL:"దయచేసి సరైన ఈమెయిల్ నమోదు చేయండి." ,
      PHONE_REQUIRED :"ఫోన్ నంబర్ తప్పనిసరి." ,
      MIN_SEATS : "కనీసం ఒక సీటును ఎంచుకోండి.",
      TITLE_REQUIRED : "శీర్షిక అవసరం.",
      CONTENT_REQUIRED:"వివరణ ఖాళీగా ఉండకూడదు.",
    } ,

    PLANNER:{
      TITLE: "ఇంటరాక్టివ్ రూట్ ప్లానర్",
      SUBTITLE : "కస్టమ్ వేపాయింట్లను జోడించండి మరియు ట్రాఫిక్ లేని ప్రత్యామ్నాయ మార్గాలను ఎంచుకోండి.",
      ORIGIN_LABEL : "ప్రారంభ స్థానం",
      DEST_LABEL:"గమ్యస్థానం" ,
      WAYPOINTS : 'మధ్యంతర స్టాపులు',
      ADD_WAYPOINT :"+ జోడించు" ,
      RECOMPUTE_BTN : "రూట్లను తిరిగి లెక్కించండి",
      LIVE_TRAFFIC: "రియల్ టైమ్ ట్రాఫిక్ ఆటో-సింక్ యాక్టివ్‌గా ఉంది",
      ESTIMATED_NOTICE : "అంచనా సమయాలు మాత్రమే: సర్వర్‌లో లైవ్ ట్రాఫిక్ కనెక్ట్ కాలేదు, కాబట్టి రద్దీ వివరాలు సుమారుగా ఉంటాయి.",
      SUGGESTED_ROUTES : "సూచించబడిన రహదారి మార్గాలు",
      FASTEST_BADGE : "వేగవంతమైన మార్గం" ,
      TOLL_INFO:'టోల్ ఖర్చు',
      SAVE_ROUTE_BTN :"ఈ రూట్‌ను సేవ్ చేయండి",
      CHOKE_POINTS : "ట్రాఫిక్ జామ్ పాయింట్లు",
      TAB_ROUTES : "ప్రయాణ మార్గాలు",
      TAB_COMPARE :"రూట్ పోలిక",
      TAB_SAVED : "సేవ్ చేసిన రూట్లు",
      COMPARE_TITLE : "రూట్ విశ్లేషణ పట్టిక",
      COMPARE_SUBTITLE :"దూరం, సమయం, టోల్ ఛార్జీలు మరియు ట్రాఫిక్ రద్దీని పోల్చండి."
    },
    REVIEWS: {
      NO_ROUTES: "ఇంకా బస్ మార్గాలు అందుబాటులో లేవు.",
      ROUTES_UNAVAILABLE: "మార్గాల జాబితాను లోడ్ చేయలేకపోయాము. సర్వర్ నడుస్తోందో చూడండి.",
      ALL_ROUTES: "అన్ని మార్గాలు",
      LANG_ALL: "అన్ని భాషలు",
      SORT_HIGHEST: "అత్యధిక రేటింగ్",
      SORT_LOWEST: "అత్యల్ప రేటింగ్",
      TOAST_LOAD_REVIEWS_FAILED: "మార్గ సమీక్షలను లోడ్ చేయలేకపోయాము.",
      TOAST_LOAD_ROUTES_FAILED: "బస్ మార్గాలను లోడ్ చేయలేకపోయాము.",
      TOAST_VERIFIED_ONLY: "పూర్తైన ప్రయాణ టికెట్లు ఉన్న ధృవీకరించబడిన ప్రయాణికులు మాత్రమే సమీక్షలు పోస్ట్ చేయగలరు.",
      TOAST_NO_ELIGIBLE: "మీ ఖాతాలో సమీక్షించని పూర్తైన ప్రయాణాలు ఏవీ కనుగొనబడలేదు.",
      TOAST_EDIT_EXPIRED: "ఈ సమీక్ష యొక్క 24 గంటల సవరణ సమయం ముగిసింది.",
      TOAST_MIN_CHARS: "దయచేసి మీ అభిప్రాయంలో కనీసం 20 అక్షరాలు రాయండి.",
      TOAST_UPDATED: "సమీక్ష విజయవంతంగా నవీకరించబడింది.",
      TOAST_UPDATE_FAILED: "సమీక్షను నవీకరించడంలో లోపం.",
      TOAST_PUBLISHED: "సమీక్ష విజయవంతంగా ప్రచురించబడింది!",
      TOAST_SUBMIT_FAILED: "సమీక్షను సమర్పించలేకపోయాము.",
      TOAST_VOTE_FAILED: "సహాయకర ఓటు నమోదు కాలేదు.",
      TOAST_REPORT_FAILED: "సమీక్ష నివేదికను సమర్పించడంలో లోపం.",
      HERO_TAG: "ధృవీకరించబడిన ప్రయాణ సమీక్షలు మాత్రమే",
      TITLE: "మార్గ రేటింగ్‌లు & ప్రయాణికుల అభిప్రాయం",
      SUBTITLE: "తమ ప్రయాణం పూర్తి చేసిన ప్రయాణికులు మాత్రమే ఇచ్చిన పారదర్శక రేటింగ్‌లు. పోస్ట్ చేసిన 24 గంటల్లోపు సమీక్షను సవరించవచ్చు.",
      RATE_BTN: "మీ పూర్తైన ప్రయాణాన్ని రేట్ చేయండి",
      AVAILABLE: "({{count}} అందుబాటులో)",
      SELECT_ROUTE: "బస్ ఆపరేటర్ & మార్గాన్ని ఎంచుకోండి:",
      ALL_REVIEWS: "అన్ని సమీక్షలు",
      ONLY_STAR: "{{star}} ★ మాత్రమే",
      SORT: "క్రమీకరించు:",
      SORT_RECENT: "ఇటీవలివి",
      SORT_HELPFUL: "అత్యంత సహాయకరమైనవి",
      VERIFIED_RATINGS: "{{count}} ధృవీకరించబడిన రేటింగ్‌లు",
      INTEGRITY_TITLE: "సమీక్ష విశ్వసనీయత",
      INTEGRITY_1: "ప్రయాణం పూర్తైన తర్వాతే రేటింగ్ ఇవ్వవచ్చు.",
      INTEGRITY_2: "టికెట్ బుకింగ్‌కు 1 సమీక్ష.",
      INTEGRITY_3: "సమర్పించిన తర్వాత 24 గంటల సవరణ సమయం.",
      INTEGRITY_4: "నివేదించిన/దాచిన సమీక్షలు సగటు రేటింగ్‌లో చేర్చబడవు.",
      LOADING: "ధృవీకరించబడిన ప్రయాణ సమీక్షలు లోడ్ అవుతున్నాయి...",
      EMPTY_TITLE: "ఈ ఫిల్టర్ కింద సమీక్షలు కనుగొనబడలేదు.",
      EMPTY_SUB: "ఈ మార్గంలో ప్రయాణం పూర్తి చేశారా? మీ అనుభవాన్ని పంచుకునే మొదటి వ్యక్తి అవ్వండి!",
      WRITE_REVIEW: "సమీక్ష రాయండి",
      TRUSTED_REVIEWER: "నమ్మదగిన సమీక్షకుడు",
      TRUSTED_TITLE: "తరచుగా సహాయకరమైన సమీక్షకుడు",
      VERIFIED_PASSENGER: "ధృవీకరించబడిన ప్రయాణికుడు",
      JOURNEY: "ప్రయాణం:",
      TO: "నుండి",
      RATING_OUT_OF: "{{rating}} / 5",
      HELPFUL: "సహాయకరం ({{count}})",
      REPORT: "నివేదించు",
      REPORT_TITLE: "సమీక్షను నివేదించండి",
      EDIT_BTN: "సమీక్షను సవరించు (24 గంటల సమయం సక్రియం)",
      EDIT_LOCKED: "సవరణ సమయం ముగిసింది",
      MODAL_EDIT: "మార్గ సమీక్షను సవరించు",
      MODAL_NEW: "మార్గ రేటింగ్ & సమీక్షను సమర్పించు",
      SELECT_JOURNEY: "మీ పూర్తైన ప్రయాణాన్ని ఎంచుకోండి",
      PNR: "PNR:",
      RATING_LABEL: "మీ రేటింగ్ (1 నుండి 5 నక్షత్రాలు)",
      STARS_SELECTED: "నక్షత్రాలు ఎంచుకోబడ్డాయి",
      HEADLINE_LABEL: "సమీక్ష శీర్షిక (ఐచ్ఛికం)",
      HEADLINE_PLACEHOLDER: "ఉదా. సమయానికి బయలుదేరడం, సాఫీ హైవే ప్రయాణం",
      COMMENT_LABEL: "అభిప్రాయం & ప్రయాణ అనుభవం (కనీసం 20 అక్షరాలు)",
      COMMENT_PLACEHOLDER: "సీటు సౌకర్యం, సమయపాలన, డ్రైవర్ భద్రత, పరిశుభ్రత గురించి చెప్పండి...",
      CHAR_COUNT: "{{count}} / 20 అక్షరాలు అవసరం",
      SUBMIT_NEW: "ధృవీకరించబడిన సమీక్షను ప్రచురించు",
      SUBMIT_EDIT: "సమీక్షను నవీకరించు",
    },
      LANDING: {
        NO_FILTER_MATCH: "ఎంచుకున్న ఫిల్టర్లకు సరిపోయే బస్సులు లేవు. మరిన్ని బస్సులు చూడటానికి కొన్ని ఫిల్టర్లను తీసివేయండి.",
        FAQ_Q8: "నా బస్ టికెట్‌ను ఎలా రద్దు చేయాలి?",
        FAQ_A8: "\"నా ప్రయాణాలు\" తెరిచి, రాబోయే నిర్ధారిత ప్రయాణాన్ని ఎంచుకుని \"బుకింగ్ రద్దు చేయి\" నొక్కండి. సీట్లు వెంటనే విడుదలవుతాయి. ఈ వెర్షన్‌లో రీఫండ్ ఆటోమేటిక్‌గా జరగదు, కాబట్టి రీఫండ్ కోసం బస్ ఆపరేటర్‌ను సంప్రదించండి.",
        FAQ_Q9: "నా బుకింగ్‌కు ట్రావెల్ ఇన్సూరెన్స్ జోడించవచ్చా?",
        FAQ_A9: "అవును, ఇన్సూరెన్స్ ఐచ్ఛికం. ముందుకు వెళ్లే ముందు బుకింగ్ ఫారమ్‌లోని ఇన్సూరెన్స్ చెక్‌బాక్స్‌ను ఎంచుకుని, అక్కడ చూపిన నిబంధనలను చదవండి. రక్షణ వద్దనుకుంటే ఎంచుకోకండి.",
        NO_BUSES: "ఈ మార్గంలో {{date}} కి బస్సులు కనుగొనబడలేదు. వేరే తేదీ లేదా సమయాన్ని ప్రయత్నించండి లేదా వేరే మార్గాన్ని ఎంచుకోండి.",
        TIME_LABEL: "బయలుదేరే సమయం",
        TIME_ANY: "ఏ సమయమైనా",
        TIME_EARLY: "తెల్లవారుజామున 12 - 6",
        TIME_MORNING: "ఉదయం 6 - మధ్యాహ్నం 12",
        TIME_AFTERNOON: "మధ్యాహ్నం 12 - సాయంత్రం 6",
        TIME_EVENING: "సాయంత్రం 6 - రాత్రి 12",
        ALERT_SAME_CITY: "దయచేసి రెండు వేర్వేరు నగరాలను ఎంచుకోండి.",
        HERO_TITLE: "భారతదేశపు నంబర్ 1 ఆన్‌లైన్ బస్ టికెట్ బుకింగ్ సైట్",
        FROM: "ఎక్కడి నుండి",
        TO: "ఎక్కడికి",
        DATE: "తేదీ",
        SEARCH_BUSES: "బస్సులను వెతకండి",
        OFFERS_TITLE: "ట్రెండింగ్ ఆఫర్లు",
        VIEW_ALL: "అన్నీ చూడండి",
        OFFER_BADGE: "బస్",
        OFFER_1: "బస్ టికెట్లపై రూ. 250 వరకు ఆదా చేయండి",
        OFFER_2: "AP, TS మార్గాలపై రూ. 300 వరకు ఆదా చేయండి",
        OFFER_3: "RJ, MH, గోవా, MP పై రూ. 300 వరకు ఆదా చేయండి",
        OFFER_4: "కేరళ మార్గాలపై రూ. 200 వరకు ఆదా చేయండి",
        VALID_TILL: "30 నవంబర్ వరకు చెల్లుతుంది",
        FAQ_TITLE: "తరచుగా అడిగే ప్రశ్నలు",
        FAQ_TAB_GENERAL: "సాధారణ",
        FAQ_TAB_TICKET: "టికెట్ సంబంధిత",
        FAQ_TAB_MORE: "మరిన్ని",
        FAQ_TAB_PAYMENT: "చెల్లింపు",
        FAQ_TAB_CANCEL: "రద్దు & రీఫండ్",
        FAQ_TAB_INSURANCE: "బీమా",
        FAQ_Q1: "నేను బుక్ చేసిన బస్సు స్థానాన్ని ఆన్‌లైన్‌లో ట్రాక్ చేయవచ్చా?",
        FAQ_Q2: "tedbus లో బస్ టికెట్లను ఆన్‌లైన్‌లో ఎందుకు బుక్ చేయాలి?",
        FAQ_Q3: "బస్ టికెట్ బుక్ చేయడానికి tedbus సైట్‌లో ఖాతా తెరవాలా?",
        FAQ_Q4: "ఆన్‌లైన్‌లో బస్ బుకింగ్ చేస్తే నాకు ఎక్కువ ఖర్చవుతుందా?",
        FAQ_Q5: "బస్ బుకింగ్‌పై డిస్కౌంట్లు ఎలా పొందాలి?",
        FAQ_Q6: "tedbus లో బస్ బుకింగ్‌లో కొత్తగా ఏముంది?",
        FAQ_Q7: "tedbus లో ప్రభుత్వ బస్ టికెట్ బుక్ చేయవచ్చా?",
        FAQ_A1: "RedBus ఇంకా మీ బస్సు లైవ్ GPS స్థానాన్ని చూపదు. ఆపరేటర్, బస్ పేరు, మార్గం, బోర్డింగ్ పాయింట్ మరియు బయలుదేరే సమయంతో సహా మీ ప్రయాణ వివరాలు \"నా ప్రయాణాలు\"లో ఉన్నాయి. బస్సు ప్రస్తుత స్థానం కోసం నేరుగా బస్ ఆపరేటర్‌ను సంప్రదించండి.",
        FAQ_A2: "ఆన్‌లైన్ బుకింగ్‌తో మీ మార్గంలోని ప్రతి బస్సును చూడవచ్చు, మీ సీట్లను ఎంచుకోవచ్చు, ప్రయాణానికి ముందే చెల్లించవచ్చు మరియు అన్ని టికెట్లను \"నా ప్రయాణాలు\"లో ఉంచుకోవచ్చు. బుకింగ్, షెడ్యూల్ మార్పు మరియు ప్రయాణ రిమైండర్లను ఇమెయిల్, పుష్ లేదా యాప్ నోటిఫికేషన్‌ల ద్వారా పొందుతారు. రాబోయే నిర్ధారిత ప్రయాణాన్ని \"నా ప్రయాణాలు\" నుండి రద్దు చేయవచ్చు.",
        FAQ_A3: "అవును. RedBus Google సైన్ ఇన్ ఉపయోగిస్తుంది, కాబట్టి మీకు Google ఖాతా అవసరం. RedBus కోసం ప్రత్యేక పాస్‌వర్డ్ లేదు. మీరు మొదటిసారి Google తో సైన్ అప్ లేదా సైన్ ఇన్ ఎంచుకున్నప్పుడు మీ RedBus ఖాతా స్వయంచాలకంగా సృష్టించబడుతుంది. ధృవీకరించబడిన ఖాతాలు కమ్యూనిటీ పోస్ట్‌లు మరియు మార్గ సమీక్షలను కూడా ప్రచురించగలవు.",
        FAQ_A4: "లేదు. ప్రతి బస్సుకు చూపించే ఛార్జీ ఒక్కో సీటుకు ధర. మీరు చెల్లించే ముందు చెల్లింపు పేజీ మీరు ఎంచుకున్న సీట్ల మొత్తాన్ని చూపుతుంది, దానిలో ప్రత్యేక బుకింగ్ రుసుము వరుస లేదు. నిర్ధారించే ముందు చెల్లింపు పేజీలో మొత్తాన్ని తనిఖీ చేయండి.",
        FAQ_A5: "హోమ్ పేజీలోని ఆఫర్లు, ఉదాహరణకు FIRST, SUPERHIT, BUS300 మరియు RBTRIP, వాటి చెల్లుబాటు తేదీలతో జాబితా చేయబడ్డాయి. ఈ వెర్షన్‌లో ఆఫర్ కోడ్‌లు చెక్అవుట్‌లో స్వయంచాలకంగా వర్తించవు, కాబట్టి చెల్లింపు పేజీ పూర్తి ఛార్జీని చూపుతుంది. బుక్ చేయడానికి ముందు హోమ్ పేజీలో ఆఫర్ వివరాలను తనిఖీ చేయండి.",
        FAQ_A6: "ఈ వెర్షన్‌లో కొత్తవి: కథలు, చిట్కాలు మరియు ఫోటోలతో ట్రావెల్ కమ్యూనిటీ; ట్రాఫిక్ సమాచారం, ప్రత్యామ్నాయ మార్గాలు, మార్గాల పోలిక మరియు సేవ్ చేసిన మార్గాలతో రూట్ ప్లానర్; ఇమెయిల్, పుష్, యాప్ మరియు ఐచ్ఛిక SMS అలర్ట్‌లతో నోటిఫికేషన్ కేంద్రం; మార్గం, భాష మరియు రేటింగ్ ద్వారా ఫిల్టర్ చేసి, కొత్తవి, అత్యధికం, అత్యల్పం లేదా అత్యంత సహాయకరమైనవిగా క్రమబద్ధీకరించగల ధృవీకరించబడిన మార్గ సమీక్షలు; డార్క్ మోడ్; మరియు ఇంగ్లీష్, హిందీ, తెలుగు, తమిళ్ భాషలు.",
        FAQ_A7: "RedBus మా కేటలాగ్‌లోని ప్రైవేట్ ఆపరేటర్ల బస్సులను చూపుతుంది. ప్రభుత్వ (రాష్ట్ర రవాణా) బస్సులు ఈ వెబ్‌సైట్‌లో ఇంకా విడిగా జాబితా చేయబడలేదు, కాబట్టి ఇక్కడ బుక్ చేయలేరు. ప్రభుత్వ బస్ టికెట్ల కోసం రాష్ట్ర రవాణా సంస్థ అధికారిక వెబ్‌సైట్ లేదా కౌంటర్‌ను ఉపయోగించండి.",
        ALERT_FILL: "దయచేసి వివరాలన్నీ నింపండి!",
        DIALOG_TITLE: "అందుబాటులో ఉన్న బస్ మార్గాలు",
        DIALOG_NO: "సంఖ్య",
        DIALOG_FROM: "నుండి",
        DIALOG_TO: "వరకు",
        DIALOG_BUSES: "బస్సుల సంఖ్య",
      },
      ACCOUNT: {
        SESSION_EXPIRED: "మీ సెషన్ ముగిసింది. దయచేసి Google తో మళ్లీ సైన్ ఇన్ చేయండి.",
        TITLE: "ఖాతా వివరాలు",
        SUBTITLE: "బుకింగ్‌లు మరియు అలర్ట్‌ల కోసం ఉపయోగించే మీ వ్యక్తిగత సమాచారం.",
        SIGN_IN_PROMPT: "మీ ఖాతాను చూడటానికి సైన్ ఇన్ చేయండి.",
        LOADING: "ఖాతా వివరాలు లోడ్ అవుతున్నాయి...",
        LOAD_FAILED: "మీ ఖాతా వివరాలను లోడ్ చేయలేకపోయాము.",
        FIELD_NAME: "పేరు",
        FIELD_EMAIL: "ఇమెయిల్",
        EMAIL_NOTE: "మీ ఇమెయిల్ మీ Google ఖాతా నుండి వస్తుంది, ఇక్కడ మార్చలేరు.",
        FIELD_PHONE: "ఫోన్",
        PHONE_NOT_ADDED: "ఇంకా జోడించలేదు",
        FIELD_GENDER: "లింగం",
        FIELD_AGE: "వయసు",
        FIELD_VERIFICATION: "ధృవీకరణ",
        VERIFIED: "ధృవీకరించబడిన ప్రయాణికుడు",
        NOT_VERIFIED: "ధృవీకరించబడలేదు",
        FIELD_ROLE: "ఖాతా రకం",
        FIELD_LANGUAGE: "ఇష్టమైన భాష",
        FIELD_THEME: "థీమ్",
        THEME_LIGHT: "లైట్",
        THEME_DARK: "డార్క్",
        EDIT_TITLE: "వివరాలను సవరించు",
        SAVE: "మార్పులను సేవ్ చేయి",
        SAVING: "సేవ్ అవుతోంది...",
        SAVED: "ఖాతా వివరాలు నవీకరించబడ్డాయి.",
        SAVE_FAILED: "మీ వివరాలను నవీకరించలేకపోయాము.",
        GENDER_MALE: "పురుషుడు",
        GENDER_FEMALE: "స్త్రీ",
        GENDER_OTHER: "ఇతర",
        SIGN_OUT: "సైన్ అవుట్",
      },
      DASHBOARD: {
        TITLE: "నా డాష్‌బోర్డ్",
        SUBTITLE: "మీ ప్రయాణాలు, సమీక్షలు మరియు నోటిఫికేషన్‌లు ఒకే చోట.",
        SIGN_IN_PROMPT: "మీ డాష్‌బోర్డ్ చూడటానికి సైన్ ఇన్ చేయండి.",
        LOADING: "మీ డాష్‌బోర్డ్ లోడ్ అవుతోంది...",
        LOAD_FAILED: "మీ ప్రయాణాలను లోడ్ చేయలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.",
        STAT_UPCOMING: "రాబోయే ప్రయాణాలు",
        STAT_TOTAL: "మొత్తం బుకింగ్‌లు",
        STAT_UNREAD: "చదవని నోటిఫికేషన్‌లు",
        STAT_REVIEWS: "సమీక్షించాల్సిన ప్రయాణాలు",
        TRIPS_HEADING: "నా ప్రయాణాలు",
        NO_TRIPS: "మీకు ఇంకా బుకింగ్‌లు లేవు.",
        BOOK_NOW: "టికెట్ బుక్ చేయండి",
        STATUS_CONFIRMED: "నిర్ధారించబడింది",
        STATUS_CANCELLED: "రద్దు చేయబడింది",
        STATUS_COMPLETED: "పూర్తైంది",
        STATUS_PENDING: "పెండింగ్",
        PNR: "PNR",
        SEATS: "సీట్లు",
        FARE: "ఛార్జీ",
        JOURNEY: "ప్రయాణం",
        QUICK_LINKS: "త్వరిత లింక్‌లు",
        GO_HOME: "టికెట్లు బుక్ చేయండి",
        GO_NOTIFICATIONS: "నోటిఫికేషన్‌లు",
        GO_REVIEWS: "మార్గ సమీక్షలు",
        GO_COMMUNITY: "కమ్యూనిటీ",
        GO_PLANNER: "మార్గ ప్రణాళిక",
      },
      PROFILE: {
        SIGN_IN_PROMPT: "మీ ప్రొఫైల్ చూడటానికి సైన్ ఇన్ చేయండి.",
        TAB_DASHBOARD: "డాష్‌బోర్డ్",
        TAB_TRIPS: "నా ప్రయాణాలు",
        TAB_PROFILE: "నా ప్రొఫైల్",
        TAB_PREFERENCES: "ప్రాధాన్యతలు",
        PREF_THEME: "థీమ్",
        PREF_THEME_DESC: "మొత్తం యాప్‌కు లైట్ లేదా డార్క్ మోడ్ ఎంచుకోండి.",
        PREF_LIGHT: "లైట్",
        PREF_DARK: "డార్క్",
        PREF_LANGUAGE: "భాష",
        PREF_LANGUAGE_DESC: "యాప్ మరియు మీ బుకింగ్ అలర్ట్‌ల భాష.",
        PREF_ALERTS: "అలర్ట్‌లు & కార్యకలాపం",
        PREF_ALERTS_DESC: "నోటిఫికేషన్ సెట్టింగ్‌లు, మీ మార్గ సమీక్షలు మరియు కమ్యూనిటీ పోస్ట్‌లు.",
        GO_NOTIFICATIONS: "నోటిఫికేషన్ సెట్టింగ్‌లు",
        GO_REVIEWS: "మీ మార్గ సమీక్షలు",
        GO_COMMUNITY: "కమ్యూనిటీ పోస్ట్‌లు",
        SIGN_OUT: "సైన్ అవుట్",
      },
      OFFER: {
        TITLE: "ఆఫర్ కోడ్",
        PLACEHOLDER: "ఆఫర్ కోడ్ నమోదు చేయండి",
        APPLY: "వర్తింపజేయి",
        REMOVE: "తీసివేయి",
        DISCOUNT: "ఆఫర్ తగ్గింపు",
        APPLIED: "ఆఫర్ వర్తించింది.",
        UNKNOWN: "ఈ ఆఫర్ కోడ్ చెల్లదు.",
        EXPIRED: "ఈ ఆఫర్ గడువు ముగిసింది.",
        NOT_ELIGIBLE: "ఈ ఆఫర్ ఈ మార్గానికి వర్తించదు.",
        UNAVAILABLE: "ఆఫర్‌ను తనిఖీ చేయలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.",
      },
      TRIPS: {
        SESSION_EXPIRED: "మీ సెషన్ ముగిసింది. దయచేసి Google తో మళ్లీ సైన్ ఇన్ చేయండి.",
        SORT_LABEL: "క్రమీకరించు:",
        SORT_NEWEST: "కొత్త ప్రయాణం",
        SORT_OLDEST_TRIP: "పాత ప్రయాణం",
        SORT_FARE_HIGH: "ఛార్జీ: ఎక్కువ నుండి తక్కువ",
        SORT_FARE_LOW: "ఛార్జీ: తక్కువ నుండి ఎక్కువ",
        TITLE: "నా ప్రయాణాలు",
        SUBTITLE: "రాబోయే, పూర్తైన మరియు రద్దైన బుకింగ్‌లు.",
        FILTER_ALL: "అన్నీ",
        FILTER_UPCOMING: "రాబోయే",
        FILTER_COMPLETED: "పూర్తైన",
        FILTER_CANCELLED: "రద్దైన",
        EMPTY: "ఈ జాబితాలో ప్రయాణాలు లేవు.",
        LOADING: "మీ ప్రయాణాలు లోడ్ అవుతున్నాయి...",
        CANCEL_BTN: "బుకింగ్ రద్దు చేయి",
        CANCEL_CONFIRM: "బుకింగ్ {{pnr}} రద్దు చేయాలా? మీ సీట్లు విడుదల అవుతాయి.",
        CANCELLED_OK: "బుకింగ్ రద్దైంది. మీ సీట్లు విడుదలయ్యాయి.",
        CANCEL_FAILED: "ఈ బుకింగ్‌ను రద్దు చేయలేకపోయాము.",
        REVIEW_TRIP: "ఈ ప్రయాణాన్ని సమీక్షించండి",
      },
    COMMUNITY : {
      LANG_LABEL: "భాష:",
      LANG_ALL: "అన్ని భాషలు",
      SORT_LIKED: "అత్యధిక లైక్‌లు",
      SORT_DISCUSSED: "అత్యధిక చర్చ",
      SORT_VIEWED: "అత్యధిక వీక్షణలు",
      SORT_OLDEST: "పాతవి",
      TOAST_LOAD_FAILED: "కమ్యూనిటీ కథనాలను లోడ్ చేయలేకపోయాము.",
      TOAST_LOGIN_TO_LIKE: "ఇష్టపడటానికి ప్రయాణికుల ప్రొఫైల్‌తో లాగిన్ అవ్వండి.",
      TOAST_LIKE_FAILED: "లైక్ నమోదు కాలేదు.",
      TOAST_COMMENT_FAILED: "వ్యాఖ్యను జోడించడంలో లోపం.",
      TOAST_VERIFIED_ONLY_POST: "ధృవీకరించబడిన ప్రయాణికులు మాత్రమే కథనాలను ప్రచురించగలరు.",
      TOAST_TITLE_REQUIRED: "శీర్షిక మరియు విషయం అవసరం.",
      TOAST_PUBLISHED: "మీ ప్రయాణ కథనం ప్రచురించబడింది!",
      TOAST_POST_FAILED: "పోస్ట్‌ను సమర్పించలేకపోయాము.",
      TOAST_MOD_DONE: "మోడరేషన్ చర్య పూర్తైంది.",
      TOAST_MOD_FAILED: "మోడరేషన్ చర్య విఫలమైంది.",
      TOAST_REPORT_FAILED: "నివేదికను సమర్పించడంలో లోపం.",
      TOAST_LINK_COPIED: "పోస్ట్ లింక్ క్లిప్‌బోర్డ్‌కు కాపీ అయ్యింది!",
      SEARCH_PLACEHOLDER: "గమ్యం లేదా మార్గాన్ని వెతకండి",
      SEARCH_BTN: "వెతకండి",
      SORT_LABEL: "క్రమీకరించు:",
      MOD_BACK: "కమ్యూనిటీ ఫీడ్‌కు తిరిగి వెళ్ళండి",
      MOD_QUEUE: "నివేదించిన కంటెంట్ మోడరేషన్ జాబితా",
      LOADING_STORIES: "ప్రయాణ కథనాలు లోడ్ అవుతున్నాయి...",
      EMPTY_TITLE: "\"{{topic}}\" కింద కథనాలు కనుగొనబడలేదు",
      EMPTY_SUB: "ఈ అంశంపై చిట్కాలు పంచుకున్న మొదటి ధృవీకరించబడిన ప్రయాణికులు అవ్వండి!",
      WRITE_FIRST: "మొదటి పోస్ట్ రాయండి",
      MOD_APPROVE: "ఆమోదించు",
      MOD_FLAG: "ఫ్లాగ్ చేయి",
      MOD_REMOVE: "తొలగించు",
      MOD_FEATURE: "★ ఫీచర్",
      REPORT_TITLE: "పోస్ట్‌ను నివేదించండి",
      VERIFIED_TITLE: "ధృవీకరించబడిన ప్రయాణికుడు",
      GUIDE: "గైడ్",
      LIKES: "{{count}} లైక్‌లు",
      COMMENTS: "{{count}} వ్యాఖ్యలు",
      VIEWS: "{{count}} వీక్షణలు",
      SHARE_WHATSAPP: "WhatsApp",
      SHARE_X: "X",
      SHARE_COPY: "కాపీ",
      SHARE_WHATSAPP_TITLE: "WhatsApp లో షేర్ చేయండి",
      SHARE_X_TITLE: "X లో షేర్ చేయండి",
      COPY_LINK_TITLE: "లింక్ కాపీ చేయండి",
      DISCUSSION: "చర్చ ({{count}})",
      COMMENT_PLACEHOLDER: "మీ అనుభవం లేదా సలహాను పంచుకోండి...",
      CREATE_TITLE: "ప్రయాణ కథనం లేదా చిట్కాను ప్రచురించండి",
      CATEGORY_LABEL: "వర్గం / ఫోరమ్ అంశం",
      STORY_TITLE_LABEL: "కథనం / సలహా శీర్షిక",
      STORY_TITLE_PLACEHOLDER: "ఉదా. బెంగళూరు నుండి గోవా స్లీపర్ బస్: టాప్ 5 విరామ స్థలాలు",
      FROM_CITY: "బయలుదేరే నగరం",
      TO_CITY: "గమ్య నగరం",
      PHOTO_LABEL: "ఫోటో చిత్రం URL (ఐచ్ఛికం)",
      STORY_LABEL: "మీ ప్రయాణ కథనం / చిట్కాలు",
      STORY_PLACEHOLDER: "మీ అనుభవం, స్లీపర్ నాణ్యత, పరిశుభ్రత లేదా హైవే సిఫార్సులు రాయండి...",
      PUBLISH_NOW: "ఇప్పుడే ప్రచురించు",
      PROFILE_TITLE: "ప్రయాణికుల కమ్యూనిటీ ప్రొఫైల్",
      STORIES_SHARED: "పంచుకున్న కథనాలు",
      COMMUNITY_LIKES: "కమ్యూనిటీ లైక్‌లు",
      TOPIC_ALL: "అన్నీ",
      TOPIC_JOURNEY_STORIES: "ప్రయాణ కథనాలు",
      TOPIC_TRAVEL_TIPS: "ప్రయాణ చిట్కాలు",
      TOPIC_ROUTE_ADVICE: "మార్గ సలహా",
      TOPIC_DESTINATION_GUIDE: "గమ్య గైడ్",
      TOPIC_GENERAL_DISCUSSION: "సాధారణ చర్చ",
      HERO_TAG : "కమ్యూనిటీ హబ్",
      TITLE: "ప్రయాణ కథనాలు & మార్గ సలహాలు",
      SUBTITLE: "ధృవీకరించబడిన బస్సు ప్రయాణికులతో కనెక్ట్ అవ్వండి, సమీక్షలు చదవండి.",
      SHARE_BTN : 'ప్రయాణ కథనాన్ని పంచుకోండి',
      ALL_TOPICS : "అన్నీ",
      SORT_RECENT : "ఇటీవలి",
      SORT_TRENDING:"ట్రెండింగ్" ,
      FEATURED: "ప్రత్యేక కథనం",
      REPLY_BTN : "సమాధానం",
      REPORT_BTN : "రిపోర్ట్" ,
      SHARE:"షేర్ చేయండి"
    },
    NOTIFICATIONS : {
      CHANNELS_DESC: "మీరు ఏ కమ్యూనికేషన్ ఛానెల్‌ల ద్వారా నోటిఫికేషన్‌లు పొందాలనుకుంటున్నారో ఎంచుకోండి.",
      FILTER_ALL: "అన్నీ",
      FILTER_BOOKINGS: "బుకింగ్‌లు",
      FILTER_REMINDERS: "రిమైండర్లు",
      FILTER_SCHEDULE: "షెడ్యూల్",
      FILTER_OFFERS: "ఆఫర్లు",
      SYNC_LOGS: "నోటిఫికేషన్ లాగ్‌లు సింక్ అవుతున్నాయి...",
      EMPTY_TITLE: "నోటిఫికేషన్‌లు కనుగొనబడలేదు.",
      EMPTY_DESC: "మీరు అన్నీ చూశారు! ఆటోమేటిక్ ప్రయాణ రిమైండర్లు మరియు బుకింగ్ నిర్ధారణలు ఇక్కడ కనిపిస్తాయి.",
      LANGUAGE_TAG: "భాష: {{code}}",
      STATUS_LABEL: "స్థితి:",
      RETRY_BTN: "విఫలమైన డెలివరీలను మళ్లీ ప్రయత్నించు",
      DEFAULT_SUFFIX: "(డిఫాల్ట్)",
      CHANNEL_EMAIL_TITLE: "ఇమెయిల్ నోటిఫికేషన్‌లు",
      CHANNEL_EMAIL_DESC: "ఇమెయిల్ ద్వారా టికెట్లు, ఇన్‌వాయిస్‌లు మరియు పూర్తి అలర్ట్‌లు పొందండి.",
      CHANNEL_PUSH_TITLE: "పుష్ నోటిఫికేషన్‌లు",
      CHANNEL_PUSH_DESC: "వెబ్ మరియు మొబైల్ పరికరాలలో తక్షణ లాక్‌స్క్రీన్ నోటిఫికేషన్‌లు.",
      CHANNEL_SMS_TITLE: "SMS గేట్‌వే",
      CHANNEL_SMS_DESC: "ముఖ్యమైన బోర్డింగ్ రిమైండర్లు నేరుగా టెక్స్ట్ సందేశాలుగా పంపబడతాయి.",
      EVENTS_HEADING: "ఈవెంట్ సబ్‌స్క్రిప్షన్‌లు & మార్కెటింగ్ ఆప్ట్-ఇన్",
      EVENTS_DESC: "హైవే డీల్‌లు మరియు సీజనల్ ప్రమోషన్‌ల వంటి ఐచ్ఛిక సందేశాలను నియంత్రించండి.",
      PROMO_TITLE: "ప్రమోషనల్ ఆఫర్లు & డిస్కౌంట్లు",
      PROMO_DESC: "వారపు హైవే కూపన్‌లు మరియు మార్గ డిస్కౌంట్‌లను పొందడానికి ఆప్ట్-ఇన్ చేయండి.",
      SCHEDULE_TITLE: "షెడ్యూల్ మార్పులు & ఆలస్యాలు",
      SCHEDULE_DESC: "మీ బస్ ఆపరేటర్ బోర్డింగ్ లేదా చేరుకునే సమయాలను మార్చితే తక్షణ అప్‌డేట్‌లు.",
      SIM_TITLE: "మల్టీ-ఛానల్ ఈవెంట్ డిస్పాచ్ సిమ్యులేటర్",
      SIM_DESC: "రియల్-టైమ్ సందేశ స్థానికీకరణ, మల్టీ-ఛానల్ రూటింగ్ మరియు రీట్రై లాజిక్‌ను పరీక్షించండి.",
      EVENT_TYPE: "ఈవెంట్ రకం",
      EV_REMINDER: "రాబోయే ప్రయాణ రిమైండర్",
      EV_SCHEDULE: "షెడ్యూల్ మార్పు / ఆలస్య అలర్ట్",
      EV_PROMO: "ప్రత్యేక హైవే ప్రమోషనల్ ఆఫర్",
      EV_BOOKING: "బుకింగ్ నిర్ధారణ పరీక్ష",
      DEPARTURE_CITY: "బయలుదేరే నగరం",
      DESTINATION_CITY: "గమ్య నగరం",
      NEW_TIME: "కొత్త సవరించిన బయలుదేరే సమయం",
      PROMO_CODE: "ప్రోమో కోడ్",
      DISCOUNT_PCT: "డిస్కౌంట్ (%)",
      DISPATCH_BTN: "ఇప్పుడే నోటిఫికేషన్ పంపండి",
      TOAST_SIGN_IN_FIRST: "నోటిఫికేషన్‌లు తెరవడానికి ముందు సైన్ ఇన్ చేయండి.",
      TOAST_SESSION_INVALID: "మీ సెషన్ చెల్లదు. దయచేసి మళ్లీ సైన్ ఇన్ చేయండి.",
      TOAST_LOAD_FAILED: "నోటిఫికేషన్ చరిత్రను లోడ్ చేయడంలో లోపం.",
      TOAST_PREFS_SAVED: "ప్రాధాన్యతలు విజయవంతంగా సేవ్ అయ్యాయి.",
      TOAST_PREFS_FAILED: "ప్రాధాన్యతలను సేవ్ చేయలేకపోయాము.",
      TOAST_ALL_READ: "అన్ని నోటిఫికేషన్‌లు చదివినవిగా గుర్తించబడ్డాయి.",
      TOAST_RETRY_DONE: "డెలివరీ మళ్లీ ప్రయత్నం పూర్తైంది.",
      TOAST_RETRY_FAILED: "మళ్లీ ప్రయత్నం విఫలమైంది.",
      TOAST_SENT: "నోటిఫికేషన్ పంపబడింది మరియు రియల్-టైమ్‌లో లాగ్ చేయబడింది!",
      TOAST_SIM_FAILED: "అనుకరణ విఫలమైంది.",
      TAG : "మెసేజింగ్ హబ్",
      TITLE: "నోటిఫికేషన్ సెంటర్",
      SUBTITLE:"రియల్-టైమ్ హెచ్చరికలు మరియు డెలివరీ ట్రాకింగ్.",
      TAB_INBOX :"ఇన్‌బాక్స్",
      TAB_PREFERENCES : "ప్రాధాన్యతలు",
      TAB_SIMULATOR : "ఈవెంట్ సిమ్యులేటర్",
      UNREAD_ONLY:"చదవనివి మాత్రమే",
      MARK_ALL_READ : "అన్నీ చదివినట్లు గుర్తించు",
      LANG_HEADING: "భాష & స్థానికీకరణ",
      LANG_DESC: "బుకింగ్ హెచ్చరికల కోసం మీకు నచ్చిన భాషను ఎంచుకోండి.",
      CHANNELS_HEADING : "డెలివరీ ఛానెల్స్",
      SAVE_PREF_BTN : "సెట్టింగ్‌లను సేవ్ చేయండి"
    }
  },
  ta: {
    NAV: {
      NEW_TO_REDBUS: "RedBus-க்கு புதியவரா?",
      WELCOME_NEW: "RedBus-க்கு வரவேற்கிறோம்! உங்கள் கணக்கு உருவாக்கப்பட்டது.",
      ERR_SERVER_UNREACHABLE: "RedBus சேவையகத்தை அடைய முடியவில்லை. பின்தளம் இயங்குகிறதா எனச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
      ERR_SIGN_IN_FAILED: "Google உள்நுழைவு முடிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
      DASHBOARD: "டாஷ்போர்டு",
      ACCOUNT_DETAILS: "கணக்கு விவரங்கள்",
      THEME_TO_LIGHT: "ஒளி பயன்முறைக்கு மாறு",
      THEME_TO_DARK: "இருள் பயன்முறைக்கு மாறு",
      SIGN_IN: "உள்நுழை",
      SIGN_IN_NOT_CONFIGURED: "இந்தத் தளத்தில் Google உள்நுழைவு இன்னும் அமைக்கப்படவில்லை.",
      HOME : "முகப்பு",
      ROUTE_PLANNER : "பயண வழி திட்டமிடுபவர்",
      COMMUNITY: "பயண சமூகம்",
      NOTIFICATIONS : "அறிவிப்புகள்",
      SELECT_LANGUAGE : "மொழி",
      BUS_TICKETS: "பஸ் டிக்கெட்டுகள்",
      REVIEWS: "விமர்சனங்கள்",
      HELP: "உதவி",
      ACCOUNT: "கணக்கு",
      MY_TRIPS: "என் பயணங்கள்",
      WALLET: "வாலெட் / கார்டுகள்",
      MY_PROFILE: "என் சுயவிவரம்",
      SIGN_OUT: "வெளியேறு",
    },
    COMMON:{
      SAVE : "சேமி",
      CANCEL: "ரத்து செய்",
      DELETE : "நீக்கு",
      SEARCH : "தேடு",
      SUBMIT :"சமர்ப்பி",
      RETRY:"மீண்டும் முயற்சி செய்",
      CONFIRM:"உறுதி செய்",
      LOADING : "ஏற்றுகிறது...",
      STATUS : "நிலை",
      LANGUAGE : "மொழி",
      SUCCESS : "வெற்றி",
      ERROR: 'பிழை'
    },
    VALIDATION: {
      REQUIRED:"இந்த புலம் கட்டாயமாகும்.",
      INVALID_EMAIL: "சரியான மின்னஞ்சலை உள்ளிடவும்.",
      PHONE_REQUIRED: "தொலைபேசி எண் கட்டாயமாகும்.",
      MIN_SEATS :"குறைந்தது ஒரு இருக்கையையாவது தேர்ந்தெடுக்கவும்.",
      TITLE_REQUIRED : "தலைப்பு தேவை.",
      CONTENT_REQUIRED : "விளக்கம் காலியாக இருக்கக்கூடாது."
    },
    PLANNER: {
      TITLE : "ஊடாடும் பயண வழி திட்டமிடுபவர்",
      SUBTITLE : "மாற்று விரைவுச்சாலைகளை ஒப்பிட்டு போக்குவரத்து நெரிசலை தவிர்க்கவும்.",
      ORIGIN_LABEL:"தொடக்க இடம்",
      DEST_LABEL :"சேருமிடம்",
      WAYPOINTS : "இடைநிலை நிறுத்தங்கள்",
      ADD_WAYPOINT : "+ சேர்",
      RECOMPUTE_BTN : 'வழிகளை மீண்டும் கணக்கிடு',
      LIVE_TRAFFIC : "நேரடி போக்குவரத்து இணைப்பு செயலில் உள்ளது",
      ESTIMATED_NOTICE : "மதிப்பிடப்பட்ட நேரங்கள் மட்டுமே: சேவையகத்தில் நேரடி போக்குவரத்து இணைக்கப்படவில்லை, எனவே நெரிசல் தகவல்கள் தோராயமானவை.",
      SUGGESTED_ROUTES: "பரிந்துரைக்கப்பட்ட நெடுஞ்சாலை வழிகள்",
      FASTEST_BADGE : "வேகமான வழி",
      TOLL_INFO : "சுங்கக் கட்டணம்",
      SAVE_ROUTE_BTN: "இந்த வழியை சேமிக்கவும்",
      CHOKE_POINTS:"நெரிசல் பகுதிகள்",
      TAB_ROUTES:"பயண வழிகள்",
      TAB_COMPARE : "வழி ஒப்பீடு",
      TAB_SAVED : "சேமிக்கப்பட்ட வழிகள்",
      COMPARE_TITLE : "பயண வழி ஒப்பீட்டு அட்டவணை",
      COMPARE_SUBTITLE :  "தூரம், தாமதம் மற்றும் கட்டணங்களை ஒப்பிடுக.",
    },
    REVIEWS: {
      NO_ROUTES: "இன்னும் பேருந்து வழிகள் இல்லை.",
      ROUTES_UNAVAILABLE: "வழிகளின் பட்டியலை ஏற்ற முடியவில்லை. சேவையகம் இயங்குகிறதா எனச் சரிபார்க்கவும்.",
      ALL_ROUTES: "அனைத்து வழிகளும்",
      LANG_ALL: "அனைத்து மொழிகளும்",
      SORT_HIGHEST: "அதிக மதிப்பீடு",
      SORT_LOWEST: "குறைந்த மதிப்பீடு",
      TOAST_LOAD_REVIEWS_FAILED: "மார்க்க மதிப்புரைகளை ஏற்ற முடியவில்லை.",
      TOAST_LOAD_ROUTES_FAILED: "பேருந்து வழிகளை ஏற்ற முடியவில்லை.",
      TOAST_VERIFIED_ONLY: "முடிந்த பயணச் சீட்டு கொண்ட சரிபார்க்கப்பட்ட பயணிகள் மட்டுமே மதிப்புரைகளை வெளியிட முடியும்.",
      TOAST_NO_ELIGIBLE: "உங்கள் கணக்கில் மதிப்பாய்வு செய்யப்படாத முடிந்த பயணங்கள் எதுவும் இல்லை.",
      TOAST_EDIT_EXPIRED: "இந்த மதிப்புரையின் 24 மணி நேர திருத்த காலம் முடிந்தது.",
      TOAST_MIN_CHARS: "உங்கள் கருத்தில் குறைந்தது 20 எழுத்துகளை எழுதுங்கள்.",
      TOAST_UPDATED: "மதிப்புரை வெற்றிகரமாகப் புதுப்பிக்கப்பட்டது.",
      TOAST_UPDATE_FAILED: "மதிப்புரையைப் புதுப்பிப்பதில் பிழை.",
      TOAST_PUBLISHED: "மதிப்புரை வெற்றிகரமாக வெளியிடப்பட்டது!",
      TOAST_SUBMIT_FAILED: "மதிப்புரையைச் சமர்ப்பிக்க முடியவில்லை.",
      TOAST_VOTE_FAILED: "உதவிகரமான வாக்கைப் பதிவு செய்ய முடியவில்லை.",
      TOAST_REPORT_FAILED: "மதிப்புரை புகாரைச் சமர்ப்பிப்பதில் பிழை.",
      HERO_TAG: "சரிபார்க்கப்பட்ட பயண மதிப்புரைகள் மட்டும்",
      TITLE: "வழி மதிப்பீடுகள் & பயணி கருத்துகள்",
      SUBTITLE: "தங்கள் பயணத்தை முடித்த பயணிகள் மட்டுமே சமர்ப்பித்த வெளிப்படையான மதிப்பீடுகள். வெளியிட்ட 24 மணி நேரத்திற்குள் மதிப்புரையைத் திருத்தலாம்.",
      RATE_BTN: "முடித்த பயணத்தை மதிப்பிடுங்கள்",
      AVAILABLE: "({{count}} கிடைக்கின்றன)",
      SELECT_ROUTE: "பேருந்து இயக்குநர் & வழியைத் தேர்ந்தெடுக்கவும்:",
      ALL_REVIEWS: "அனைத்து மதிப்புரைகளும்",
      ONLY_STAR: "{{star}} ★ மட்டும்",
      SORT: "வரிசைப்படுத்து:",
      SORT_RECENT: "சமீபத்தியவை",
      SORT_HELPFUL: "மிகவும் உதவிகரமானவை",
      VERIFIED_RATINGS: "{{count}} சரிபார்க்கப்பட்ட மதிப்பீடுகள்",
      INTEGRITY_TITLE: "மதிப்புரை நம்பகத்தன்மை",
      INTEGRITY_1: "பயணம் முடிந்த பின்னரே மதிப்பீடு அனுமதிக்கப்படும்.",
      INTEGRITY_2: "ஒரு டிக்கெட் முன்பதிவுக்கு 1 மதிப்புரை.",
      INTEGRITY_3: "சமர்ப்பித்த பின் 24 மணி நேர திருத்த காலம்.",
      INTEGRITY_4: "புகாரளிக்கப்பட்ட/மறைக்கப்பட்ட மதிப்புரைகள் சராசரியில் சேர்க்கப்படாது.",
      LOADING: "சரிபார்க்கப்பட்ட பயண மதிப்புரைகள் ஏற்றப்படுகின்றன...",
      EMPTY_TITLE: "இந்த வடிகட்டியின் கீழ் மதிப்புரைகள் எதுவும் இல்லை.",
      EMPTY_SUB: "இந்த வழியில் பயணத்தை முடித்தீர்களா? உங்கள் அனுபவத்தைப் பகிரும் முதல் நபராகுங்கள்!",
      WRITE_REVIEW: "மதிப்புரை எழுது",
      TRUSTED_REVIEWER: "நம்பகமான மதிப்புரையாளர்",
      TRUSTED_TITLE: "அடிக்கடி உதவிகரமான மதிப்புரையாளர்",
      VERIFIED_PASSENGER: "சரிபார்க்கப்பட்ட பயணி",
      JOURNEY: "பயணம்:",
      TO: "முதல்",
      RATING_OUT_OF: "{{rating}} / 5",
      HELPFUL: "உதவிகரமானது ({{count}})",
      REPORT: "புகாரளி",
      REPORT_TITLE: "மதிப்புரையைப் புகாரளி",
      EDIT_BTN: "மதிப்புரையைத் திருத்து (24 மணி நேரம் செயலில்)",
      EDIT_LOCKED: "திருத்த காலம் முடிந்தது",
      MODAL_EDIT: "வழி மதிப்புரையைத் திருத்து",
      MODAL_NEW: "வழி மதிப்பீடு & மதிப்புரையைச் சமர்ப்பி",
      SELECT_JOURNEY: "முடித்த உங்கள் பயணத்தைத் தேர்ந்தெடுக்கவும்",
      PNR: "PNR:",
      RATING_LABEL: "உங்கள் மதிப்பீடு (1 முதல் 5 நட்சத்திரங்கள்)",
      STARS_SELECTED: "நட்சத்திரங்கள் தேர்ந்தெடுக்கப்பட்டன",
      HEADLINE_LABEL: "மதிப்புரை தலைப்பு (விருப்பத்தேர்வு)",
      HEADLINE_PLACEHOLDER: "எ.கா. நேரத்திற்கு புறப்பாடு, சீரான நெடுஞ்சாலை பயணம்",
      COMMENT_LABEL: "கருத்து & பயண அனுபவம் (குறைந்தது 20 எழுத்துகள்)",
      COMMENT_PLACEHOLDER: "இருக்கை வசதி, நேரந்தவறாமை, ஓட்டுநர் பாதுகாப்பு, சுகாதாரம் பற்றி கூறுங்கள்...",
      CHAR_COUNT: "{{count}} / 20 எழுத்துகள் தேவை",
      SUBMIT_NEW: "சரிபார்க்கப்பட்ட மதிப்புரையை வெளியிடு",
      SUBMIT_EDIT: "மதிப்புரையைப் புதுப்பி",
    },
      LANDING: {
        NO_FILTER_MATCH: "தேர்ந்தெடுத்த வடிகட்டிகளுக்கு பேருந்துகள் இல்லை. மேலும் பேருந்துகளைப் பார்க்க சில வடிகட்டிகளை நீக்கவும்.",
        FAQ_Q8: "எனது பேருந்து டிக்கெட்டை எவ்வாறு ரத்து செய்வது?",
        FAQ_A8: "\"எனது பயணங்கள்\" பகுதியைத் திறந்து, வரவிருக்கும் உறுதிப்படுத்தப்பட்ட பயணத்தைத் தேர்ந்தெடுத்து \"பதிவை ரத்து செய்\" என்பதை அழுத்தவும். இருக்கைகள் உடனே விடுவிக்கப்படும். இந்தப் பதிப்பில் பணத்திருப்பி தானாக நடக்காது, எனவே திருப்பித் தொகைக்கு பேருந்து இயக்குநரைத் தொடர்பு கொள்ளவும்.",
        FAQ_Q9: "என் முன்பதிவில் பயணக் காப்பீடு சேர்க்கலாமா?",
        FAQ_A9: "ஆம், காப்பீடு விருப்பமானது. தொடர்வதற்கு முன் முன்பதிவு படிவத்தில் உள்ள காப்பீட்டுப் பெட்டியைத் தேர்ந்தெடுத்து, அங்கு காட்டப்படும் விதிமுறைகளைப் படியுங்கள். காப்பீடு வேண்டாம் என்றால் தேர்ந்தெடுக்க வேண்டாம்.",
        NO_BUSES: "இந்த வழியில் {{date}} அன்று பேருந்துகள் இல்லை. வேறு தேதி அல்லது நேரத்தைத் தேர்ந்தெடுக்கவும், அல்லது வேறு வழியைத் தேர்ந்தெடுக்கவும்.",
        TIME_LABEL: "புறப்படும் நேரம்",
        TIME_ANY: "எந்த நேரமும்",
        TIME_EARLY: "அதிகாலை 12 - 6",
        TIME_MORNING: "காலை 6 - மதியம் 12",
        TIME_AFTERNOON: "மதியம் 12 - மாலை 6",
        TIME_EVENING: "மாலை 6 - இரவு 12",
        ALERT_SAME_CITY: "இரண்டு வெவ்வేறு நகரங்களைத் தேர்ந்தெடுக்கவும்.",
        HERO_TITLE: "இந்தியாவின் எண் 1 ஆன்லைன் பேருந்து டிக்கெட் முன்பதிவு தளம்",
        FROM: "எங்கிருந்து",
        TO: "எங்கே",
        DATE: "தேதி",
        SEARCH_BUSES: "பேருந்துகளைத் தேடு",
        OFFERS_TITLE: "பிரபலமான சலுகைகள்",
        VIEW_ALL: "அனைத்தையும் காண்க",
        OFFER_BADGE: "பேருந்து",
        OFFER_1: "பேருந்து டிக்கெட்டுகளில் ரூ. 250 வரை சேமியுங்கள்",
        OFFER_2: "AP, TS வழித்தடங்களில் ரூ. 300 வரை சேமியுங்கள்",
        OFFER_3: "RJ, MH, கோவா, MP வழித்தடங்களில் ரூ. 300 வரை சேமியுங்கள்",
        OFFER_4: "கேரள வழித்தடங்களில் ரூ. 200 வரை சேமியுங்கள்",
        VALID_TILL: "30 நவம்பர் வரை செல்லுபடியாகும்",
        FAQ_TITLE: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        FAQ_TAB_GENERAL: "பொது",
        FAQ_TAB_TICKET: "டிக்கெட் தொடர்பான",
        FAQ_TAB_MORE: "மேலும்",
        FAQ_TAB_PAYMENT: "பணம் செலுத்துதல்",
        FAQ_TAB_CANCEL: "ரத்து & பணத்திரும்பம்",
        FAQ_TAB_INSURANCE: "காப்பீடு",
        FAQ_Q1: "நான் பதிவு செய்த பேருந்தின் இருப்பிடத்தை ஆன்லைனில் கண்காணிக்க முடியுமா?",
        FAQ_Q2: "tedbus-இல் பேருந்து டிக்கெட்டுகளை ஆன்லைனில் ஏன் பதிவு செய்ய வேண்டும்?",
        FAQ_Q3: "பேருந்து டிக்கெட் பதிவு செய்ய tedbus தளத்தில் கணக்கு தேவையா?",
        FAQ_Q4: "ஆன்லைனில் பேருந்து பதிவு செய்தால் எனக்கு அதிகம் செலவாகுமா?",
        FAQ_Q5: "பேருந்து பதிவில் தள்ளுபடிகளை எவ்வாறு பெறுவது?",
        FAQ_Q6: "tedbus-இல் பேருந்து பதிவில் புதியது என்ன?",
        FAQ_Q7: "tedbus-இல் அரசுப் பேருந்து டிக்கெட் பதிவு செய்ய முடியுமா?",
        FAQ_A1: "RedBus இன்னும் உங்கள் பேருந்தின் நேரடி GPS இருப்பிடத்தைக் காட்டவில்லை. இயக்குநர், பேருந்தின் பெயர், வழித்தடம், ஏறும் இடம் மற்றும் புறப்படும் நேரம் உள்ளிட்ட உங்கள் பயண விவரங்கள் \"எனது பயணங்கள்\" பகுதியில் உள்ளன. பேருந்தின் தற்போதைய இருப்பிடத்திற்கு நேரடியாக பேருந்து இயக்குநரைத் தொடர்பு கொள்ளுங்கள்.",
        FAQ_A2: "ஆன்லைன் முன்பதிவில் உங்கள் வழித்தடத்தின் ஒவ்வொரு பேருந்தையும் பார்க்கலாம், உங்களுக்கான இருக்கைகளைத் தேர்ந்தெடுக்கலாம், பயணத்திற்கு முன் பணம் செலுத்தலாம், அனைத்து டிக்கெட்டுகளையும் \"எனது பயணங்கள்\" பகுதியில் வைத்திருக்கலாம். முன்பதிவு, அட்டவணை மாற்றம் மற்றும் பயண நினைவூட்டல்களை மின்னஞ்சல், புஷ் அல்லது செயலி அறிவிப்பு மூலம் பெறுவீர்கள். வரவிருக்கும் உறுதிப்படுத்தப்பட்ட பயணத்தை \"எனது பயணங்கள்\" பகுதியில் இருந்து ரத்து செய்யலாம்.",
        FAQ_A3: "ஆம். RedBus கூகுள் உள்நுழைவைப் பயன்படுத்துகிறது, எனவே உங்களுக்கு கூகுள் கணக்கு தேவை. RedBus-க்கு தனி கடவுச்சொல் இல்லை. கூகுள் மூலம் பதிவு செய்ய அல்லது உள்நுழைய முதல் முறை தேர்ந்தெடுக்கும்போது உங்கள் RedBus கணக்கு தானாக உருவாக்கப்படும். சரிபார்க்கப்பட்ட கணக்குகள் சமூகப் பதிவுகள் மற்றும் வழி மதிப்புரைகளையும் வெளியிடலாம்.",
        FAQ_A4: "இல்லை. ஒவ்வொரு பேருந்திலும் காட்டப்படும் கட்டணம் ஒரு இருக்கைக்கான விலை. பணம் செலுத்துவதற்கு முன் பணம் செலுத்தும் பக்கம் நீங்கள் தேர்ந்தெடுத்த இருக்கைகளின் மொத்தத்தைக் காட்டும்; அதில் தனி முன்பதிவு கட்டண வரி இல்லை. உறுதிப்படுத்துவதற்கு முன் பணம் செலுத்தும் பக்கத்தில் மொத்தத்தைச் சரிபார்க்கவும்.",
        FAQ_A5: "முகப்புப் பக்கத்தில் உள்ள FIRST, SUPERHIT, BUS300 மற்றும் RBTRIP போன்ற சலுகைகள் அவற்றின் செல்லுபடியாகும் தேதிகளுடன் பட்டியலிடப்பட்டுள்ளன. இந்தப் பதிப்பில் சலுகைக் குறியீடுகள் பணம் செலுத்தும்போது தானாகப் பயன்படுத்தப்படுவதில்லை, எனவே பணம் செலுத்தும் பக்கம் முழு கட்டணத்தைக் காட்டும். முன்பதிவு செய்வதற்கு முன் முகப்புப் பக்கத்தில் சலுகை விவரங்களைச் சரிபார்க்கவும்.",
        FAQ_A6: "இந்தப் பதிப்பில் புதியவை: கதைகள், குறிப்புகள் மற்றும் புகைப்படங்களுடன் பயண சமூகம்; போக்குவரத்து தகவல், மாற்று வழிகள், வழி ஒப்பீடு மற்றும் சேமித்த வழிகளுடன் வழித் திட்டமிடுபவர்; மின்னஞ்சல், புஷ், செயலி மற்றும் விருப்ப SMS எச்சரிக்கைகளுடன் அறிவிப்பு மையம்; வழித்தடம், மொழி மற்றும் மதிப்பீட்டின் அடிப்படையில் வடிகட்டவும், புதியவை, அதிக, குறைந்த அல்லது மிகவும் உதவிகரமானவை என வரிசைப்படுத்தவும் முடியும் சரிபார்க்கப்பட்ட வழி மதிப்புரைகள்; இருள் பயன்முறை; மற்றும் ஆங்கிலம், இந்தி, தெலுங்கு, தமிழ்.",
        FAQ_A7: "RedBus எங்கள் பட்டியலில் உள்ள தனியார் இயக்குநர்களின் பேருந்துகளைக் காட்டுகிறது. அரசு (மாநில போக்குவரத்து) பேருந்துகள் இந்த இணையதளத்தில் இன்னும் தனியாகப் பட்டியலிடப்படவில்லை, எனவே இங்கே முன்பதிவு செய்ய முடியாது. அரசுப் பேருந்து டிக்கெட்டுகளுக்கு மாநில போக்குவரத்துக் கழகத்தின் அதிகாரப்பூர்வ இணையதளம் அல்லது கவுண்டரைப் பயன்படுத்தவும்.",
        ALERT_FILL: "தயவுசெய்து விவரங்களை நிரப்பவும்!",
        DIALOG_TITLE: "கிடைக்கும் பேருந்து வழிகள்",
        DIALOG_NO: "எண்.",
        DIALOG_FROM: "இருந்து",
        DIALOG_TO: "வரை",
        DIALOG_BUSES: "பேருந்துகளின் எண்ணிக்கை",
      },
      ACCOUNT: {
        SESSION_EXPIRED: "உங்கள் அமர்வு முடிந்துவிட்டது. Google மூலம் மீண்டும் உள்நுழையவும்.",
        TITLE: "கணக்கு விவரங்கள்",
        SUBTITLE: "முன்பதிவுகள் மற்றும் எச்சரிக்கைகளுக்குப் பயன்படும் உங்கள் தனிப்பட்ட தகவல்.",
        SIGN_IN_PROMPT: "உங்கள் கணக்கைப் பார்க்க உள்நுழையுங்கள்.",
        LOADING: "கணக்கு விவரங்கள் ஏற்றப்படுகின்றன...",
        LOAD_FAILED: "உங்கள் கணக்கு விவரங்களை ஏற்ற முடியவில்லை.",
        FIELD_NAME: "பெயர்",
        FIELD_EMAIL: "மின்னஞ்சல்",
        EMAIL_NOTE: "உங்கள் மின்னஞ்சல் Google கணக்கிலிருந்து வருகிறது, இங்கே மாற்ற முடியாது.",
        FIELD_PHONE: "தொலைபேசி",
        PHONE_NOT_ADDED: "இன்னும் சேர்க்கப்படவில்லை",
        FIELD_GENDER: "பாலினம்",
        FIELD_AGE: "வயது",
        FIELD_VERIFICATION: "சரிபார்ப்பு",
        VERIFIED: "சரிபார்க்கப்பட்ட பயணி",
        NOT_VERIFIED: "சரிபார்க்கப்படவில்லை",
        FIELD_ROLE: "கணக்கு வகை",
        FIELD_LANGUAGE: "விருப்ப மொழி",
        FIELD_THEME: "தீம்",
        THEME_LIGHT: "ஒளி",
        THEME_DARK: "இருள்",
        EDIT_TITLE: "விவரங்களைத் திருத்து",
        SAVE: "மாற்றங்களைச் சேமி",
        SAVING: "சேமிக்கப்படுகிறது...",
        SAVED: "கணக்கு விவரங்கள் புதுப்பிக்கப்பட்டன.",
        SAVE_FAILED: "உங்கள் விவரங்களைப் புதுப்பிக்க முடியவில்லை.",
        GENDER_MALE: "ஆண்",
        GENDER_FEMALE: "பெண்",
        GENDER_OTHER: "மற்றவை",
        SIGN_OUT: "வெளியேறு",
      },
      DASHBOARD: {
        TITLE: "எனது டாஷ்போர்டு",
        SUBTITLE: "உங்கள் பயணங்கள், மதிப்புரைகள் மற்றும் அறிவிப்புகள் ஒரே இடத்தில்.",
        SIGN_IN_PROMPT: "உங்கள் டாஷ்போர்டைப் பார்க்க உள்நுழையுங்கள்.",
        LOADING: "உங்கள் டாஷ்போர்டு ஏற்றப்படுகிறது...",
        LOAD_FAILED: "உங்கள் பயணங்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
        STAT_UPCOMING: "வரவிருக்கும் பயணங்கள்",
        STAT_TOTAL: "மொத்த பதிவுகள்",
        STAT_UNREAD: "படிக்கப்படாத அறிவிப்புகள்",
        STAT_REVIEWS: "மதிப்பாய்வு செய்ய வேண்டிய பயணங்கள்",
        TRIPS_HEADING: "எனது பயணங்கள்",
        NO_TRIPS: "உங்களுக்கு இன்னும் பதிவுகள் எதுவும் இல்லை.",
        BOOK_NOW: "டிக்கெட் பதிவு செய்",
        STATUS_CONFIRMED: "உறுதிப்படுத்தப்பட்டது",
        STATUS_CANCELLED: "ரத்து செய்யப்பட்டது",
        STATUS_COMPLETED: "முடிந்தது",
        STATUS_PENDING: "நிலுவையில்",
        PNR: "PNR",
        SEATS: "இருக்கைகள்",
        FARE: "கட்டணம்",
        JOURNEY: "பயணம்",
        QUICK_LINKS: "விரைவு இணைப்புகள்",
        GO_HOME: "டிக்கெட் பதிவு",
        GO_NOTIFICATIONS: "அறிவிப்புகள்",
        GO_REVIEWS: "வழி மதிப்புரைகள்",
        GO_COMMUNITY: "சமூகம்",
        GO_PLANNER: "வழித் திட்டமிடுபவர்",
      },
      PROFILE: {
        SIGN_IN_PROMPT: "உங்கள் சுயவிவரத்தைப் பார்க்க உள்நுழையுங்கள்.",
        TAB_DASHBOARD: "டாஷ்போர்டு",
        TAB_TRIPS: "எனது பயணங்கள்",
        TAB_PROFILE: "எனது சுயவிவரம்",
        TAB_PREFERENCES: "விருப்பத்தேர்வுகள்",
        PREF_THEME: "தீம்",
        PREF_THEME_DESC: "முழு பயன்பாட்டிற்கும் ஒளி அல்லது இருள் பயன்முறையைத் தேர்ந்தெடுக்கவும்.",
        PREF_LIGHT: "ஒளி",
        PREF_DARK: "இருள்",
        PREF_LANGUAGE: "மொழி",
        PREF_LANGUAGE_DESC: "பயன்பாட்டிற்கும் உங்கள் முன்பதிவு எச்சரிக்கைகளுக்கும் உள்ள மொழி.",
        PREF_ALERTS: "எச்சரிக்கைகள் & செயல்பாடு",
        PREF_ALERTS_DESC: "அறிவிப்பு அமைப்புகள், உங்கள் வழி மதிப்புரைகள் மற்றும் சமூகப் பதிவுகள்.",
        GO_NOTIFICATIONS: "அறிவிப்பு அமைப்புகள்",
        GO_REVIEWS: "உங்கள் வழி மதிப்புரைகள்",
        GO_COMMUNITY: "சமூகப் பதிவுகள்",
        SIGN_OUT: "வெளியேறு",
      },
      OFFER: {
        TITLE: "சலுகைக் குறியீடு",
        PLACEHOLDER: "சலுகைக் குறியீட்டை உள்ளிடவும்",
        APPLY: "பயன்படுத்து",
        REMOVE: "நீக்கு",
        DISCOUNT: "சலுகை தள்ளுபடி",
        APPLIED: "சலுகை பயன்படுத்தப்பட்டது.",
        UNKNOWN: "இந்த சலுகைக் குறியீடு செல்லுபடியாகாது.",
        EXPIRED: "இந்தச் சலுகையின் காலம் முடிந்தது.",
        NOT_ELIGIBLE: "இந்தச் சலுகை இந்த வழித்தடத்திற்குப் பொருந்தாது.",
        UNAVAILABLE: "சலுகையைச் சரிபார்க்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
      },
      TRIPS: {
        SESSION_EXPIRED: "உங்கள் அமர்வு முடிந்துவிட்டது. Google மூலம் மீண்டும் உள்நுழையவும்.",
        SORT_LABEL: "வரிசைப்படுத்து:",
        SORT_NEWEST: "புதிய பயணம்",
        SORT_OLDEST_TRIP: "பழைய பயணம்",
        SORT_FARE_HIGH: "கட்டணம்: அதிகம் முதல் குறைவு",
        SORT_FARE_LOW: "கட்டணம்: குறைவு முதல் அதிகம்",
        TITLE: "எனது பயணங்கள்",
        SUBTITLE: "வரவிருக்கும், முடிந்த மற்றும் ரத்து செய்யப்பட்ட பதிவுகள்.",
        FILTER_ALL: "அனைத்தும்",
        FILTER_UPCOMING: "வரவிருக்கும்",
        FILTER_COMPLETED: "முடிந்தவை",
        FILTER_CANCELLED: "ரத்து செய்யப்பட்டவை",
        EMPTY: "இந்தப் பட்டியலில் பயணங்கள் இல்லை.",
        LOADING: "உங்கள் பயணங்கள் ஏற்றப்படுகின்றன...",
        CANCEL_BTN: "பதிவை ரத்து செய்",
        CANCEL_CONFIRM: "பதிவு {{pnr}} ஐ ரத்து செய்யவா? உங்கள் இருக்கைகள் விடுவிக்கப்படும்.",
        CANCELLED_OK: "பதிவு ரத்து செய்யப்பட்டது. உங்கள் இருக்கைகள் விடுவிக்கப்பட்டன.",
        CANCEL_FAILED: "இந்தப் பதிவை ரத்து செய்ய முடியவில்லை.",
        REVIEW_TRIP: "இந்தப் பயணத்தை மதிப்பாய்வு செய்",
      },
    COMMUNITY: {
      LANG_LABEL: "மொழி:",
      LANG_ALL: "அனைத்து மொழிகளும்",
      SORT_LIKED: "அதிக விருப்பங்கள்",
      SORT_DISCUSSED: "அதிக விவாதம்",
      SORT_VIEWED: "அதிகம் பார்க்கப்பட்டவை",
      SORT_OLDEST: "பழையவை",
      TOAST_LOAD_FAILED: "சமூகக் கதைகளை ஏற்ற முடியவில்லை.",
      TOAST_LOGIN_TO_LIKE: "விரும்ப பயணி சுயவிவரத்தில் உள்நுழையுங்கள்.",
      TOAST_LIKE_FAILED: "விருப்பத்தைப் பதிவு செய்ய முடியவில்லை.",
      TOAST_COMMENT_FAILED: "கருத்தைச் சேர்ப்பதில் பிழை.",
      TOAST_VERIFIED_ONLY_POST: "சரிபார்க்கப்பட்ட பயணிகள் மட்டுமே கதைகளை வெளியிட அனுமதிக்கப்படுவர்.",
      TOAST_TITLE_REQUIRED: "தலைப்பும் உள்ளடக்கமும் தேவை.",
      TOAST_PUBLISHED: "உங்கள் பயணக் கதை வெளியிடப்பட்டது!",
      TOAST_POST_FAILED: "பதிவைச் சமர்ப்பிக்க முடியவில்லை.",
      TOAST_MOD_DONE: "மதிப்பாய்வு நடவடிக்கை முடிந்தது.",
      TOAST_MOD_FAILED: "மதிப்பாய்வு நடவடிக்கை தோல்வியடைந்தது.",
      TOAST_REPORT_FAILED: "புகாரைச் சமர்ப்பிப்பதில் பிழை.",
      TOAST_LINK_COPIED: "பதிவு இணைப்பு நகலெடுக்கப்பட்டது!",
      SEARCH_PLACEHOLDER: "இலக்கு அல்லது வழியைத் தேடுங்கள்",
      SEARCH_BTN: "தேடு",
      SORT_LABEL: "வரிசைப்படுத்து:",
      MOD_BACK: "சமூக ஊட்டத்திற்குத் திரும்பு",
      MOD_QUEUE: "புகாரளிக்கப்பட்ட உள்ளடக்க மதிப்பாய்வு வரிசை",
      LOADING_STORIES: "பயணக் கதைகள் ஏற்றப்படுகின்றன...",
      EMPTY_TITLE: "\"{{topic}}\" இன் கீழ் கதைகள் எதுவும் இல்லை",
      EMPTY_SUB: "இந்த தலைப்பில் குறிப்புகளைப் பகிரும் முதல் சரிபார்க்கப்பட்ட பயணி ஆகுங்கள்!",
      WRITE_FIRST: "முதல் பதிவை எழுதுங்கள்",
      MOD_APPROVE: "அங்கீகரி",
      MOD_FLAG: "கொடியிடு",
      MOD_REMOVE: "நீக்கு",
      MOD_FEATURE: "★ சிறப்பிடு",
      REPORT_TITLE: "பதிவைப் புகாரளி",
      VERIFIED_TITLE: "சரிபார்க்கப்பட்ட பயணி",
      GUIDE: "வழிகாட்டி",
      LIKES: "{{count}} விருப்பங்கள்",
      COMMENTS: "{{count}} கருத்துகள்",
      VIEWS: "{{count}} பார்வைகள்",
      SHARE_WHATSAPP: "WhatsApp",
      SHARE_X: "X",
      SHARE_COPY: "நகலெடு",
      SHARE_WHATSAPP_TITLE: "WhatsApp-இல் பகிரு",
      SHARE_X_TITLE: "X-இல் பகிரு",
      COPY_LINK_TITLE: "இணைப்பை நகலெடு",
      DISCUSSION: "விவாதம் ({{count}})",
      COMMENT_PLACEHOLDER: "உங்கள் அனுபவம் அல்லது ஆலோசனையைப் பகிருங்கள்...",
      CREATE_TITLE: "பயணக் கதை அல்லது குறிப்பை வெளியிடு",
      CATEGORY_LABEL: "வகை / மன்றத் தலைப்பு",
      STORY_TITLE_LABEL: "கதை / ஆலோசனை தலைப்பு",
      STORY_TITLE_PLACEHOLDER: "எ.கா. பெங்களூர் முதல் கோவா ஸ்லீப்பர் பேருந்து: சிறந்த 5 நிறுத்தங்கள்",
      FROM_CITY: "புறப்படும் நகரம்",
      TO_CITY: "சேரும் நகரம்",
      PHOTO_LABEL: "புகைப்பட URL (விருப்பத்தேர்வு)",
      STORY_LABEL: "உங்கள் பயணக் கதை / குறிப்புகள்",
      STORY_PLACEHOLDER: "உங்கள் அனுபவம், ஸ்லீப்பர் தரம், சுகாதாரம் அல்லது நெடுஞ்சாலை பரிந்துரைகளை எழுதுங்கள்...",
      PUBLISH_NOW: "இப்போது வெளியிடு",
      PROFILE_TITLE: "பயணி சமூக சுயவிவரம்",
      STORIES_SHARED: "பகிரப்பட்ட கதைகள்",
      COMMUNITY_LIKES: "சமூக விருப்பங்கள்",
      TOPIC_ALL: "அனைத்தும்",
      TOPIC_JOURNEY_STORIES: "பயணக் கதைகள்",
      TOPIC_TRAVEL_TIPS: "பயணக் குறிப்புகள்",
      TOPIC_ROUTE_ADVICE: "வழி ஆலோசனை",
      TOPIC_DESTINATION_GUIDE: "இலக்கு வழிகாட்டி",
      TOPIC_GENERAL_DISCUSSION: "பொது விவாதம்",
      HERO_TAG: "சமூக மையம்",
      TITLE : "பயண அனுபவங்கள் & குறிப்புகள்",
      SUBTITLE : "உறுதிப்படுத்தப்பட்ட பயணிகளுடன் இணையுங்கள் மற்றும் பயண குறிப்புகளைப் பெறுங்கள்.",
      SHARE_BTN : "பயணக் கதையைப் பகிரவும்" ,
      ALL_TOPICS : "அனைத்தும்",
      SORT_RECENT:"சமீபத்தியவை",
      SORT_TRENDING : "பிரபலமானவை",
      FEATURED: "சிறப்புக் கதை",
      REPLY_BTN : "பதிலளி",
      REPORT_BTN : "புகாரளி",
      SHARE : "பகிர்",
    },
    NOTIFICATIONS: {
      CHANNELS_DESC: "எந்தத் தகவல் தொடர்பு சேனல்கள் வழியாக அறிவிப்புகளைப் பெற விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்.",
      FILTER_ALL: "அனைத்தும்",
      FILTER_BOOKINGS: "பதிவுகள்",
      FILTER_REMINDERS: "நினைவூட்டல்கள்",
      FILTER_SCHEDULE: "அட்டவணை",
      FILTER_OFFERS: "சலுகைகள்",
      SYNC_LOGS: "அறிவிப்புப் பதிவுகள் ஒத்திசைக்கப்படுகின்றன...",
      EMPTY_TITLE: "அறிவிப்புகள் எதுவும் இல்லை.",
      EMPTY_DESC: "எல்லாவற்றையும் பார்த்துவிட்டீர்கள்! தானியங்கி பயண நினைவூட்டல்களும் பதிவு உறுதிப்படுத்தல்களும் இங்கே தோன்றும்.",
      LANGUAGE_TAG: "மொழி: {{code}}",
      STATUS_LABEL: "நிலை:",
      RETRY_BTN: "தோல்வியடைந்த அனுப்புதல்களை மீண்டும் முயற்சி",
      DEFAULT_SUFFIX: "(இயல்புநிலை)",
      CHANNEL_EMAIL_TITLE: "மின்னஞ்சல் அறிவிப்புகள்",
      CHANNEL_EMAIL_DESC: "மின்னஞ்சல் வழியாக டிக்கெட்டுகள், விலைப்பட்டியல்கள் மற்றும் முழுமையான எச்சரிக்கைகளைப் பெறுங்கள்.",
      CHANNEL_PUSH_TITLE: "புஷ் அறிவிப்புகள்",
      CHANNEL_PUSH_DESC: "இணையம் மற்றும் மொபைல் சாதனங்களில் உடனடி பூட்டுத்திரை அறிவிப்புகள்.",
      CHANNEL_SMS_TITLE: "SMS நுழைவாயில்",
      CHANNEL_SMS_DESC: "முக்கியமான ஏறும் நினைவூட்டல்கள் நேரடியாக குறுஞ்செய்திகளாக அனுப்பப்படும்.",
      EVENTS_HEADING: "நிகழ்வு சந்தாக்கள் & சந்தைப்படுத்தல் ஒப்புதல்",
      EVENTS_DESC: "நெடுஞ்சாலை சலுகைகள் மற்றும் பருவகால விளம்பரங்கள் போன்ற விருப்ப செய்திகளைக் கட்டுப்படுத்துங்கள்.",
      PROMO_TITLE: "விளம்பர சலுகைகள் & தள்ளுபடிகள்",
      PROMO_DESC: "வாராந்திர நெடுஞ்சாலை கூப்பன்கள் மற்றும் வழித்தடத் தள்ளுபடிகளைப் பெற ஒப்புக்கொள்ளுங்கள்.",
      SCHEDULE_TITLE: "அட்டவணை மாற்றங்கள் & தாமதங்கள்",
      SCHEDULE_DESC: "உங்கள் பேருந்து இயக்குநர் ஏறும் அல்லது சேரும் நேரத்தை மாற்றினால் உடனடி புதுப்பிப்புகள்.",
      SIM_TITLE: "பல-சேனல் நிகழ்வு அனுப்பல் உருவகப்படுத்தி",
      SIM_DESC: "நிகழ்நேர செய்தி உள்ளூர்மயமாக்கல், பல-சேனல் வழிப்படுத்தல் மற்றும் மீண்டும் முயற்சி தர்க்கத்தைச் சோதியுங்கள்.",
      EVENT_TYPE: "நிகழ்வு வகை",
      EV_REMINDER: "வரவிருக்கும் பயண நினைவூட்டல்",
      EV_SCHEDULE: "அட்டவணை மாற்றம் / தாமத எச்சரிக்கை",
      EV_PROMO: "பிரத்தியேக நெடுஞ்சாலை விளம்பர சலுகை",
      EV_BOOKING: "பதிவு உறுதிப்படுத்தல் சோதனை",
      DEPARTURE_CITY: "புறப்படும் நகரம்",
      DESTINATION_CITY: "சேரும் நகரம்",
      NEW_TIME: "புதிய திருத்திய புறப்பாட்டு நேரம்",
      PROMO_CODE: "விளம்பரக் குறியீடு",
      DISCOUNT_PCT: "தள்ளுபடி (%)",
      DISPATCH_BTN: "இப்போதே அறிவிப்பை அனுப்பு",
      TOAST_SIGN_IN_FIRST: "அறிவிப்புகளைத் திறப்பதற்கு முன் உள்நுழையுங்கள்.",
      TOAST_SESSION_INVALID: "உங்கள் அமர்வு செல்லாதது. மீண்டும் உள்நுழையுங்கள்.",
      TOAST_LOAD_FAILED: "அறிவிப்பு வரலாற்றை ஏற்றுவதில் பிழை.",
      TOAST_PREFS_SAVED: "விருப்பத்தேர்வுகள் வெற்றிகரமாக சேமிக்கப்பட்டன.",
      TOAST_PREFS_FAILED: "விருப்பத்தேர்வுகளைச் சேமிக்க முடியவில்லை.",
      TOAST_ALL_READ: "அனைத்து அறிவிப்புகளும் படித்ததாகக் குறிக்கப்பட்டன.",
      TOAST_RETRY_DONE: "அனுப்புதல் மீண்டும் முயற்சி முடிந்தது.",
      TOAST_RETRY_FAILED: "மீண்டும் முயற்சி தோல்வியடைந்தது.",
      TOAST_SENT: "அறிவிப்பு அனுப்பப்பட்டு நிகழ்நேரத்தில் பதிவு செய்யப்பட்டது!",
      TOAST_SIM_FAILED: "உருவகப்படுத்தல் தோல்வியடைந்தது.",
      TAG : "செய்தி மையம்",
      TITLE: "அறிவிப்பு மையம்",
      SUBTITLE : "நேரடி எச்சரிக்கைகள் மற்றும் தனிப்பயன் தகவல் விருப்பங்கள்." ,
      TAB_INBOX : "இன்பாக்ஸ்",
      TAB_PREFERENCES:'விருப்பத்தேர்வுகள்',
      TAB_SIMULATOR :'நிகழ்வு சிமுலேட்டர்',
      UNREAD_ONLY:'படிக்காதவை மட்டும்',
      MARK_ALL_READ : "அனைத்தையும் படித்ததாகக் குறிக்கவும்",
      LANG_HEADING : "மொழி & மொழிபெயர்ப்பு",
      LANG_DESC : "அனைத்து பயண அறிவிப்புகளுக்கும் உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்.",
      CHANNELS_HEADING: "விநியோக வழிகள்",
      SAVE_PREF_BTN:"அமைப்புகளைச் சேமி",
    }
  }
  
};