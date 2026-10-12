// Sample reviews for every bus in the catalog, plus the hand-written sample routes.
//
// Every review is written by its own traveler: no traveler reviews twice, and every traveler has a
// different picture, email, phone number, time of review and headline/text (see seed-review-pool.js).
//
// Run from the frontend/server folder:   npm run seed:reviews
// Safe to run again: earlier sample bookings (PNR starting "RVS"), their reviews and sample travelers
// (email ending in @review-sample.redbus) are replaced. Real bookings, reviews and users are never touched.

require("dotenv").config();
const mongoose = require("mongoose");
const Bus = require("./models/bus");
const Customer = require("./models/customer");
const Booking = require("./models/booking");
const Review = require("./models/review");
const { EXTRA_BUSES, EXTRA_TRAVELERS, EXTRA_REVIEWS } = require("./seed-data-extra");
const { buildCatalog } = require("./seed-bus-catalog");
const { buildReviewSample, buildPicture, SAMPLE_DOMAIN } = require("./seed-review-pool");
const { MORE_REVIEWS } = require("./seed-data-more");

// Five sample routes, each with its own bus.
const BUSES = [
  { busNumber: "RVS-DEL-JAI", busName: "Pink City Sleeper", busType: "AC Sleeper", companyName: "RedBus Sample Travels",
    totalSeats: 36, availableSeats: 36, fare: 1100, departureTime: "21:00", arrivalTime: "06:30",
    departureCity: "delhi", destinationCity: "jaipur" },
  { busNumber: "RVS-MUM-PUN", busName: "Shivneri Express", busType: "AC Seater", companyName: "RedBus Sample Travels",
    totalSeats: 40, availableSeats: 40, fare: 450, departureTime: "07:00", arrivalTime: "10:00",
    departureCity: "mumbai", destinationCity: "pune" },
  { busNumber: "RVS-BLR-HYD", busName: "Deccan Night Rider", busType: "AC Sleeper", companyName: "RedBus Sample Travels",
    totalSeats: 30, availableSeats: 30, fare: 900, departureTime: "20:30", arrivalTime: "06:00",
    departureCity: "bangalore", destinationCity: "hyderabad" },
  { busNumber: "RVS-CHE-PON", busName: "Coastal Connect", busType: "Non-AC Seater", companyName: "RedBus Sample Travels",
    totalSeats: 42, availableSeats: 42, fare: 380, departureTime: "09:00", arrivalTime: "13:00",
    departureCity: "chennai", destinationCity: "pondicherry" },
  { busNumber: "RVS-DEL-AGR", busName: "Taj Express Bus", busType: "AC Seater", companyName: "RedBus Sample Travels",
    totalSeats: 38, availableSeats: 38, fare: 550, departureTime: "06:00", arrivalTime: "10:30",
    departureCity: "delhi", destinationCity: "agra" },
];

// Community authors (seed-community.js uses these). Review authors are generated, see seed-review-pool.js.
const CURATED_TRAVELERS = [
  { name: "Asha Verma", email: "asha.verma@review-sample.redbus", googleId: "sample-community-01", phone: "9000010001", gender: "Female", age: 34, isVerified: true, role: "traveler" },
  { name: "Rahul Mehta", email: "rahul.mehta@review-sample.redbus", googleId: "sample-community-02", phone: "9000010002", gender: "Male", age: 29, isVerified: true, role: "traveler" },
  { name: "Priya Iyer", email: "priya.iyer@review-sample.redbus", googleId: "sample-community-03", phone: "9000010003", gender: "Female", age: 41, isVerified: true, role: "traveler" },
  { name: "Suresh Reddy", email: "suresh.reddy@review-sample.redbus", googleId: "sample-community-04", phone: "9000010004", gender: "Male", age: 52, isVerified: true, role: "traveler" },
  { name: "Meena Kumari", email: "meena.kumari@review-sample.redbus", googleId: "sample-community-05", phone: "9000010005", gender: "Female", age: 58, isVerified: true, role: "traveler" },
  { name: "Arjun Nair", email: "arjun.nair@review-sample.redbus", googleId: "sample-community-06", phone: "9000010006", gender: "Male", age: 26, isVerified: true, role: "traveler" },
  { name: "Kavya Rao", email: "kavya.rao@review-sample.redbus", googleId: "sample-community-07", phone: "9000010007", gender: "Female", age: 31, isVerified: true, role: "traveler" },
  { name: "Vikram Singh", email: "vikram.singh@review-sample.redbus", googleId: "sample-community-08", phone: "9000010008", gender: "Male", age: 38, isVerified: true, role: "traveler" },
];

// route: busNumber above; traveler: index in TRAVELERS; helpful: traveler indexes who found it helpful.
const REVIEWS = [
  // English
  { route: "RVS-DEL-JAI", language: "en", rating: 5, date: "2026-09-14", headline: "Punctual and comfortable overnight ride",
    comment: "The bus left Delhi on time and reached Jaipur early in the morning. The sleeper berth was clean and the blanket was warm. The driver kept a steady speed on the highway." },
  { route: "RVS-MUM-PUN", language: "en", rating: 4, date: "2026-08-22", headline: "Quick trip, clean washroom",
    comment: "The journey from Mumbai to Pune took about three hours even on a Friday evening. The seats were comfortable and the washroom was clean. The AC was a little weak at the back." },
  { route: "RVS-BLR-HYD", language: "en", rating: 3, date: "2026-08-05", headline: "Average experience",
    comment: "The bus was on time, but the seat recline was limited and the window seat did not close properly. Customer support answered my boarding point question quickly." },
  { route: "RVS-CHE-PON", language: "en", rating: 2, date: "2026-07-18", headline: "Delayed departure",
    comment: "The bus left almost forty minutes late without any announcement. The conductor was helpful once we boarded, but the waiting area had no shade and no seats." },
  { route: "RVS-DEL-AGR", language: "en", rating: 5, date: "2026-09-02", headline: "Smooth expressway drive",
    comment: "An excellent ride on the expressway. The bus stopped at a clean restaurant for breakfast and the staff were patient with elderly passengers. I would book again for a family trip." },
  { route: "RVS-DEL-JAI", language: "en", rating: 1, date: "2026-07-29", headline: "Bus broke down midway",
    comment: "The bus developed an engine problem near the Kotputli toll, and we waited almost two hours for a replacement. The app did not inform us about the delay." },
  { route: "RVS-MUM-PUN", language: "en", rating: 4, date: "2026-09-09", headline: "Good value for money",
    comment: "The fare was reasonable and the boarding point was easy to find. The bus was a little crowded at the Thane stop, but we found seats. Departure reminders arrived on time." },
  { route: "RVS-BLR-HYD", language: "en", rating: 5, date: "2026-08-28", headline: "Best overnight option on this route",
    comment: "I have taken this bus five times this year. The leg space is good, the reading light works, and it reaches Hyderabad at the scheduled time. The reclining seats are the best I have used." },
  // Hindi
  { route: "RVS-DEL-JAI", language: "hi", rating: 5, date: "2026-09-16", headline: "समय पर और आरामदायक सफ़र",
    comment: "बस दिल्ली से समय पर चली और सुबह जल्दी जयपुर पहुंच गई। स्लीपर सीट साफ थी और कंबल भी गर्म था। ड्राइवर हाईवे पर बहुत सावधानी से गाड़ी चला रहा था।" },
  { route: "RVS-MUM-PUN", language: "hi", rating: 3, date: "2026-08-14", headline: "ठीक-ठाक अनुभव",
    comment: "बस का समय ठीक था, लेकिन पीछे की सीटों पर एसी कमजोर लगा। टिकट बुकिंग आसान थी और सूचनाएं भी समय पर मिलीं।" },
  { route: "RVS-CHE-PON", language: "hi", rating: 2, date: "2026-07-25", headline: "देर से रवाना हुई बस",
    comment: "बस चालीस मिनट देर से चली और इसकी कोई सूचना नहीं दी गई। बैठने के लिए प्रतीक्षालय में न छाया थी न बेंच।" },
  { route: "RVS-DEL-AGR", language: "hi", rating: 4, date: "2026-09-06", headline: "परिवार के साथ अच्छी यात्रा",
    comment: "आगरा तक का रास्ता बहुत अच्छा था। नाश्ते के लिए बस साफ-सुथरे ढाबे पर रुकी। बुजुर्गों के साथ कर्मचारियों का व्यवहार विनम्र था।" },
  { route: "RVS-BLR-HYD", language: "hi", rating: 4, date: "2026-08-19", headline: "बुकिंग से बोर्डिंग तक सब सही",
    comment: "ऐप से टिकट लेना आसान था और बोर्डिंग पॉइंट पर बस ठीक समय पर पहुंची। सीटें साफ थीं, पर खिड़की की सीट का शीशा थोड़ा अटकता था।" },
  { route: "RVS-DEL-JAI", language: "hi", rating: 1, date: "2026-07-30", headline: "रात में बस खराब हो गई",
    comment: "कोटपूतली टोल के पास बस में इंजन की खराबी आ गई। बदली बस के लिए लगभग दो घंटे इंतजार करना पड़ा और कंपनी ने इसकी सूचना नहीं दी।" },
  { route: "RVS-MUM-PUN", language: "hi", rating: 5, date: "2026-09-11", headline: "किफायती और भरोसेमंद",
    comment: "मुंबई से पुणे का सफर किफायती और समय पर रहा। बस में चार्जिंग पॉइंट था और सीटों के बीच जगह भी अच्छी थी। मैं फिर से यही बस लूंगी।" },
  // Telugu
  { route: "RVS-BLR-HYD", language: "te", rating: 5, date: "2026-09-04", headline: "సమయానికి నడిచిన బస్సు",
    comment: "బెంగళూరు నుండి హైదరాబాద్ వరకు బస్సు షెడ్యూల్ ప్రకారం బయలుదేరి సమయానికి చేరుకుంది. సీట్లు శుభ్రంగా ఉన్నాయి మరియు డ్రైవర్ చాలా జాగ్రత్తగా నడిపాడు." },
  { route: "RVS-DEL-JAI", language: "te", rating: 4, date: "2026-08-10", headline: "మంచి రాత్రి ప్రయాణం",
    comment: "జైపూర్ వెళ్లే ఈ బస్సులో నిద్ర బాగా పట్టింది. బస్సు ఆపిన ప్రదేశంలో టాయిలెట్లు శుభ్రంగా ఉన్నాయి. కొంచెం ఆలస్యంగా బయలుదేరింది." },
  { route: "RVS-CHE-PON", language: "te", rating: 2, date: "2026-07-21", headline: "బస్సు ఆలస్యం అయ్యింది",
    comment: "చెన్నై నుండి పాండిచ్చేరి బస్సు నలభై నిమిషాలు ఆలస్యంగా బయలుదేరింది. దీనిపై ఎటువంటి ప్రకటన చేయలేదు. వేచి ఉండే ప్రదేశంలో కూర్చోవడానికి స్థలం లేదు." },
  { route: "RVS-DEL-AGR", language: "te", rating: 5, date: "2026-09-08", headline: "కుటుంబంతో సౌకర్యవంతమైన ప్రయాణం",
    comment: "ఢిల్లీ నుండి ఆగ్రా వరకు ఎక్స్‌ప్రెస్‌వేపై సాఫీగా సాగింది. మా అమ్మగారికి సహాయం చేసిన సిబ్బందికి ధన్యవాదాలు. తదుపరి ప్రయాణానికి మళ్లీ బుక్ చేస్తాను." },
  { route: "RVS-MUM-PUN", language: "te", rating: 3, date: "2026-08-31", headline: "సగటు అనుభవం",
    comment: "ముంబై నుండి పుణే ప్రయాణం సమయానికి పూర్తైంది, కానీ ఏసీ బ్యాక్ సీట్లలో సరిగా పనిచేయలేదు. టికెట్ బుకింగ్ సులభంగా ఉంది." },
  // Tamil
  { route: "RVS-BLR-HYD", language: "ta", rating: 4, date: "2026-08-07", headline: "நேரத்திற்கு புறப்பட்ட பேருந்து",
    comment: "பெங்களூரில் இருந்து ஹைதராபாத் வரை பேருந்து அட்டவணைப்படி புறப்பட்டு நேரத்திற்குச் சென்றடைந்தது. இருக்கைகள் சுத்தமாக இருந்தன. ஓட்டுநர் பாதுகாப்பாக ஓட்டினார்." },
  { route: "RVS-CHE-PON", language: "ta", rating: 1, date: "2026-07-14", headline: "பயணத்தின் நடுவே பேருந்து பழுது",
    comment: "சென்னை - பாண்டிச்சேரி பயணத்தில் பேருந்தில் இயந்திரக் கோளாறு ஏற்பட்டது. மாற்றுப் பேருந்துக்காக இரண்டு மணி நேரம் காத்திருந்தோம். நிறுவனம் தாமதம் குறித்து தெரிவிக்கவில்லை." },
  { route: "RVS-DEL-JAI", language: "ta", rating: 5, date: "2026-09-12", headline: "சுத்தமான மற்றும் வசதியான பேருந்து",
    comment: "ஜெய்ப்பூர் பயணம் மிகச் சிறப்பாக இருந்தது. ஸ்லீப்பர் படுக்கை சுத்தமாக இருந்தது, போர்வை சூடாக இருந்தது. ஏறும் இடத்தை எளிதாகக் கண்டுபிடிக்க முடிந்தது." },
  { route: "RVS-DEL-AGR", language: "ta", rating: 4, date: "2026-08-25", headline: "குடும்பப் பயணத்திற்கு ஏற்றது",
    comment: "டெல்லியில் இருந்து ஆக்ரா வரை எக்ஸ்பிரஸ்வே பயணம் வசதியாக இருந்தது. காலை உணவுக்கு நிறுத்திய உணவகம் சுத்தமாக இருந்தது. பெரியவர்களிடம் பணியாளர்கள் அன்பாக நடந்துகொண்டனர்." },
  { route: "RVS-MUM-PUN", language: "ta", rating: 2, date: "2026-07-27", headline: "நெரிசலான நிறுத்தம்",
    comment: "தானே நிறுத்தத்தில் பேருந்து மிகவும் நெரிசலாக இருந்தது. பைகளை வைக்க இடமில்லை. இருக்கை கிடைத்தாலும் ஏசி குளிர்ச்சி குறைவாக இருந்தது." },
];

// Hand-written sample routes (kept as written) and the catalog buses that receive generated reviews.
const CURATED_BUSES = [...BUSES, ...EXTRA_BUSES];
const CURATED_REVIEWS = [...REVIEWS, ...EXTRA_REVIEWS, ...MORE_REVIEWS];
// Community travelers keep the same order and count as before, each with a unique picture.
const COMMUNITY_TRAVELERS = [...CURATED_TRAVELERS, ...EXTRA_TRAVELERS].map((t, index) => ({ ...t, avatar: buildPicture(t.name, 90000 + index) }));

// Inserts in batches so a large sample does not build one giant request.
async function insertInBatches(collection, docs, size = 500) {
  for (let start = 0; start < docs.length; start += size) {
    await collection.insertMany(docs.slice(start, start + size), { ordered: false });
  }
}

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/redbus_db";
  await mongoose.connect(uri);
  console.log(`[Seed] connected to database "${mongoose.connection.name}" on ${mongoose.connection.host}`);

  // Remove only earlier sample data.
  const previous = await Booking.find({ pnr: /^RVS/ }).select("_id").lean();
  await Review.deleteMany({ booking: { $in: previous.map((b) => b._id) } });
  await Booking.deleteMany({ pnr: /^RVS/ });
  await Customer.deleteMany({ email: new RegExp(`@${SAMPLE_DOMAIN.replace(/\./g, "\\.")}$`) });

  const { buses: catalogBuses } = buildCatalog();
  const allBuses = [...CURATED_BUSES, ...catalogBuses];
  const sample = buildReviewSample({ allBuses, catalogBuses, curatedReviews: CURATED_REVIEWS });

  // Upsert buses so their ids stay stable across re-seeding.
  await Bus.bulkWrite(allBuses.map((bus) => ({
    updateOne: { filter: { busNumber: bus.busNumber }, update: { $set: bus }, upsert: true },
  })));
  const busDocs = await Bus.find({ busNumber: { $in: allBuses.map((b) => b.busNumber) } }).select("_id busNumber").lean();
  const busId = new Map(busDocs.map((b) => [b.busNumber, b._id]));
  const busInfo = new Map(allBuses.map((b) => [b.busNumber, b]));

  // Refuse to insert if a generated traveler would clash with a community author (see the googleId error).
  const communityKeys = new Set(COMMUNITY_TRAVELERS.flatMap((t) => [t.googleId, t.email]));
  for (const t of sample.travelers) {
    if (communityKeys.has(t.googleId) || communityKeys.has(t.email)) {
      throw new Error(`sample reviewer ${t.email} clashes with a community author`);
    }
  }

  // Travelers: give each one an id up front so reviews can point at them.
  const travelerIds = sample.travelers.map(() => new mongoose.Types.ObjectId());
  const travelerDocs = sample.travelers.map((t, i) => ({ _id: travelerIds[i], ...t }));
  await Customer.collection.insertMany(travelerDocs.map((t) => ({
    ...t,
    notificationPreferences: { channels: { email: true, push: false, sms: false }, eventSubscriptions: { bookingUpdates: true, scheduleChanges: true, journeyReminders: true, promotions: true }, preferredLanguage: "en" },
    bio: "Sample traveler.",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  })), { ordered: false });

  const bookingDocs = [];
  const reviewDocs = [];
  sample.reviews.forEach((r, i) => {
    const traveler = sample.travelers[r.traveler];
    const bus = busInfo.get(r.busNumber);
    const customerId = travelerIds[r.traveler];
    const bookingId = new mongoose.Types.ObjectId();
    const busObjectId = busId.get(r.busNumber);

    bookingDocs.push({
      _id: bookingId,
      pnr: `RVS${String(i + 1).padStart(6, "0")}`,
      customer: customerId,
      bus: busObjectId,
      departureCity: bus.departureCity,
      destinationCity: bus.destinationCity,
      journeyDate: r.journeyDate,
      seatsBooked: [r.seat],
      passengers: [{ name: traveler.name, gender: traveler.gender, age: traveler.age, seatNumber: r.seat }],
      discountAmount: 0,
      totalFare: bus.fare,
      bookingStatus: "Completed",
      completedAt: r.journeyDate,
      createdAt: r.journeyDate,
      updatedAt: r.journeyDate,
      __v: 0,
    });

    reviewDocs.push({
      _id: new mongoose.Types.ObjectId(),
      customer: customerId,
      bus: busObjectId,
      booking: bookingId,
      departureCity: bus.departureCity,
      destinationCity: bus.destinationCity,
      rating: r.rating,
      language: r.language,
      headline: r.headline,
      comment: r.comment,
      helpfulVotes: r.helpful.map((idx) => travelerIds[idx]),
      status: "active",
      reportCount: 0,
      reportHistory: [],
      editableUntil: new Date(r.createdAt.getTime() + 24 * 60 * 60 * 1000),
      createdAt: r.createdAt,
      updatedAt: r.createdAt,
      __v: 0,
    });
  });

  await insertInBatches(Booking.collection, bookingDocs);
  await insertInBatches(Review.collection, reviewDocs);

  // Recalculate each bus rating from its active reviews.
  const stats = await Review.aggregate([
    { $match: { status: "active" } },
    { $group: { _id: "$bus", average: { $avg: "$rating" } } },
  ]);
  await Bus.bulkWrite(stats.map((s) => ({
    updateOne: { filter: { _id: s._id }, update: { $set: { rating: Number(s.average.toFixed(1)) } } },
  })));

  const storedReviews = await Review.countDocuments({ status: "active" });
  const storedTravelers = await Customer.countDocuments({ email: new RegExp(`@${SAMPLE_DOMAIN.replace(/\./g, "\\.")}$`) });
  console.log(`[Seed] ${allBuses.length} buses (${catalogBuses.length} catalog), ${storedTravelers} sample travelers, ${sample.reviews.length} reviews written.`);
  console.log(`[Seed] Database now holds ${storedReviews} active reviews.`);
  await mongoose.disconnect();
}

module.exports = { BUSES: CURATED_BUSES, REVIEWS: CURATED_REVIEWS, TRAVELERS: COMMUNITY_TRAVELERS };

if (require.main === module) {
  seed().catch(async (error) => {
    console.error("[Seed] failed:", error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
}
