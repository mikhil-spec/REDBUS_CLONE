// Additional sample data for the reviews, routes and travelers seeded by seed-reviews.js.
// Traveler indexes continue from the eight travelers defined in seed-reviews.js (indexes 8 to 19 here).

// Generated sample picture: a distinct colour and shape for every traveler, with initials.
// These are illustrations, not photographs.
function buildAvatar(name, index) {
  const hue = Math.round((index * 137.508) % 360);
  const color = `hsl(${hue}, 62%, 46%)`;
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const shapes = [
    `<circle cx="32" cy="32" r="30" fill="${color}"/>`,
    `<rect x="2" y="2" width="60" height="60" rx="16" fill="${color}"/>`,
    `<polygon points="32,2 62,17 62,47 32,62 2,47 2,17" fill="${color}"/>`,
  ];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${shapes[index % 3]}` +
    `<text x="32" y="39" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff">${initials}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const EXTRA_BUSES = [
  { busNumber: "RVS-JAI-AGR", busName: "Rajputana Rover", busType: "AC Seater", companyName: "RedBus Sample Travels",
    totalSeats: 36, availableSeats: 36, fare: 420, departureTime: "07:30", arrivalTime: "12:30", departureCity: "jaipur", destinationCity: "agra" },
  { busNumber: "RVS-DEL-CHD", busName: "Punjab Sleeper", busType: "AC Sleeper", companyName: "RedBus Sample Travels",
    totalSeats: 30, availableSeats: 30, fare: 1000, departureTime: "22:00", arrivalTime: "06:00", departureCity: "delhi", destinationCity: "chandigarh" },
  { busNumber: "RVS-BLR-CHE", busName: "Silk Route Express", busType: "Volvo Multi-Axle", companyName: "RedBus Sample Travels",
    totalSeats: 40, availableSeats: 40, fare: 700, departureTime: "21:30", arrivalTime: "05:30", departureCity: "bangalore", destinationCity: "chennai" },
  { busNumber: "RVS-HYD-VIJ", busName: "Krishna Connect", busType: "AC Seater", companyName: "RedBus Sample Travels",
    totalSeats: 38, availableSeats: 38, fare: 500, departureTime: "08:00", arrivalTime: "13:00", departureCity: "hyderabad", destinationCity: "vijayawada" },
  { busNumber: "RVS-MUM-NAS", busName: "Sahyadri Express", busType: "Non-AC Seater", companyName: "RedBus Sample Travels",
    totalSeats: 42, availableSeats: 42, fare: 300, departureTime: "06:30", arrivalTime: "10:30", departureCity: "mumbai", destinationCity: "nashik" },
  { busNumber: "RVS-PUN-MAH", busName: "Hill Station Rider", busType: "AC Seater", companyName: "RedBus Sample Travels",
    totalSeats: 34, availableSeats: 34, fare: 480, departureTime: "07:00", arrivalTime: "10:30", departureCity: "pune", destinationCity: "mahabaleshwar" },
  { busNumber: "RVS-CHE-MAD", busName: "Pandiyan Express", busType: "AC Sleeper", companyName: "RedBus Sample Travels",
    totalSeats: 32, availableSeats: 32, fare: 850, departureTime: "21:00", arrivalTime: "05:00", departureCity: "chennai", destinationCity: "madurai" },
];

const EXTRA_TRAVELERS = [
  { name: "Ritu Sharma", email: "ritu.sharma@review-sample.redbus", googleId: "sample-review-09", phone: "9000010009", gender: "Female", age: 27, isVerified: true, role: "traveler" },
  { name: "Imran Khan", email: "imran.khan@review-sample.redbus", googleId: "sample-review-10", phone: "9000010010", gender: "Male", age: 36, isVerified: true, role: "traveler" },
  { name: "Lakshmi Narayanan", email: "lakshmi.narayanan@review-sample.redbus", googleId: "sample-review-11", phone: "9000010011", gender: "Female", age: 45, isVerified: true, role: "traveler" },
  { name: "Deepak Joshi", email: "deepak.joshi@review-sample.redbus", googleId: "sample-review-12", phone: "9000010012", gender: "Male", age: 31, isVerified: true, role: "traveler" },
  { name: "Sneha Patil", email: "sneha.patil@review-sample.redbus", googleId: "sample-review-13", phone: "9000010013", gender: "Female", age: 24, isVerified: true, role: "traveler" },
  { name: "Mohammed Faiz", email: "mohammed.faiz@review-sample.redbus", googleId: "sample-review-14", phone: "9000010014", gender: "Male", age: 42, isVerified: true, role: "traveler" },
  { name: "Anjali Desai", email: "anjali.desai@review-sample.redbus", googleId: "sample-review-15", phone: "9000010015", gender: "Female", age: 38, isVerified: true, role: "traveler" },
  { name: "Kiran Kumar", email: "kiran.kumar@review-sample.redbus", googleId: "sample-review-16", phone: "9000010016", gender: "Male", age: 29, isVerified: true, role: "traveler" },
  { name: "Ravi Teja", email: "ravi.teja@review-sample.redbus", googleId: "sample-review-17", phone: "9000010017", gender: "Male", age: 33, isVerified: true, role: "traveler" },
  { name: "Gurpreet Kaur", email: "gurpreet.kaur@review-sample.redbus", googleId: "sample-review-18", phone: "9000010018", gender: "Female", age: 35, isVerified: true, role: "traveler" },
  { name: "Thomas George", email: "thomas.george@review-sample.redbus", googleId: "sample-review-19", phone: "9000010019", gender: "Male", age: 50, isVerified: true, role: "traveler" },
  { name: "Sunita Devi", email: "sunita.devi@review-sample.redbus", googleId: "sample-review-20", phone: "9000010020", gender: "Female", age: 60, isVerified: true, role: "traveler" },
];

// route: busNumber; traveler: index; language: en | hi | te | ta; helpful: traveler indexes who found it helpful.
const EXTRA_REVIEWS = [
  // English
  { route: "RVS-JAI-AGR", traveler: 8, language: "en", rating: 4, date: "2026-06-18", headline: "Quick drive to the Taj city",
    comment: "The drive from Jaipur to Agra took about five hours with one tea stop. The seat was comfortable and there was room for two suitcases in the luggage bay.", helpful: [0, 3] },
  { route: "RVS-DEL-CHD", traveler: 9, language: "en", rating: 5, date: "2026-06-22", headline: "Smooth night run to Chandigarh",
    comment: "We boarded at Kashmere Gate exactly on time. The sleeper berth was wide enough to turn over, and the driver kept a steady lane all night.", helpful: [1, 5, 8] },
  { route: "RVS-BLR-CHE", traveler: 10, language: "en", rating: 2, date: "2026-06-25", headline: "Charging point never worked",
    comment: "I booked the window sleeper for the charging point, but it did not work for the whole journey. The staff promised to check at the next stop and never did.", helpful: [4] },
  { route: "RVS-HYD-VIJ", traveler: 11, language: "en", rating: 4, date: "2026-06-29", headline: "Clean washroom at the halt",
    comment: "The halt near Nandigama had a clean washroom and fresh drinking water. The bus left Hyderabad ten minutes late, which did not matter for our schedule.", helpful: [2] },
  { route: "RVS-MUM-NAS", traveler: 12, language: "en", rating: 3, date: "2026-07-02", headline: "Pickup point was hard to find",
    comment: "The app showed the boarding point as a petrol pump, but the bus stopped a few hundred metres away. The driver waited patiently, yet a landmark photo would have saved time.", helpful: [] },
  { route: "RVS-PUN-MAH", traveler: 13, language: "en", rating: 5, date: "2026-07-05", headline: "Perfect weekend trip up the ghats",
    comment: "A comfortable AC seater with a gentle climb up the ghat road. The conductor warned us about fog near the top, which was very helpful for planning the photo stops.", helpful: [0, 6] },
  { route: "RVS-DEL-AGR", traveler: 14, language: "en", rating: 1, date: "2026-07-09", headline: "Booking cancelled without notice",
    comment: "My booking showed as confirmed, but the bus did not arrive and the operator sent no message. Customer care took three days to process my refund.", helpful: [3, 9] },
  { route: "RVS-CHE-MAD", traveler: 15, language: "en", rating: 4, date: "2026-07-12", headline: "Early morning arrival in Madurai",
    comment: "We reached Madurai before sunrise, which suited the temple visit well. The seats are a little narrow for tall passengers, but the ride itself was smooth.", helpful: [1] },
  { route: "RVS-BLR-HYD", traveler: 16, language: "en", rating: 5, date: "2026-07-15", headline: "Reliable on every trip",
    comment: "I have used this route for work for eight months. The bus has never been more than five minutes late, and the departure alerts have been accurate every time.", helpful: [0, 2, 10] },
  { route: "RVS-JAI-AGR", traveler: 17, language: "en", rating: 3, date: "2026-07-19", headline: "Too many stops for a short route",
    comment: "The bus stopped four times between Jaipur and Agra to pick up people from the highway. The trip took much longer than the timetable suggested.", helpful: [5] },
  { route: "RVS-DEL-CHD", traveler: 18, language: "en", rating: 4, date: "2026-07-24", headline: "Warm blankets on a cold night",
    comment: "It was a December night and the blankets were warm and clean. The dinner stop had good food. I would take this bus again in winter.", helpful: [7, 9] },
  { route: "RVS-MUM-PUN", traveler: 19, language: "en", rating: 5, date: "2026-07-28", headline: "Comfortable for older travellers",
    comment: "I travelled with my mother, who is 78. The staff helped us board, the seat reclined easily, and the driver took the corners slowly. Excellent service throughout.", helpful: [0, 1, 4, 12] },
  // Hindi
  { route: "RVS-JAI-AGR", traveler: 8, language: "hi", rating: 4, date: "2026-06-16", headline: "ठीक समय और साफ बस",
    comment: "जयपुर से आगरा का सफर लगभग पांच घंटे में पूरा हुआ। बस साफ थी और सामान रखने की जगह भी काफी थी।", helpful: [2] },
  { route: "RVS-HYD-VIJ", traveler: 9, language: "hi", rating: 5, date: "2026-06-21", headline: "परिवार के लिए सुरक्षित सफर",
    comment: "रात का सफर था, पर ड्राइवर बहुत संभलकर चला रहा था। बच्चों के लिए सीट आरामदायक थी और नींद अच्छी आई।", helpful: [0, 3] },
  { route: "RVS-BLR-CHE", traveler: 12, language: "hi", rating: 2, date: "2026-06-27", headline: "टोल पर लंबा इंतजार",
    comment: "टोल प्लाज़ा पर बस बीस मिनट रुकी रही और किसी ने कारण नहीं बताया। इससे पूरा शेड्यूल बिगड़ गया।", helpful: [6] },
  { route: "RVS-MUM-NAS", traveler: 11, language: "hi", rating: 4, date: "2026-07-01", headline: "सुबह की ठंडी हवा में सफर",
    comment: "नासिक तक का सफर सुबह की ठंडी हवा में बहुत सुहाना लगा। पहाड़ी रास्तों पर ड्राइवर धीरे और सावधानी से चला।", helpful: [1] },
  { route: "RVS-DEL-CHD", traveler: 14, language: "hi", rating: 3, date: "2026-07-06", headline: "सामान रखने में दिक्कत",
    comment: "बड़ी ट्रॉली बैग के लिए जगह कम थी, इसलिए कंडक्टर ने उसे डिक्की में रखने को कहा। अच्छा हुआ कि यह पहले से बताया गया।", helpful: [] },
  { route: "RVS-CHE-MAD", traveler: 17, language: "hi", rating: 5, date: "2026-07-10", headline: "शानदार बस सेवा",
    comment: "मदुरै तक का सफर बहुत अच्छा रहा। बस में वाई-फाई नहीं था, पर सीट और एसी दोनों ठीक थे और स्टाफ बहुत विनम्र था।", helpful: [4, 13] },
  { route: "RVS-PUN-MAH", traveler: 16, language: "hi", rating: 4, date: "2026-07-14", headline: "पहाड़ों के लिए अच्छी बस",
    comment: "महाबलेश्वर की चढ़ाई वाली सड़क पर बस स्थिर रही। कुछ सीटें पीछे की तरफ थोड़ी असहज थीं।", helpful: [7] },
  { route: "RVS-DEL-AGR", traveler: 19, language: "hi", rating: 5, date: "2026-07-17", headline: "बुजुर्गों के लिए आरामदायक",
    comment: "मेरी मां के साथ यात्रा की। कंडक्टर ने चढ़ने में मदद की और सीट आसानी से पीछे झुक गई।", helpful: [0, 8] },
  { route: "RVS-BLR-HYD", traveler: 13, language: "hi", rating: 4, date: "2026-07-21", headline: "समय पर पहुंचे",
    comment: "बैंगलोर से हैदराबाद की बस समय पर चली और आधी रात से पहले पहुंच गई। बोर्डिंग पॉइंट ढूंढने में थोड़ी मुश्किल हुई।", helpful: [2, 5] },
  { route: "RVS-HYD-VIJ", traveler: 15, language: "hi", rating: 3, date: "2026-07-26", headline: "सीट पर पानी की बोतल",
    comment: "रास्ते में पानी की बोतल कुछ देर बाद खत्म हो गई और दोबारा नहीं दी गई। बाकी सफर साफ-सुथरा था।", helpful: [] },
  // Telugu
  { route: "RVS-HYD-VIJ", traveler: 15, language: "te", rating: 5, date: "2026-06-17", headline: "సమయానికి బయలుదేరిన బస్సు",
    comment: "హైదరాబాద్ నుండి విజయవాడ వరకు బస్సు షెడ్యూల్ ప్రకారం బయలుదేరింది. కృష్ణా నది దగ్గర ఆగిన ప్రదేశం చాలా శుభ్రంగా ఉంది.", helpful: [0, 1] },
  { route: "RVS-BLR-CHE", traveler: 3, language: "te", rating: 3, date: "2026-06-23", headline: "బస్సు కొంత ఆలస్యం",
    comment: "బెంగళూరు నుండి చెన్నై వెళ్లే బస్సు ముప్పై నిమిషాలు ఆలస్యంగా బయలుదేరింది. డ్రైవర్ సౌకర్యంగా నడిపాడు, కానీ సమాచారం ముందే ఇవ్వలేదు.", helpful: [9] },
  { route: "RVS-PUN-MAH", traveler: 13, language: "te", rating: 4, date: "2026-06-30", headline: "కొండ రోడ్డులో సురక్షిత ప్రయాణం",
    comment: "మహాబలేశ్వర్ ఘాట్ రోడ్డుపై డ్రైవర్ చాలా జాగ్రత్తగా నడిపాడు. ఎక్కడా ఆపకుండా సాఫీగా చేరుకున్నాం.", helpful: [4] },
  { route: "RVS-DEL-JAI", traveler: 16, language: "te", rating: 4, date: "2026-07-03", headline: "రాత్రి ప్రయాణానికి మంచి సీటు",
    comment: "స్లీపర్ బెర్త్ పొడవుగా ఉంది, దుప్పటి వెచ్చగా ఉంది. తెల్లవారుజామున జైపూర్ చేరుకున్నప్పుడు ఫ్రెష్‌గా అనిపించింది.", helpful: [2] },
  { route: "RVS-CHE-PON", traveler: 15, language: "te", rating: 2, date: "2026-07-07", headline: "పేలవమైన వెయిటింగ్ ఏరియా",
    comment: "పాండిచ్చేరి బస్ స్టాప్‌లో కూర్చోడానికి చోటు లేదు, నీడ కూడా లేదు. బస్సు ఆలస్యం అయినప్పుడు ఇది చాలా ఇబ్బందిగా అనిపించింది.", helpful: [11] },
  { route: "RVS-HYD-VIJ", traveler: 3, language: "te", rating: 5, date: "2026-07-11", headline: "అద్భుతమైన ఆతిథ్యం",
    comment: "సిబ్బంది ప్రతి ప్రయాణికుడికీ సహాయం చేశారు. పిల్లలకు నీళ్లు, ఫోన్ చార్జింగ్ పాయింట్ కూడా బాగా పనిచేసింది.", helpful: [0, 6, 13] },
  { route: "RVS-DEL-AGR", traveler: 13, language: "te", rating: 3, date: "2026-07-16", headline: "ఎయిర్‌కండిషన్ బలహీనంగా ఉంది",
    comment: "ఆగ్రా వెళ్లే బస్సులో వెనుక సీట్లలో ఏసీ చల్లదనం తక్కువగా ఉంది. మిగతా ప్రయాణం బాగుంది.", helpful: [] },
  { route: "RVS-CHE-MAD", traveler: 16, language: "te", rating: 5, date: "2026-07-22", headline: "సమయానికి మదురై",
    comment: "చెన్నై నుండి మదురై వరకు బస్సు సమయానికి చేరింది. చిన్న టీ స్టాప్‌లో ప్రదేశం శుభ్రంగా ఉంది.", helpful: [1, 14] },
  { route: "RVS-JAI-AGR", traveler: 3, language: "te", rating: 4, date: "2026-07-27", headline: "సులభమైన టికెట్ బుకింగ్",
    comment: "యాప్‌లో టికెట్ బుక్ చేయడం చాలా సులభం. సీట్ ఎంపిక స్పష్టంగా కనిపించింది, చెల్లింపు కూడా వేగంగా జరిగింది.", helpful: [5] },
  // Tamil
  { route: "RVS-BLR-CHE", traveler: 10, language: "ta", rating: 5, date: "2026-06-15", headline: "சென்னை பயணம் மிகச் சிறப்பு",
    comment: "பெங்களூரில் இருந்து சென்னை வரை பயணம் வசதியாக இருந்தது. இருக்கைகள் சுத்தமாகவும், பணியாளர்கள் மரியாதையாகவும் நடந்துகொண்டனர்.", helpful: [0, 4] },
  { route: "RVS-CHE-PON", traveler: 2, language: "ta", rating: 4, date: "2026-06-20", headline: "கடற்கரை சாலை அழகு",
    comment: "சென்னையிலிருந்து பாண்டிச்சேரி வரை கடற்கரை சாலையின் காட்சி அழகாக இருந்தது. பேருந்து சுத்தமாக இருந்தது, ஆனால் ஏசி கொஞ்சம் குறைவாக இருந்தது.", helpful: [8] },
  { route: "RVS-HYD-VIJ", traveler: 6, language: "ta", rating: 4, date: "2026-06-26", headline: "விஜயவாடா வழித்தடம் எளிது",
    comment: "ஹைதராபாத்தில் இருந்து விஜயவாடாவுக்கு பயணம் நேரத்திற்கு முடிந்தது. வழியில் ஒரு நல்ல உணவகத்தில் நிறுத்தினார்கள்.", helpful: [3] },
  { route: "RVS-MUM-PUN", traveler: 4, language: "ta", rating: 2, date: "2026-07-04", headline: "பேருந்தில் கூட்டம் அதிகம்",
    comment: "தானே நிறுத்தத்தில் கூட்டம் அதிகமாக இருந்தது, பைகளை வைக்க இடமில்லை. இருக்கை கிடைத்தாலும் நெருக்கடி அதிகம்.", helpful: [7] },
  { route: "RVS-DEL-CHD", traveler: 2, language: "ta", rating: 5, date: "2026-07-08", headline: "குளிர்கால இரவுப் பயணம்",
    comment: "டிசம்பர் குளிர் இரவில் போர்வை சூடாகவும் சுத்தமாகவும் இருந்தது. ஓட்டுநர் வளைவுகளில் மெதுவாக ஓட்டினார்.", helpful: [0, 9] },
  { route: "RVS-PUN-MAH", traveler: 6, language: "ta", rating: 4, date: "2026-07-13", headline: "மலைப் பயணத்தில் நல்ல அனுபவம்",
    comment: "மகாபலேஸ்வர் பயணத்தில் பேருந்து நிலையாக ஓடியது. இறங்கும் இடத்தில் ஆட்டோக்கள் எளிதாகக் கிடைத்தன.", helpful: [2] },
  { route: "RVS-JAI-AGR", traveler: 10, language: "ta", rating: 3, date: "2026-07-18", headline: "பயண நேரம் கூடுதல்",
    comment: "ஜெய்ப்பூரில் இருந்து ஆக்ரா வரை பேருந்து நான்கு முறை நிறுத்தியது. அட்டவணையில் சொன்னதை விட பயணம் நீண்டது.", helpful: [] },
  { route: "RVS-CHE-MAD", traveler: 4, language: "ta", rating: 5, date: "2026-07-23", headline: "காலை நேர பயணம் அருமை",
    comment: "சூரிய உதயத்திற்கு முன் மதுரை சென்றடைந்தோம். கோவில் தரிசனத்திற்கு ஏற்ற நேரம். பேருந்து மென்மையாக ஓடியது.", helpful: [1, 12] },
  { route: "RVS-DEL-AGR", traveler: 2, language: "ta", rating: 1, date: "2026-07-29", headline: "டிக்கெட் ரத்து குறித்த தாமதம்",
    comment: "எனது முன்பதிவு உறுதியாக காட்டப்பட்டது, ஆனால் பேருந்து வரவில்லை. பணத்தைத் திரும்பப் பெற மூன்று நாட்கள் ஆனது.", helpful: [5, 11] },
];

module.exports = { buildAvatar, EXTRA_BUSES, EXTRA_TRAVELERS, EXTRA_REVIEWS };
