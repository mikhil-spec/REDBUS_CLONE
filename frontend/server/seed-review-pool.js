// Deterministic sample reviews for every bus. Pure data: no database is needed to build it.
//
// Guarantees, all checked when the sample is built (the build throws if one fails):
//   - every review has its own traveler (no traveler writes two reviews)
//   - every traveler has a different picture, email, phone and Google id
//   - every review has a different timestamp, headline and comment
//   - every bus that appears in the catalog has at least two reviews
//   - all four languages and all five star ratings are present

const SAMPLE_DOMAIN = "reviewers.redbus-sample"; // generated reviewers only
const BASE_TIME = Date.UTC(2026, 4, 1); // 1 May 2026
const SPAN_MS = 150 * 24 * 60 * 60 * 1000; // reviews spread over 150 days
const LANGS = ["en", "hi", "te", "ta"];

function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- Travelers --------------------------------------------------------------
const MALE_FIRST = ["Aarav", "Vivek", "Rohan", "Karthik", "Imran", "Sanjay", "Ravi", "Harish", "Manoj", "Deepak",
  "Anil", "Nikhil", "Tarun", "Vishal", "Arun", "Mohan", "Suresh", "Ajay", "Pradeep", "Gaurav", "Rakesh", "Naveen",
  "Kiran", "Srinivas", "Venkat", "Prakash", "Ramesh", "Dinesh", "Hemant", "Yash"];
const FEMALE_FIRST = ["Anjali", "Sneha", "Meera", "Kavita", "Neha", "Pooja", "Divya", "Lakshmi", "Sunita", "Radha",
  "Shalini", "Nandini", "Ananya", "Ritu", "Swati", "Madhavi", "Padma", "Sarita", "Geeta", "Asha", "Bhavya", "Tanvi",
  "Shreya", "Aishwarya", "Zoya", "Ishita", "Kriti", "Usha", "Vani", "Harini"];
const SURNAMES = ["Verma", "Mehta", "Iyer", "Reddy", "Kumari", "Nair", "Rao", "Singh", "Gupta", "Sharma", "Patel",
  "Joshi", "Kulkarni", "Deshpande", "Pillai", "Menon", "Krishnan", "Subramanian", "Raman", "Naidu", "Chowdhury",
  "Banerjee", "Das", "Ghosh", "Sen", "Mukherjee", "Bose", "Agarwal", "Jain", "Bansal", "Malhotra", "Kapoor", "Khanna",
  "Chopra", "Arora", "Saxena", "Mishra", "Tiwari", "Pandey", "Dubey", "Yadav", "Chauhan", "Thakur", "Rathore", "Bhatt",
  "Shah", "Desai", "Trivedi", "Pawar", "Jadhav", "Gaikwad", "Shetty", "Hegde", "Kamath", "Prabhu", "Gowda", "Bhat",
  "Lal", "Ahuja", "Sethi", "Mandal", "Dutta", "Rawat", "Bisht", "Negi", "Sood", "Dhar", "Kaul", "Wadhwa"];
const FIRST_NAMES = [...MALE_FIRST.map((n) => [n, "Male"]), ...FEMALE_FIRST.map((n) => [n, "Female"])];

function travelerFor(index) {
  const [first, gender] = FIRST_NAMES[index % FIRST_NAMES.length];
  const last = SURNAMES[Math.floor(index / FIRST_NAMES.length) % SURNAMES.length];
  const name = `${first} ${last}`;
  const slug = `${first}.${last}`.toLowerCase();
  return {
    name,
    email: `${slug}.${index}@${SAMPLE_DOMAIN}`,
    googleId: `sample-reviewer-${index}`, // unique prefix: earlier seeders used sample-review-NN
    phone: `9${String(100000000 + index)}`,
    gender,
    age: 21 + ((index * 7919) % 39),
    isVerified: true,
    role: "traveler",
    avatar: buildPicture(name, index),
  };
}

// A picture unique to the traveler: colour, decorative shapes and initials all come from the index.
function buildPicture(name, index) {
  const rnd = mulberry32(index * 2654435761 + 97);
  const hue = Math.round((index * 137.508) % 360);
  const hue2 = (hue + 35 + Math.floor(rnd() * 140)) % 360;
  const circles = [0, 1, 2].map(() => {
    const cx = (rnd() * 64).toFixed(2);
    const cy = (rnd() * 64).toFixed(2);
    const r = (6 + rnd() * 20).toFixed(2);
    const light = 35 + Math.floor(rnd() * 35);
    const opacity = (0.35 + rnd() * 0.5).toFixed(2);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="hsl(${hue2}, 70%, ${light}%)" opacity="${opacity}"/>`;
  }).join("");
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<defs><clipPath id="c"><circle cx="32" cy="32" r="31"/></clipPath></defs>` +
    `<g clip-path="url(#c)"><rect width="64" height="64" fill="hsl(${hue}, 62%, 46%)"/>${circles}</g>` +
    `<text x="32" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff">${initials}</text></svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

// ---- Review text ------------------------------------------------------------
// Placeholders: {from} {to} {time} {bus}. Each language has openers x aspects x closers per sentiment.
const PHRASES = {
  en: {
    pos: {
      open: ["The {from} to {to} trip on {bus} was smooth from start to finish.", "I took {bus} from {from} to {to} and was pleasantly surprised.", "Booked the {time} departure from {from} on a whim and it paid off.", "This {bus} service between {from} and {to} runs very well.", "Travelling {from} to {to} on {bus} felt effortless.", "Our family used {bus} for the {from} to {to} route and we are happy."],
      aspect: ["The seats were clean and the cabin stayed comfortable all night.", "The driver kept a steady pace and braked gently throughout.", "Staff were polite and helped with luggage at every stop.", "Charging points worked and the reading lights were bright.", "The washroom was clean and the bus stopped at a decent restaurant.", "Boarding was quick and the seat numbers matched the ticket."],
      close: ["It left at {time} as scheduled and reached on time.", "I would happily book this bus again on the {from} to {to} route.", "Good value for the fare, and the confirmation message arrived instantly.", "Recommended for anyone travelling {from} to {to} with a family.", "Arrived well rested, which is all I wanted from an overnight trip.", "The {time} departure was on time and the app updates were accurate."],
    },
    mix: {
      open: ["The {bus} journey from {from} to {to} was decent overall.", "An average ride on {bus} between {from} and {to}.", "The {time} service from {from} was fine, with a few gaps.", "Took {bus} to {to} and the trip was mostly acceptable.", "The {from} to {to} run on {bus} had its ups and downs.", "Used {bus} on the {from} to {to} route; the experience was mixed."],
      aspect: ["The seats were comfortable but the recline was limited.", "The AC was strong near the front but weak at the back.", "The driver was careful, though the bus stopped for a long break mid-route.", "Boarding took longer than expected at the pickup point.", "The window seats did not close fully and let in some dust.", "Cleanliness was fine, but the washroom needed attention."],
      close: ["It was not bad for the price, but there is room to improve.", "Departure at {time} was close to schedule, with a small delay.", "Customer support answered my query, which I appreciated.", "I might book again if the fare is lower.", "Reached {to} safely, just not as comfortably as I hoped.", "Overall acceptable for a short trip from {from}."],
    },
    neg: {
      open: ["Disappointing trip on {bus} from {from} to {to}.", "The {time} departure from {from} did not go well.", "I would not recommend {bus} on the {from} to {to} route.", "Our journey with {bus} from {from} was frustrating.", "The {bus} service between {from} and {to} let us down.", "Expected more from {bus}; the {from} to {to} trip was poor."],
      aspect: ["The bus was late and no reason was given to passengers.", "The seats were worn and the recline did not work.", "The AC stopped working for a long stretch of the night.", "The driver stopped repeatedly without explanation.", "The washroom was not cleaned before the trip.", "Boarding was chaotic and the seat allotment was wrong."],
      close: ["Customer support was slow to respond to my complaint.", "I hope the operator fixes these issues before the next trip.", "Refund and rescheduling took much longer than promised.", "I will look for another operator for the {from} to {to} route.", "Next time I will read reviews before booking this bus.", "The fare was not worth the experience at all."],
    },
  },
  hi: {
    pos: {
      open: ["{from} से {to} तक {bus} का सफर शुरू से अंत तक आसान रहा।", "मैंने {from} से {to} के लिए {bus} लिया और बहुत अच्छा लगा।", "{from} से {time} वाली बस बुक की और यह फैसला सही निकला।", "{from} और {to} के बीच यह बस सेवा बहुत अच्छी चलती है।", "{bus} से {from} से {to} जाना बिल्कुल सहज लगा।", "हमारे परिवार ने {from}–{to} मार्ग पर {bus} चुनी और हम खुश हैं।"],
      aspect: ["सीटें साफ थीं और पूरी रात केबिन आरामदायक रहा।", "ड्राइवर ने स्थिर गति रखी और ब्रेक भी धीरे लगाए।", "स्टाफ विनम्र था और हर पड़ाव पर सामान उठाने में मदद की।", "चार्जिंग पॉइंट चले और रीडिंग लाइट भी अच्छी थी।", "वॉशरूम साफ था और बस एक अच्छे ढाबे पर रुकी।", "बोर्डिंग जल्दी हुई और सीट नंबर टिकट से मेल खाते थे।"],
      close: ["बस {time} पर समय से चली और समय पर पहुंच गई।", "{from} से {to} के इस मार्ग पर मैं इसे फिर से बुक करूंगा।", "किराए के हिसाब से अच्छी कीमत, और पुष्टि संदेश तुरंत आ गया।", "{from} से {to} परिवार के साथ सफर करने वालों के लिए अच्छी बस है।", "रात भर के सफर के बाद अच्छी नींद के साथ पहुंचे।", "{time} का प्रस्थान समय सही रहा और ऐप की सूचनाएं भी सही थीं।"],
    },
    mix: {
      open: ["{from} से {to} तक {bus} का सफर ठीक-ठाक रहा।", "{bus} से {from} और {to} के बीच औसत अनुभव रहा।", "{from} से {time} वाली सेवा ठीक थी, कुछ कमियां भी थीं।", "{to} तक {bus} से गए, यात्रा ज़्यादातर स्वीकार्य रही।", "{from}–{to} मार्ग पर {bus} के अनुभव में उतार-चढ़ाव रहे।", "{bus} से {from}–{to} का सफर मिला-जुला रहा।"],
      aspect: ["सीटें आरामदायक थीं, पर रिक्लाइन सीमित था।", "आगे की तरफ एसी ठीक था, पीछे की सीटों पर कमजोर।", "ड्राइवर सावधान था, पर बीच रास्ते में बस देर तक रुकी।", "पिकअप पॉइंट पर बोर्डिंग में उम्मीद से ज़्यादा समय लगा।", "खिड़की की सीटों का शीशा पूरा बंद नहीं होता था।", "सफाई ठीक थी, पर वॉशरूम पर ध्यान देने की ज़रूरत है।"],
      close: ["कीमत के हिसाब से ठीक है, पर सुधार की गुंजाइश है।", "{time} पर प्रस्थान लगभग समय पर रहा, थोड़ी देरी हुई।", "ग्राहक सहायता ने मेरे सवाल का जवाब दिया, यह अच्छा लगा।", "किराया कम हो तो फिर से बुक कर सकता हूं।", "{to} सुरक्षित पहुंचे, बस उतनी आरामदायक नहीं थी जितनी उम्मीद थी।", "{from} से छोटे सफर के लिए ठीक-ठाक विकल्प है।"],
    },
    neg: {
      open: ["{bus} से {from} से {to} का सफर निराशाजनक रहा।", "{from} से {time} की रवानगी ठीक नहीं रही।", "{from} से {to} मार्ग पर {bus} की सिफारिश नहीं करूंगा।", "{from} से {bus} के साथ यात्रा बहुत परेशान करने वाली रही।", "{from} और {to} के बीच {bus} सेवा ने निराश किया।", "{bus} से {from}–{to} सफर में बहुत कम मिला।"],
      aspect: ["बस देरी से पहुंची और यात्रियों को कारण भी नहीं बताया गया।", "सीटें घिसी हुई थीं और रिक्लाइन काम नहीं कर रहा था।", "रात में काफी देर तक एसी बंद रहा।", "ड्राइवर बिना बताए बार-बार रुकता रहा।", "सफर से पहले वॉशरूम की सफाई नहीं हुई थी।", "बोर्डिंग अव्यवस्थित थी और सीट आवंटन गलत था।"],
      close: ["मेरी शिकायत का जवाब देने में ग्राहक सहायता बहुत धीमी रही।", "उम्मीद है कंपनी अगली यात्रा से पहले ये समस्याएं ठीक करेगी।", "रिफंड और बदलाव की प्रक्रिया वादे से कहीं ज़्यादा समय ले गई।", "{from} से {to} के लिए मैं कोई और ऑपरेटर देखूंगा।", "अगली बार बुकिंग से पहले समीक्षाएं ज़रूर देखूंगा।", "इस अनुभव के लिए किराया बिल्कुल सही नहीं था।"],
    },
  },
  te: {
    pos: {
      open: ["{from} నుండి {to} వరకు {bus} ప్రయాణం మొదటి నుండి చివరి వరకు సాఫీగా సాగింది.", "{from} నుండి {to} కు {bus} లో వెళ్లాను, చాలా బాగా అనిపించింది.", "{from} నుండి {time} బయలుదేరే బస్సు బుక్ చేశాను, అది మంచి ఎంపికే.", "{from}–{to} మధ్య ఈ బస్సు సేవ చాలా బాగుంది."],
      aspect: ["సీట్లు శుభ్రంగా ఉన్నాయి, రాత్రంతా క్యాబిన్ సౌకర్యంగా ఉంది.", "డ్రైవర్ స్థిరమైన వేగంతో జాగ్రత్తగా నడిపాడు.", "సిబ్బంది మర్యాదగా ఉన్నారు, ప్రతి స్టాప్ వద్ద సామాను సహాయం చేశారు.", "ఛార్జింగ్ పాయింట్లు పనిచేశాయి, రీడింగ్ లైట్ కూడా బాగుంది."],
      close: ["{time} కు బయలుదేరి సమయానికి చేరుకుంది.", "{from} నుండి {to} మార్గంలో మళ్లీ ఈ బస్సునే బుక్ చేస్తాను.", "ఛార్జీకి తగ్గ విలువ, బుకింగ్ నిర్ధారణ సందేశం వెంటనే వచ్చింది.", "కుటుంబంతో ప్రయాణించే వారికి ఇది మంచి ఎంపిక."],
    },
    mix: {
      open: ["{from} నుండి {to} కు {bus} ప్రయాణం మొత్తంగా పర్వాలేదు.", "{bus} లో {from} నుండి {to} వరకు సగటు అనుభవం.", "{from} నుండి {time} సర్వీస్ బాగానే ఉంది, కొన్ని లోపాలు ఉన్నాయి.", "{from}–{to} మార్గంలో {bus} అనుభవం ఎగుడుదిగుడుగా ఉంది."],
      aspect: ["సీట్లు సౌకర్యంగా ఉన్నా రిక్లైన్ పరిమితంగా ఉంది.", "ముందు ఏసీ బాగుంది, వెనుక సీట్లలో చల్లదనం తక్కువ.", "డ్రైవర్ జాగ్రత్తగా ఉన్నా, మధ్యలో బస్సు ఎక్కువసేపు ఆగింది.", "ఎక్కే చోట బోర్డింగ్ ఊహించిన దానికంటే ఎక్కువ సమయం పట్టింది."],
      close: ["ధర ప్రకారం పర్వాలేదు, కానీ మెరుగుపడాల్సింది చాలా ఉంది.", "{time} బయలుదేరడం దాదాపు షెడ్యూల్ ప్రకారం జరిగింది.", "కస్టమర్ సపోర్ట్ నా ప్రశ్నకు సమాధానమిచ్చింది.", "ధర తగ్గితే మళ్లీ బుక్ చేయవచ్చు."],
    },
    neg: {
      open: ["{bus} తో {from} నుండి {to} ప్రయాణం నిరాశపరిచింది.", "{from} నుండి {time} బయలుదేరడం సరిగా జరగలేదు.", "{from}–{to} మార్గంలో {bus} ని సిఫార్సు చేయను.", "{from} నుండి {bus} ప్రయాణం చాలా ఇబ్బందిగా ఉంది."],
      aspect: ["బస్సు ఆలస్యమైంది, ప్రయాణికులకు కారణం కూడా చెప్పలేదు.", "సీట్లు పాతబడ్డాయి, రిక్లైన్ పనిచేయలేదు.", "రాత్రి చాలాసేపు ఏసీ ఆగిపోయింది.", "డ్రైవర్ ఎటువంటి వివరణ లేకుండా పదే పదే ఆగాడు."],
      close: ["నా ఫిర్యాదుకు కస్టమర్ సపోర్ట్ చాలా ఆలస్యంగా స్పందించింది.", "తదుపరి ప్రయాణానికి ముందు ఈ సమస్యలను కంపెనీ సరిచేయాలని ఆశిస్తున్నాను.", "రీఫండ్ ప్రక్రియకు వాగ్దానం కంటే ఎక్కువ సమయం పట్టింది.", "{from} నుండి {to} కు మరో ఆపరేటర్‌ను చూసుకుంటాను."],
    },
  },
  ta: {
    pos: {
      open: ["{from} இருந்து {to} வரை {bus} பயணம் தொடக்கம் முதல் முடிவு வரை சீராக இருந்தது.", "{from} இருந்து {to} க்கு {bus} இல் சென்றேன், மிகவும் நன்றாக இருந்தது.", "{from} இலிருந்து {time} புறப்படும் பேருந்தை பதிவு செய்தேன், அது சரியான தேர்வு.", "{from}–{to} இடையே இந்த பேருந்து சேவை மிகச் சிறப்பாக உள்ளது."],
      aspect: ["இருக்கைகள் சுத்தமாக இருந்தன, இரவு முழுவதும் வசதியாக இருந்தது.", "ஓட்டுநர் நிலையான வேகத்தில் பாதுகாப்பாக ஓட்டினார்.", "ஊழியர்கள் பணிவாக இருந்தனர், ஒவ்வொரு நிறுத்தத்திலும் உதவினர்.", "சார்ஜிங் பாயிண்ட்கள் வேலை செய்தன, வாசிப்பு விளக்கும் பிரகாசமாக இருந்தது."],
      close: ["{time} க்கு புறப்பட்டு நேரத்திற்கு சென்றடைந்தது.", "{from} இருந்து {to} வழித்தடத்தில் மீண்டும் இதையே பதிவு செய்வேன்.", "கட்டணத்திற்கு ஏற்ற மதிப்பு, முன்பதிவு உறுதிச் செய்தி உடனே வந்தது.", "குடும்பத்துடன் பயணிப்பவர்களுக்கு இது சிறந்த தேர்வு."],
    },
    mix: {
      open: ["{from} இருந்து {to} வரை {bus} பயணம் ஒட்டுமொத்தமாக பரவாயில்லை.", "{bus} இல் {from} இலிருந்து {to} வரை சராசரி அனுபவம்.", "{from} இலிருந்து {time} சேவை நன்றாக இருந்தது, சில குறைகளும் இருந்தன.", "{from}–{to} வழித்தடத்தில் {bus} அனுபவம் ஏற்ற இறக்கமாக இருந்தது."],
      aspect: ["இருக்கைகள் வசதியாக இருந்தன, ஆனால் சாய்வு வரம்பிற்குட்பட்டது.", "முன்பக்க ஏசி நன்றாக இருந்தது, பின் இருக்கைகளில் குளிர் குறைவு.", "ஓட்டுநர் கவனமாக இருந்தார், ஆனால் நடுவழியில் நீண்ட நேரம் நின்றது.", "ஏறும் இடத்தில் ஏறுவதற்கு எதிர்பார்த்ததை விட அதிக நேரம் ஆனது."],
      close: ["விலைக்கு ஏற்றது, ஆனால் மேம்படுத்த இடம் உள்ளது.", "{time} புறப்பாடு ஏறக்குறைய நேரத்தில் நடந்தது, சிறிய தாமதம்.", "வாடிக்கையாளர் சேவை என் கேள்விக்கு பதில் அளித்தது.", "கட்டணம் குறைந்தால் மீண்டும் பதிவு செய்யலாம்."],
    },
    neg: {
      open: ["{bus} இல் {from} இலிருந்து {to} பயணம் ஏமாற்றம் அளித்தது.", "{from} இலிருந்து {time} புறப்பாடு சரியாக இல்லை.", "{from}–{to} வழித்தடத்தில் {bus} ஐ பரிந்துரைக்க மாட்டேன்.", "{from} இலிருந்து {bus} பயணம் மிகவும் சிரமமாக இருந்தது."],
      aspect: ["பேருந்து தாமதமானது, காரணமும் பயணிகளுக்குச் சொல்லப்படவில்லை.", "இருக்கைகள் பழையவை, சாய்வு வேலை செய்யவில்லை.", "இரவில் நீண்ட நேரம் ஏசி நின்றுவிட்டது.", "ஓட்டுநர் எந்த விளக்கமும் இன்றி அடிக்கடி நிறுத்தினார்."],
      close: ["என் புகாருக்கு வாடிக்கையாளர் சேவை மிகவும் தாமதமாக பதிலளித்தது.", "அடுத்த பயணத்திற்கு முன் நிறுவனம் இந்தப் பிரச்சினைகளைச் சரிசெய்யும் என நம்புகிறேன்.", "பணத்தைத் திரும்பப் பெறும் நடைமுறை சொன்னதைவிட நீண்ட நேரம் எடுத்தது.", "{from} இருந்து {to} க்கு வேறு ஆபரேட்டரைத் தேடுவேன்."],
    },
  },
};

const HEADLINES = {
  en: { pos: ["Smooth and comfortable ride", "Punctual and clean", "Would book again", "Good value overnight", "Friendly crew and tidy cabin", "Easy boarding and on time"],
        mix: ["Decent but not outstanding", "Mixed experience", "Okay for the fare", "Some good, some not", "Average, with room to improve", "Acceptable journey"],
        neg: ["Late and poorly managed", "Disappointing service", "Would not recommend", "Uncomfortable and delayed", "Support was slow", "Not worth the fare"] },
  hi: { pos: ["सुहाना और आरामदायक सफ़र", "समय पर और साफ-सुथरी बस", "फिर से बुक करूंगा", "किफायती रात का सफ़र", "विनम्र स्टाफ़ और साफ केबिन", "आसान बोर्डिंग, समय पर रवाना"],
        mix: ["ठीक-ठाक अनुभव", "मिला-जुला अनुभव", "किराए के हिसाब से ठीक", "कुछ अच्छा, कुछ कमी", "औसत, सुधार की गुंजाइश", "स्वीकार्य सफ़र"],
        neg: ["देर से और खराब प्रबंधन", "निराश करने वाली सेवा", "सिफारिश नहीं करूंगा", "असुविधाजनक और देरी", "सपोर्ट बहुत धीमा", "किराए के लायक नहीं"] },
  te: { pos: ["సాఫీగా సౌకర్యవంతమైన ప్రయాణం", "సమయానికి శుభ్రమైన బస్సు", "మళ్లీ బుక్ చేస్తాను", "రాత్రి ప్రయాణానికి మంచి ఎంపిక", "మర్యాదైన సిబ్బంది", "సులభ బోర్డింగ్, సమయానికి బయలుదేరింది"],
        mix: ["పర్వాలేదు", "మిశ్రమ అనుభవం", "ధరకు తగ్గట్టు", "కొంత మంచి, కొంత లోపం", "సగటు అనుభవం", "ఆమోదయోగ్యమైన ప్రయాణం"],
        neg: ["ఆలస్యం, సరైన నిర్వహణ లేదు", "నిరాశపరిచిన సేవ", "సిఫార్సు చేయను", "అసౌకర్యం మరియు ఆలస్యం", "సపోర్ట్ చాలా నెమ్మది", "ఈ ధరకు విలువ లేదు"] },
  ta: { pos: ["சீரான மற்றும் வசதியான பயணம்", "நேரத்திற்கு சுத்தமான பேருந்து", "மீண்டும் பதிவு செய்வேன்", "இரவுப் பயணத்திற்கு நல்ல தேர்வு", "பணிவான ஊழியர்கள்", "எளிதான ஏறுதல், நேரத்தில் புறப்பாடு"],
        mix: ["பரவாயில்லை", "கலவையான அனுபவம்", "கட்டணத்திற்கு ஏற்றது", "சில நல்லது, சில குறை", "சராசரி அனுபவம்", "ஏற்றுக்கொள்ளக்கூடிய பயணம்"],
        neg: ["தாமதம், மோசமான நிர்வாகம்", "ஏமாற்றம் அளித்த சேவை", "பரிந்துரைக்க மாட்டேன்", "சிரமமும் தாமதமும்", "சப்போர்ட் மிகவும் மெதுவாக", "இந்த கட்டணத்திற்கு மதிப்பில்லை"] },
};

function capitalise(city) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

function sentimentOf(rating) {
  return rating >= 4 ? "pos" : rating === 3 ? "mix" : "neg";
}

function fill(template, values) {
  return template.replace(/\{(from|to|time|bus)\}/g, (_, key) => values[key]);
}

// Weighted star rating: 5 is most common, 1 is least common.
function pickRating(rnd) {
  const r = rnd();
  if (r < 0.34) return 5;
  if (r < 0.64) return 4;
  if (r < 0.82) return 3;
  if (r < 0.92) return 2;
  return 1;
}

function assertUnique(values, label) {
  const seen = new Set(values);
  if (seen.size !== values.length) throw new Error(`sample data: duplicate ${label}`);
}

// Builds travelers and reviews. `curatedReviews` are the hand-written reviews (kept as written);
// every catalog bus gets two to four generated reviews. Each review gets its own traveler.
function buildReviewSample({ allBuses, catalogBuses, curatedReviews }) {
  const busByNumber = new Map(allBuses.map((bus) => [bus.busNumber, bus]));

  const items = [];
  for (const item of curatedReviews) {
    if (!busByNumber.has(item.route)) throw new Error(`curated review refers to unknown bus ${item.route}`);
    items.push({ curated: true, item, busNumber: item.route });
  }
  catalogBuses.forEach((bus, busIndex) => {
    const count = 2 + (busIndex % 3); // 2, 3 or 4 reviews per bus
    for (let k = 0; k < count; k++) items.push({ curated: false, busNumber: bus.busNumber });
  });

  const total = items.length;
  const width = Math.floor(SPAN_MS / total);
  const shuffleRnd = mulberry32(424242);
  const slots = Array.from({ length: total }, (_, i) => i);
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(shuffleRnd() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }

  // Curated text is reserved first so generated text can never repeat it.
  const usedComments = new Set(curatedReviews.map((r) => r.comment));
  const usedHeadlines = new Set(curatedReviews.map((r) => r.headline));

  const travelers = [];
  const reviews = [];

  items.forEach((entry, index) => {
    const rnd = mulberry32(index * 40503 + 7);
    const traveler = travelerFor(index);
    travelers.push(traveler);

    const bus = busByNumber.get(entry.busNumber);
    if (!bus) throw new Error(`no bus for review ${index}`);
    const values = {
      from: capitalise(bus.departureCity),
      to: capitalise(bus.destinationCity),
      time: bus.departureTime,
      bus: bus.busName,
    };

    let language;
    let rating;
    let headline;
    let comment;

    if (entry.curated) {
      language = entry.item.language;
      rating = entry.item.rating;
      headline = entry.item.headline;
      comment = entry.item.comment;
    } else {
      language = LANGS[index % LANGS.length];
      rating = pickRating(rnd);
      const sentiment = sentimentOf(rating);

      const table = PHRASES[language][sentiment];
      const o = table.open.length;
      const a = table.aspect.length;
      const c = table.close.length;
      const combos = o * a * c;
      const start = Math.floor(rnd() * combos);
      comment = null;
      for (let t = 0; t < combos && comment === null; t++) {
        const pick = (start + t) % combos;
        const text = [
          fill(table.open[pick % o], values),
          fill(table.aspect[Math.floor(pick / o) % a], values),
          fill(table.close[Math.floor(pick / (o * a)) % c], values),
        ].join(" ");
        if (!usedComments.has(text)) comment = text;
      }
      if (comment === null) throw new Error(`sample data: ran out of ${language} ${sentiment} text`);
      usedComments.add(comment);

      const headlinePool = HEADLINES[language][sentiment];
      const suffix = ` · ${values.bus} (${values.from}–${values.to})`;
      const hStart = Math.floor(rnd() * headlinePool.length);
      headline = null;
      for (let t = 0; t < headlinePool.length && headline === null; t++) {
        const candidate = headlinePool[(hStart + t) % headlinePool.length] + suffix;
        if (!usedHeadlines.has(candidate)) headline = candidate;
      }
      if (headline === null) throw new Error("sample data: ran out of headlines");
      usedHeadlines.add(headline);
    }

    const createdAt = new Date(BASE_TIME + slots[index] * width + Math.floor(rnd() * width));
    const dayStart = Date.UTC(createdAt.getUTCFullYear(), createdAt.getUTCMonth(), createdAt.getUTCDate());
    const journeyDate = new Date(dayStart - (1 + Math.floor(rnd() * 3)) * 24 * 60 * 60 * 1000);

    reviews.push({
      traveler: index,
      busNumber: entry.busNumber,
      language,
      rating,
      headline,
      comment,
      createdAt,
      journeyDate,
      seat: 1 + Math.floor(rnd() * 40),
      helpful: [], // filled below once every traveler exists
    });
  });

  // Helpful votes come from other travelers, never from the author.
  reviews.forEach((review, index) => {
    const rnd = mulberry32(index * 9973 + 11);
    const count = Math.floor(rnd() * 4);
    const chosen = new Set();
    while (chosen.size < count) {
      const voter = Math.floor(rnd() * total);
      if (voter !== index) chosen.add(voter);
    }
    review.helpful = [...chosen];
  });

  // Every guarantee is checked, so a bad change fails loudly instead of seeding duplicates.
  assertUnique(travelers.map((t) => t.name + "|" + t.email), "traveler");
  assertUnique(travelers.map((t) => t.email), "email");
  assertUnique(travelers.map((t) => t.phone), "phone");
  assertUnique(travelers.map((t) => t.googleId), "google id");
  assertUnique(travelers.map((t) => t.avatar), "picture");
  assertUnique(reviews.map((r) => r.comment), "comment");
  assertUnique(reviews.map((r) => r.headline), "headline");
  assertUnique(reviews.map((r) => r.createdAt.getTime()), "review time");
  for (const lang of LANGS) {
    if (!reviews.some((r) => r.language === lang)) throw new Error(`sample data: no ${lang} reviews`);
  }
  const perBus = new Map();
  for (const r of reviews) perBus.set(r.busNumber, (perBus.get(r.busNumber) || 0) + 1);
  for (const bus of catalogBuses) {
    if ((perBus.get(bus.busNumber) || 0) < 2) throw new Error(`sample data: ${bus.busNumber} has fewer than 2 reviews`);
  }

  return { travelers, reviews };
}

module.exports = { buildReviewSample, buildPicture, travelerFor, SAMPLE_DOMAIN, LANGS };
