// Sample community posts and comments, written by the sample travelers from seed-reviews.js.
//
// Run from the frontend/server folder, AFTER "npm run seed:reviews":   npm run seed:community
// Safe to run again: earlier sample posts and comments (written by the sample travelers) are replaced.

require("dotenv").config();
const mongoose = require("mongoose");
const Customer = require("./models/customer");
const Post = require("./models/post");
const Comment = require("./models/comment");
const { TRAVELERS } = require("./seed-reviews");
const { MORE_POSTS } = require("./seed-data-more");
const { LANGUAGE_POSTS } = require("./seed-data-languages");

// Indexes refer to TRAVELERS in seed-reviews.js. "likes" lists the travelers who liked the post.
// "comments" lists { by: traveler index, text }. Times are spread over the last few months.
const POSTS = [
  // Journey Stories
  { by: 0, topic: "Journey Stories", title: "Overnight from Delhi to Jaipur with my parents", route: ["delhi", "jaipur"], views: 240, likes: [1, 2, 3, 5, 8],
    content: "We booked the sleeper for the 9 pm departure. My parents slept through the night, and the bus reached Jaipur before 7 am. Sharing this in case you are travelling with older family members.",
    comments: [{ by: 1, text: "Good to know the sleeper works for older people. How was the boarding point?" }, { by: 0, text: "Boarding was at the Kashmere Gate stop, easy to find on the app map." }, { by: 4, text: "We did the same trip last month and loved it." }] },
  { by: 2, topic: "Journey Stories", title: "Weekend trip to Pune that surprised me", route: ["mumbai", "pune"], views: 180, likes: [0, 4, 7],
    content: "The Friday evening bus from Mumbai to Pune took three hours in traffic, but the seats were comfortable and the driver stayed calm. I now prefer this to the train for short weekend trips.",
    comments: [{ by: 0, text: "Agree, the seats are much better than the regular buses." }, { by: 6, text: "Which stop did you board from?" }] },
  { by: 13, topic: "Journey Stories", title: "Bangalore to Hyderabad: what I learned after 40 trips", route: ["bangalore", "hyderabad"], views: 310, likes: [0, 1, 2, 3, 6, 9, 10],
    content: "After forty trips I now book the left-side window seat, which avoids direct sun in the morning. Carry a small water bottle and a light blanket, because the AC is strong at night.",
    comments: [{ by: 15, text: "The left-side tip is great, thanks!" }, { by: 2, text: "Which operator do you usually take?" }] },
  { by: 5, topic: "Journey Stories", title: "A monsoon ride up the ghats", route: ["pune", "mahabaleshwar"], views: 150, likes: [3, 8],
    content: "We left Pune in heavy rain and the bus slowed on the ghat, but the driver kept us informed at each stop. The view near Lingmala point was worth the wait. Pack a jacket, the temperature drops quickly.",
    comments: [{ by: 12, text: "Lingmala is my favourite spot too." }] },
  { by: 19, topic: "Journey Stories", title: "My first long bus trip with my grandson", route: null, views: 95, likes: [7, 11, 14],
    content: "He is seven and asked a hundred questions. The conductor gave him a sticker and the people sitting nearby were kind. Small things like this make a long journey feel short.",
    comments: [{ by: 4, text: "What a lovely story." }] },
  // Travel Tips
  { by: 6, topic: "Travel Tips", title: "Packing list for a night bus", route: null, views: 420, likes: [0, 1, 2, 4, 5, 8, 11, 16], featured: true,
    content: "Carry a neck pillow, a light shawl, a power bank and a few wet wipes. Keep your ticket and boarding point on your phone and on paper. Most drivers stop for tea, so bring small change.",
    comments: [{ by: 0, text: "Adding earplugs to this list!" }, { by: 9, text: "The power bank tip saved me last month." }, { by: 3, text: "Small change is so important at halts." }] },
  { by: 3, topic: "Travel Tips", title: "Choose your seat before you pay", route: null, views: 205, likes: [1, 6, 10],
    content: "On the seat map, the back seats near the engine are noisier, while the middle rows bounce less on rough roads. Check the seat map carefully before you confirm the booking.",
    comments: [{ by: 6, text: "Good tip, I always pick the middle row now." }] },
  { by: 15, topic: "Travel Tips", title: "Keep notifications on for schedule changes", route: null, views: 130, likes: [2, 12],
    content: "Turn on in-app and email alerts for your booking. Last week my departure moved by 40 minutes and I was told early, so I could reach the stop on time.",
    comments: [] },
  { by: 10, topic: "Travel Tips", title: "How to avoid the wrong boarding point", route: null, views: 260, likes: [0, 4, 7, 13, 17],
    content: "Compare the boarding point name with the map on the booking page, and ask the driver to confirm before you put your bag in the luggage bay. It saved me from waiting at the wrong petrol pump.",
    comments: [{ by: 14, text: "This happened to me in Chennai too." }, { by: 1, text: "Great reminder." }] },
  { by: 17, topic: "Travel Tips", title: "Carry a copy of your ID", route: null, views: 110, likes: [5, 8],
    content: "Conductors sometimes ask for ID even when you have an e-ticket. Keep a photo of your ID on your phone and a printed booking copy in your bag.",
    comments: [{ by: 3, text: "Useful, I forgot my ID once." }] },
  // Route Advice
  { by: 1, topic: "Route Advice", title: "Mumbai to Pune: the best time to travel", route: ["mumbai", "pune"], views: 340, likes: [0, 2, 6, 9, 12],
    content: "Avoid Friday and Sunday evenings if you can. Early morning departures are usually on time, and the expressway is clear before eight.",
    comments: [{ by: 6, text: "Agreed, Sunday evening is brutal." }, { by: 12, text: "Early morning is my go-to." }] },
  { by: 11, topic: "Route Advice", title: "Delhi to Agra: avoid the late-night halt", route: ["delhi", "agra"], views: 170, likes: [0, 3],
    content: "The halt after Mathura can be crowded near midnight. If you can, take the early morning departure. The breakfast stop is cleaner and more relaxed.",
    comments: [{ by: 4, text: "Thanks for the tip!" }] },
  { by: 16, topic: "Route Advice", title: "Chennai to Madurai overnight: what to expect", route: ["chennai", "madurai"], views: 88, likes: [9],
    content: "The road is good after Tindivanam. The bus usually reaches Madurai before sunrise, which suits the temple visit. Ask for a seat near the front if you are prone to motion sickness.",
    comments: [] },
  { by: 9, topic: "Route Advice", title: "Hyderabad to Vijayawada: the scenic stretch", route: ["hyderabad", "vijayawada"], views: 74, likes: [15],
    content: "The Krishna river stretch near Nandigama is beautiful in the early morning. Most buses halt there briefly, and the washrooms are clean.",
    comments: [{ by: 15, text: "Glad you enjoyed it!" }] },
  // Destination Guide
  { by: 4, topic: "Destination Guide", title: "Agra: what to see after arriving by bus", route: null, destination: "Agra", views: 260, likes: [0, 2, 5, 8],
    content: "Arriving early gives you time to visit Agra Fort before the crowds. Take an auto from the bus stand rather than from the road outside to avoid high fares.",
    comments: [{ by: 0, text: "Great advice for first-timers." }] },
  { by: 7, topic: "Destination Guide", title: "Jaipur on a budget", route: null, destination: "Jaipur", views: 190, likes: [1, 3, 9],
    content: "Street food near Johari Bazaar is cheap and tasty. Go to Hawa Mahal in the morning for better photos. Local buses are useful for short trips.",
    comments: [{ by: 4, text: "Do not forget the lassi." }] },
  { by: 18, topic: "Destination Guide", title: "Kochi to Munnar through Ernakulam", route: null, destination: "Munnar", views: 120, likes: [6],
    content: "Night buses from Ernakulam drop you near the hills in the morning. Carry warm clothes, because Munnar is cold before sunrise.",
    comments: [] },
  // General Discussion
  { by: 12, topic: "General Discussion", title: "Are sleeper berths better than seater seats?", route: null, views: 300, likes: [0, 4, 8, 10],
    content: "I usually take seater buses because they cost less. On a long route such as Delhi to Jaipur, is the sleeper worth the extra fare? I would like to hear your views.",
    comments: [{ by: 2, text: "For six hours or more I always pick the sleeper." }, { by: 0, text: "Sleeper every time for night travel." }, { by: 11, text: "A seater is fine for shorter routes." }] },
  { by: 14, topic: "General Discussion", title: "Which operators have the cleanest buses?", route: null, views: 140, likes: [5, 7],
    content: "I would like to hear from people who have travelled in the last month. Clean washrooms and dry floors make a big difference to me.",
    comments: [{ by: 17, text: "The Pandiyan operator has been consistently clean in my experience." }] },
  { by: 8, topic: "General Discussion", title: "Suggestions for a family trip in winter", route: null, views: 98, likes: [],
    content: "We are planning a trip from Chandigarh to Delhi with two children. Any tips on boarding times or blankets would help.",
    comments: [{ by: 9, text: "Choose a daytime departure with children." }, { by: 18, text: "Carry extra socks for the kids!" }] },
];

POSTS.push(...MORE_POSTS, ...LANGUAGE_POSTS);

function buildCommunityPlan() {
  return { posts: POSTS, travelers: TRAVELERS };
}

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/redbus_db";
  await mongoose.connect(uri);
  console.log(`[Seed] connected to database "${mongoose.connection.name}" on ${mongoose.connection.host}`);

  // Sample travelers are needed as authors. They are created by "npm run seed:reviews"; create them here if missing.
  const travelerIds = [];
  for (const traveler of TRAVELERS) {
    const doc = await Customer.findOneAndUpdate({ email: traveler.email }, { $set: traveler }, { upsert: true, new: true });
    travelerIds.push(doc._id);
  }

  // Remove earlier sample posts (written by sample travelers) and their comments.
  const previous = await Post.find({ author: { $in: travelerIds } }).select("_id");
  const previousIds = previous.map((p) => p._id);
  await Comment.deleteMany({ post: { $in: previousIds } });
  await Post.deleteMany({ _id: { $in: previousIds } });

  const now = Date.now();
  for (let i = 0; i < POSTS.length; i++) {
    const item = POSTS[i];
    const createdAt = new Date(now - (POSTS.length - i) * 2 * 24 * 60 * 60 * 1000);
    const post = await Post.create({
      author: travelerIds[item.by],
      language: item.language || "en",
      topic: item.topic,
      title: item.title,
      content: item.content,
      routeTag: item.route ? { departure: item.route[0], destination: item.route[1] } : undefined,
      destinationTag: item.destination,
      likes: item.likes.map((idx) => travelerIds[idx]),
      views: item.views,
      isFeatured: Boolean(item.featured),
      status: "active",
    });
    await mongoose.connection.collection("posts").updateOne({ _id: post._id }, { $set: { createdAt } });

    for (let j = 0; j < item.comments.length; j++) {
      const c = item.comments[j];
      const comment = await Comment.create({ post: post._id, author: travelerIds[c.by], content: c.text });
      await mongoose.connection.collection("comments").updateOne(
        { _id: comment._id },
        { $set: { createdAt: new Date(createdAt.getTime() + (j + 1) * 3 * 60 * 60 * 1000) } }
      );
    }
  }

  const storedPosts = await Post.countDocuments({ author: { $in: travelerIds } });
  console.log(`[Seed] ${POSTS.length} sample posts written. Database now holds ${storedPosts} sample posts.`);
  await mongoose.disconnect();
}

module.exports = { buildCommunityPlan, POSTS };

if (require.main === module) {
  seed().catch(async (error) => {
    console.error("[Seed] failed:", error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
}
