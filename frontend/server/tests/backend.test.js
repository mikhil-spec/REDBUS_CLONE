// Run with: npm test  (uses Node's built-in test runner; no database required.
// Model methods are stubbed so the real controllers, routes and middleware run unchanged.)
process.env.AUTH_TOKEN_SECRET = 'test-secret-for-unit-tests-only-0123456789';
process.env.BUS_TIMEZONE_OFFSET_MINUTES = '330';
delete process.env.MAPBOX_ACCESS_TOKEN;

const { test, describe, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const mongoose = require('mongoose');
const http = require('node:http');

const { getScheduledJourney } = require('../utils/journeyTime');
const { createSession } = require('../utils/authToken');
const Customer = require('../models/customer');
const Booking = require('../models/booking');
const Review = require('../models/review');
const Bus = require('../models/bus');

const ORIG = {};
function stub(model, name, fn) {
  if (!ORIG[model.modelName + '.' + name]) ORIG[model.modelName + '.' + name] = model[name];
  model[name] = fn;
}
afterEach(() => {
  for (const key of Object.keys(ORIG)) {
    const [modelName, name] = key.split('.');
    const model = { Customer, Booking, Review, Bus, Route: require('../models/route'), Post: require('../models/post'), Comment: require('../models/comment') }[modelName];
    model[name] = ORIG[key];
    delete ORIG[key];
  }
});

function startApp(mountPath, router) {
  const app = express();
  app.use(express.json());
  app.use(mountPath, router);
  return new Promise(resolve => {
    const server = app.listen(0, () => resolve(server));
  });
}
function request(server, method, path, { token, body } = {}) {
  const { port } = server.address();
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request({ host: '127.0.0.1', port, path, method,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } }, res => {
      let raw = '';
      res.on('data', c => (raw += c));
      res.on('end', () => resolve({ status: res.statusCode, body: raw ? JSON.parse(raw) : null }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const oid = () => new mongoose.Types.ObjectId();

describe('journey timing (IST, overnight rollover)', () => {
  test('overnight bus departing 21:00 IST on 12 Oct arrives 06:30 on 13 Oct', () => {
    const j = getScheduledJourney({ journeyDate: '2026-10-12', bus: { departureTime: '21:00', arrivalTime: '06:30' } });
    assert.equal(j.departureAt.toISOString(), '2026-10-12T15:30:00.000Z');
    assert.equal(j.arrivalAt.toISOString(), '2026-10-13T01:00:00.000Z');
  });

  test('result does not depend on the server timezone', () => {
    const a = getScheduledJourney({ journeyDate: '2026-10-12', bus: { departureTime: '08:00', arrivalTime: '14:00' } });
    assert.equal(a.departureAt.toISOString(), '2026-10-12T02:30:00.000Z');
    assert.equal(a.arrivalAt.toISOString(), '2026-10-12T08:30:00.000Z');
  });

  test('invalid timetable returns null instead of a wrong date', () => {
    assert.equal(getScheduledJourney({ journeyDate: '2026-10-12', bus: { departureTime: '11', arrivalTime: '99:00' } }), null);
  });
});

describe('customer endpoints are self-only', () => {
  let server;
  before(async () => {
    const router = require('../routes/customer');
    server = await startApp('/api/customer', router);
  });
  after(() => server.close());
  beforeEach(() => {
    // Re-stub before every test (afterEach restores real methods).
    // This is the auth lookup, so attachUser resolves a real verified caller.
    stub(Customer, 'findById', (id) => {
      const doc = { _id: id, name: 'Asha', email: 'a@x.in', isVerified: true, role: 'traveler', notificationPreferences: {} };
      return {
        select: async () => doc,
        then: (ok) => Promise.resolve(doc).then(ok),
      };
    });
  });

  test('anonymous GET is rejected', async () => {
    const r = await request(server, 'GET', '/api/customer');
    assert.equal(r.status, 401);
  });

  test('a caller cannot read another customer', async () => {
    const me = oid(), other = oid();
    const r = await request(server, 'GET', `/api/customer/${other}`, { token: createSession(me) });
    assert.equal(r.status, 403);
  });

  test('anonymous account upsert is rejected (no takeover path)', async () => {
    const r = await request(server, 'POST', '/api/customer', { body: { email: 'victim@x.in', googleId: 'attacker' } });
    assert.equal(r.status, 401);
  });
});

describe('booking cancellation is owner-only and blocks completed trips', () => {
  const booking = (overrides) => ({
    _id: oid(), pnr: 'RB-ABC123', customer: oid(), bus: oid(), seatsBooked: [1],
    departureCity: 'delhi', destinationCity: 'jaipur', bookingStatus: 'Confirmed',
    save: async function () { return this; }, ...overrides,
  });

  test('a non-owner, non-moderator cannot cancel', async () => {
    const controller = require('../controller/booking');
    const b = booking();
    stub(Booking, 'findOne', async () => b);
    const res = mockRes();
    await controller.cancelBooking({ params: { pnr: 'RB-ABC123' }, user: { _id: oid(), role: 'traveler' } }, res);
    assert.equal(res.statusCode, 403);
    assert.equal(b.bookingStatus, 'Confirmed');
  });

  test('a completed journey cannot be cancelled even by its owner', async () => {
    const controller = require('../controller/booking');
    const owner = oid();
    stub(Booking, 'findOne', async () => booking({ customer: owner, bookingStatus: 'Completed' }));
    const res = mockRes();
    await controller.cancelBooking({ params: { pnr: 'RB-ABC123' }, user: { _id: owner, role: 'traveler' } }, res);
    assert.equal(res.statusCode, 400);
  });

  test('a booking for a departure that already left is rejected', async () => {
    const controller = require('../controller/booking');
    stub(Customer, 'findById', async () => ({ _id: 'c', name: 'x' }));
    stub(Bus, 'findById', async () => ({ departureTime: '08:00', arrivalTime: '14:00', departureCity: 'a', destinationCity: 'b', bookedSeats: [] }));
    const res = mockRes();
    await controller.addBooking({ body: { busId: oid(), customerId: oid(), journeyDate: '2020-01-01', selectedSeats: [1] } }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.body.message, /already left/);
  });
});

describe('review eligibility uses the completed state, not the clock', () => {
  const reviewBody = { customerId: null, bookingId: null, rating: 5, comment: 'A comfortable and punctual journey overall.' };

  function prepare({ bookingStatus }) {
    const customerId = oid();
    const bookingId = oid();
    const busId = oid();
    stub(Customer, 'findById', async () => ({ _id: customerId, isVerified: true }));
    stub(Booking, 'findById', () => {
      const doc = { _id: bookingId, customer: customerId, bus: { _id: busId }, departureCity: 'a', destinationCity: 'b', bookingStatus, journeyDate: new Date('2020-01-01') };
      const chain = { populate: async () => doc };
      return chain;
    });
    stub(Review, 'findOne', async () => null);
    stub(Review, 'create', async (d) => ({ _id: oid(), ...d }));
    stub(Review, 'aggregate', async () => [{ avgRating: 5, totalReviews: 1 }]);
    stub(Bus, 'findByIdAndUpdate', async () => ({}));
    stub(Review, 'findById', () => ({ populate() { return this; }, then: r => Promise.resolve({ _id: 'x' }).then(r) }));
    return { customerId, bookingId, busId };
  }

  for (const status of ['Confirmed', 'Pending', 'Cancelled']) {
    test(`booking in status "${status}" (even long past) cannot be reviewed`, async () => {
      const ids = prepare({ bookingStatus: status });
      const controller = require('../controller/review');
      const res = mockRes();
      await controller.createReview({ body: { ...reviewBody, customerId: String(ids.customerId), bookingId: String(ids.bookingId) } }, res);
      assert.equal(res.statusCode, 400);
    });
  }

  test('a Completed booking can be reviewed', async () => {
    const ids = prepare({ bookingStatus: 'Completed' });
    const controller = require('../controller/review');
    const res = mockRes();
    await controller.createReview({ body: { ...reviewBody, customerId: String(ids.customerId), bookingId: String(ids.bookingId) } }, res);
    assert.equal(res.statusCode, 201);
  });

  test('comment shorter than 20 characters is rejected', async () => {
    const controller = require('../controller/review');
    const res = mockRes();
    await controller.createReview({ body: { customerId: String(oid()), bookingId: String(oid()), rating: 4, comment: 'too short' } }, res);
    assert.equal(res.statusCode, 400);
  });

  test('malformed bus id on the public list returns 400, not 500', async () => {
    const controller = require('../controller/review');
    const res = mockRes();
    await controller.getRouteReviews({ params: { busId: 'not-an-id' }, query: {} }, res);
    assert.equal(res.statusCode, 400);
  });
});

describe('scheduler auto-completion', () => {
  test('a confirmed journey whose scheduled arrival has passed becomes Completed', async () => {
    const { processJourneyCompletions } = require('../services/notificationScheduler');
    const past = new Date(Date.now() - 48 * 3600 * 1000);
    const yesterday = new Date(past.getTime() + 330 * 60000);
    const dayStr = yesterday.toISOString().slice(0, 10);
    const b = { _id: oid(), journeyDate: new Date(dayStr + 'T00:00:00Z'), bus: { departureTime: '06:00', arrivalTime: '10:00' } };
    const updates = [];
    stub(Booking, 'find', () => ({ populate: async () => [b] }));
    stub(Booking, 'updateOne', async (filter, update) => { updates.push({ filter, update }); return {}; });
    await processJourneyCompletions();
    assert.equal(updates.length, 1);
    assert.equal(updates[0].filter.bookingStatus, 'Confirmed');
    assert.equal(updates[0].update.$set.bookingStatus, 'Completed');
  });

  test('a journey that has not arrived yet is not completed', async () => {
    const { processJourneyCompletions } = require('../services/notificationScheduler');
    const now = Date.now();
    const b = { _id: oid(), journeyDate: new Date(now), bus: { departureTime: '23:59', arrivalTime: '23:59' } };
    const updates = [];
    stub(Booking, 'find', () => ({ populate: async () => [b] }));
    stub(Booking, 'updateOne', async () => { updates.push(1); return {}; });
    await processJourneyCompletions();
    assert.equal(updates.length, 0);
  });
});

describe('estimated traffic is never presented as live', () => {
  test('without a Mapbox token every route is labelled estimated with a reason', async () => {
    const { calculateMultiWaypointRoutes } = require('../services/trafficRoutingService');
    const routes = await calculateMultiWaypointRoutes(
      { lat: 28.6692, lng: 77.2285, name: 'Delhi' }, { lat: 26.9239, lng: 75.8005, name: 'Jaipur' }, []);
    assert.ok(routes.length > 0);
    for (const r of routes) {
      assert.equal(r.dataSource, 'estimated');
      assert.match(r.dataSourceReason, /MAPBOX_ACCESS_TOKEN/);
    }
  });
});

describe('community privacy', () => {
  test('public traveler profile selects only safe fields', async () => {
    const controller = require('../controller/community');
    const selected = [];
    stub(Customer, 'findById', () => ({ select(fields) { selected.push(fields); return Promise.resolve(null); } }));
    const res = mockRes();
    await controller.getTravelerProfile({ params: { customerId: String(oid()) } }, res);
    assert.equal(res.statusCode, 404);
    assert.ok(selected.length === 1);
    assert.doesNotMatch(selected[0], /email|phone|googleId|notificationPreferences/);
  });
});

function mockRes() {
  return {
    statusCode: 200, body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
}

describe('route ordering: /api/booking/mine is not treated as a PNR', () => {
  test('anonymous request to /mine is rejected by auth, not answered as a booking lookup', async () => {
    const router = require('../routes/booking');
    const server = await startApp('/api/booking', router);
    try {
      const r = await request(server, 'GET', '/api/booking/mine');
      assert.equal(r.status, 401);
    } finally {
      server.close();
    }
  });
});

// ---- Sample reviews: data validity and the review list filters/sorts ----
describe('sample reviews: every review has its own traveler, picture, time and text', () => {
  const { buildCatalog } = require('../seed-bus-catalog');
  const seedData = require('../seed-reviews');
  const { buildReviewSample } = require('../seed-review-pool');
  const Bus = require('../models/bus');
  const Customer = require('../models/customer');
  const Review = require('../models/review');

  const { buses: catalogBuses } = buildCatalog();
  const { travelers, reviews } = buildReviewSample({
    allBuses: [...seedData.BUSES, ...catalogBuses],
    catalogBuses,
    curatedReviews: seedData.REVIEWS,
  });

  test('every bus, traveler and review validates against its schema without a database', () => {
    for (const bus of [...seedData.BUSES, ...catalogBuses]) {
      assert.equal(new Bus(bus).validateSync(), undefined, `bus ${bus.busNumber}`);
    }
    for (const traveler of travelers) {
      assert.equal(new Customer(traveler).validateSync(), undefined, `traveler ${traveler.email}`);
    }
    reviews.forEach((r, index) => {
      const doc = new Review({
        customer: oid(), bus: oid(), booking: oid(),
        departureCity: 'delhi', destinationCity: 'jaipur',
        rating: r.rating, language: r.language, headline: r.headline, comment: r.comment,
        helpfulVotes: r.helpful.map(() => oid()), editableUntil: new Date(), status: 'active',
      });
      assert.equal(doc.validateSync(), undefined, `review ${index + 1}`);
    });
  });

  test('no traveler writes two reviews: one traveler per review', () => {
    assert.equal(travelers.length, reviews.length);
    assert.equal(new Set(reviews.map((r) => r.traveler)).size, reviews.length);
  });

  test('every traveler has a different picture, email, phone and Google id', () => {
    assert.ok(travelers.every((t) => typeof t.avatar === 'string' && t.avatar.startsWith('data:image/svg')));
    assert.equal(new Set(travelers.map((t) => t.avatar)).size, travelers.length, 'duplicate picture');
    assert.equal(new Set(travelers.map((t) => t.email)).size, travelers.length, 'duplicate email');
    assert.equal(new Set(travelers.map((t) => t.phone)).size, travelers.length, 'duplicate phone');
    assert.equal(new Set(travelers.map((t) => t.googleId)).size, travelers.length, 'duplicate google id');
  });

  test('every review has its own time of review, headline and text, all before today', () => {
    assert.equal(new Set(reviews.map((r) => r.createdAt.getTime())).size, reviews.length, 'duplicate review time');
    assert.equal(new Set(reviews.map((r) => r.headline)).size, reviews.length, 'duplicate headline');
    assert.equal(new Set(reviews.map((r) => r.comment)).size, reviews.length, 'duplicate comment');
    const today = new Date('2026-10-11T00:00:00Z');
    assert.ok(reviews.every((r) => r.createdAt < today), 'review dated in the future');
  });

  test('every catalog bus has at least two reviews, every star rating and all four languages appear', () => {
    const perBus = new Map();
    for (const r of reviews) perBus.set(r.busNumber, (perBus.get(r.busNumber) || 0) + 1);
    for (const bus of catalogBuses) {
      assert.ok((perBus.get(bus.busNumber) || 0) >= 2, `${bus.busNumber} has fewer than two reviews`);
    }
    assert.deepEqual([...new Set(reviews.map((r) => r.rating))].sort(), [1, 2, 3, 4, 5]);
    assert.deepEqual([...new Set(reviews.map((r) => r.language))].sort(), ['en', 'hi', 'ta', 'te']);
  });
});

describe('review list: filter by language and rating, sort by recent, highest, lowest and helpful', () => {
  const controller = require('../controller/review');
  const Review = require('../models/review');
  const fixtures = [
    { _id: oid(), rating: 3, language: 'en', createdAt: new Date('2026-09-01'), helpfulVotes: [], bus: { busName: 'A' }, customer: { _id: oid() } },
    { _id: oid(), rating: 5, language: 'hi', createdAt: new Date('2026-09-02'), helpfulVotes: [oid(), oid()], bus: { busName: 'B' }, customer: { _id: oid() } },
    { _id: oid(), rating: 1, language: 'ta', createdAt: new Date('2026-09-03'), helpfulVotes: [oid()], bus: { busName: 'A' }, customer: { _id: oid() } },
    { _id: oid(), rating: 4, language: 'hi', createdAt: new Date('2026-09-04'), helpfulVotes: [], bus: { busName: 'C' }, customer: { _id: oid() } },
  ];
  fixtures.forEach((f) => { f.toObject = function () { return { ...this }; }; });

  // Mirrors Mongoose's chainable query: awaitable and supports .populate().
  const chain = (rows) => { const p = Promise.resolve(rows); p.populate = () => chain(rows); return p; };

  function matches(query) {
    return fixtures.filter((f) =>
      (query.language === undefined || f.language === query.language) &&
      (query.rating === undefined || f.rating === query.rating)
    );
  }

  async function run(query, sort) {
    let seenQuery;
    // Record the first call only: that is the list query. Later calls compute the summary.
    stub(Review, 'find', (q) => { if (seenQuery === undefined) seenQuery = q; return chain(matches(q)); });
    stub(Review, 'aggregate', async () => []);
    const res = mockRes();
    await controller.getRouteReviews({ params: { busId: 'all' }, query: { ...query, sort } }, res);
    return { res, seenQuery };
  }

  test('language filter returns only that language', async () => {
    const { res, seenQuery } = await run({ language: 'hi' });
    assert.equal(res.statusCode, 200);
    assert.equal(seenQuery.language, 'hi');
    assert.deepEqual(res.body.data.map((r) => r.language), ['hi', 'hi']);
  });

  test('star filter returns only that rating', async () => {
    const { res } = await run({ star: '5' });
    assert.deepEqual(res.body.data.map((r) => r.rating), [5]);
  });

  test('highest rated first', async () => {
    const { res } = await run({}, 'highest');
    assert.deepEqual(res.body.data.map((r) => r.rating), [5, 4, 3, 1]);
  });

  test('lowest rated first', async () => {
    const { res } = await run({}, 'lowest');
    assert.deepEqual(res.body.data.map((r) => r.rating), [1, 3, 4, 5]);
  });

  test('most helpful first, then newest', async () => {
    const { res } = await run({}, 'helpful');
    assert.deepEqual(res.body.data.map((r) => r.helpfulCount), [2, 1, 0, 0]);
  });

  test('default sort is newest first', async () => {
    const { res } = await run({}, undefined);
    assert.deepEqual(res.body.data.map((r) => r.createdAt.toISOString().slice(0, 10)), ['2026-09-04', '2026-09-03', '2026-09-02', '2026-09-01']);
  });

  test('summary covers all routes even when a filter is applied', async () => {
    const { res } = await run({ language: 'ta' });
    assert.equal(res.body.summary.totalReviews, 4);
    assert.equal(res.body.data.length, 1);
  });

  test('an unknown language value is ignored rather than breaking the query', async () => {
    const { res, seenQuery } = await run({ language: 'xx' });
    assert.equal(res.statusCode, 200);
    assert.equal(seenQuery.language, undefined);
  });
});


// ---- Expanded sample data: pictures, unique text, community content and community sort options ----
describe('sample data: pictures, unique text and community content', () => {
  const seedPlan = require('../seed-reviews');
  const { POSTS } = require('../seed-community');
  const Post = require('../models/post');
  const Comment = require('../models/comment');

  test('every traveler has a picture and every review has its own headline and text', () => {
    const { buildCatalog } = require('../seed-bus-catalog');
    const { buildReviewSample } = require('../seed-review-pool');
    const { buses } = buildCatalog();
    const { travelers, reviews } = buildReviewSample({ allBuses: [...seedPlan.BUSES, ...buses], catalogBuses: buses, curatedReviews: seedPlan.REVIEWS });
    assert.ok(travelers.every((t) => typeof t.avatar === 'string' && t.avatar.startsWith('data:image/svg')), 'every traveler has a picture');
    assert.equal(new Set(reviews.map((r) => r.headline)).size, reviews.length, 'duplicate headline');
    assert.equal(new Set(reviews.map((r) => r.comment)).size, reviews.length, 'duplicate comment');
  });

  test('helpful votes always point at a real traveler other than the review author', () => {
    const { buildCatalog } = require('../seed-bus-catalog');
    const { buildReviewSample } = require('../seed-review-pool');
    const { buses } = buildCatalog();
    const { travelers, reviews } = buildReviewSample({ allBuses: [...seedPlan.BUSES, ...buses], catalogBuses: buses, curatedReviews: seedPlan.REVIEWS });
    reviews.forEach((r) => {
      for (const voter of r.helpful) {
        assert.ok(voter >= 0 && voter < travelers.length, `voter ${voter}`);
        assert.notEqual(voter, r.traveler, 'a review cannot vote for itself');
      }
    });
  });

  test('every community post and comment validates against its schema', () => {
    const topics = new Set(POSTS.map((p) => p.topic));
    assert.equal(topics.size, 5, 'all five topics represented');
    assert.ok(POSTS.length >= 40, 'at least 40 posts');
    for (const [index, item] of POSTS.entries()) {
      const doc = new Post({
        author: oid(), topic: item.topic, title: item.title, content: item.content,
        routeTag: item.route ? { departure: item.route[0], destination: item.route[1] } : undefined,
        destinationTag: item.destination, likes: item.likes.map(() => oid()), views: item.views,
        isFeatured: Boolean(item.featured), status: 'active',
      });
      assert.equal(doc.validateSync(), undefined, `post ${index + 1}`);
      for (const c of item.comments) {
        assert.equal(new Comment({ post: oid(), author: oid(), content: c.text }).validateSync(), undefined, `comment on post ${index + 1}`);
      }
    }
  });
});

describe('community: sort options return posts in the right order', () => {
  const controller = require('../controller/community');
  const Post = require('../models/post');
  const Comment = require('../models/comment');
  const posts = [
    { _id: oid(), title: 'A', topic: 'Travel Tips', likes: [1], views: 50, createdAt: new Date('2026-09-01'), isFeatured: false, toObject() { return { ...this }; } },
    { _id: oid(), title: 'B', topic: 'Travel Tips', likes: [1, 2, 3], views: 10, createdAt: new Date('2026-09-05'), isFeatured: false, toObject() { return { ...this }; } },
    { _id: oid(), title: 'C', topic: 'Travel Tips', likes: [], views: 300, createdAt: new Date('2026-09-03'), isFeatured: false, toObject() { return { ...this }; } },
  ];
  const comments = { [posts[0]._id.toString()]: 2, [posts[1]._id.toString()]: 0, [posts[2]._id.toString()]: 5 };
  // Mirrors the chain Post.find(...).populate(...).sort(...).exec() used by the controller.
  function chain(rows) { const o = { populate: () => o, sort: () => o, exec: async () => rows }; return o; }

  async function run(sort) {
    stub(Post, 'find', () => chain(posts.map((p) => ({ ...p, toObject: p.toObject }))));
    stub(Comment, 'aggregate', async () => Object.entries(comments).map(([id, count]) => ({ _id: new mongoose.Types.ObjectId(id), count })));
    const res = mockRes();
    await controller.getAllPosts({ query: { sort } }, res);
    return res.body.data.map((p) => p.title);
  }

  test('most liked', async () => assert.deepEqual(await run('liked'), ['B', 'A', 'C']));
  test('most discussed', async () => assert.deepEqual(await run('discussed'), ['C', 'A', 'B']));
  test('most viewed', async () => assert.deepEqual(await run('viewed'), ['C', 'A', 'B']));
  test('oldest first', async () => assert.deepEqual(await run('oldest'), ['A', 'C', 'B']));
  test('recent is the default', async () => assert.deepEqual(await run(undefined), ['B', 'C', 'A']));
});


// ---- Search to seats to booking: the endpoints the pages use ----
describe('journey search: buses for one journey, in the seat page format', () => {
  const routeController = require('../controller/route');
  const Route = require('../models/route');

  // Mirrors Bus.find(...).sort(...).lean() and Route.findOne(...).lean()
  function query(value) { const o = { sort() { return o; }, lean: async () => value }; return o; }

  test('returns matched buses, booked seats per bus and the route for the seat page', async () => {
    const buses = [
      { _id: oid(), busName: 'Pink City Sleeper', busNumber: 'B1', companyName: 'Op A', busType: 'AC Sleeper', departureTime: '08:00', arrivalTime: '14:00', fare: 1100, totalSeats: 36, bookedSeats: [3, 4], rating: 4.2 },
      { _id: oid(), busName: 'Coastal Connect', busNumber: 'B2', companyName: 'Op B', busType: 'Non-AC Seater', departureTime: '09:00', arrivalTime: '15:00', fare: 400, totalSeats: 40, bookedSeats: [], rating: 0 },
    ];
    stub(Bus, 'find', (filter) => { assert.equal(filter.departureCity, 'delhi'); return query(buses); });
    stub(Route, 'findOne', () => query({ distanceKm: 280, estimatedDuration: '6h 30m' }));
    const res = mockRes();
    await routeController.getBusesForJourney({ params: { departure: 'Delhi', arrival: 'Jaipur', date: '2026-10-20' } }, res);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.matchedBuses.length, 2);
    assert.equal(res.body.matchedBuses[0].busType, 'sleeper');
    assert.equal(res.body.matchedBuses[1].busType, 'standard');
    assert.equal(res.body.matchedBuses[0].operatorName, 'Op A');
    const firstId = String(buses[0]._id);
    assert.deepEqual(res.body.busidwithseatobj[firstId], [3, 4]);
    assert.equal(res.body.route.departureLocation.name, 'Delhi');
    assert.equal(res.body.route.arrivalLocation.name, 'Jaipur');
    assert.equal(res.body.route.duration, 6.5, 'duration from the route text');
  });

  test('duration falls back to the bus timetable when the route has no duration', async () => {
    stub(Bus, 'find', () => query([{ _id: oid(), busType: 'AC Seater', departureTime: '21:00', arrivalTime: '06:30', bookedSeats: [] }]));
    stub(Route, 'findOne', () => query(null));
    const res = mockRes();
    await routeController.getBusesForJourney({ params: { departure: 'delhi', arrival: 'jaipur', date: '2026-10-20' } }, res);
    assert.equal(res.body.route.duration, 9.5);
  });

  test('missing city names are rejected', async () => {
    const res = mockRes();
    await routeController.getBusesForJourney({ params: { departure: '', arrival: 'jaipur', date: 'x' } }, res);
    assert.equal(res.statusCode, 400);
  });
});

describe('booking from the payment page: its format is converted to the booking format', () => {
  const bookingController = require('../controller/booking');

  test('seats, passengers and journey date are converted', () => {
    const body = bookingController.normalizeBookingPayload({
      busId: 'b1', customerId: 'c1', seats: [4, '5'],
      passengerDetails: [{ name: ' Asha ', gender: 'F', age: 34 }, { name: 'Rahul', gender: 'male' }],
      departureDetails: { city: 'Delhi', time: 21, date: '2026-10-20' },
    });
    assert.deepEqual(body.selectedSeats, [4, 5]);
    assert.equal(body.journeyDate, '2026-10-20');
    assert.equal(body.passengers.length, 2);
    assert.deepEqual(body.passengers[0], { name: 'Asha', gender: 'Female', age: 34, seatNumber: 4 });
    assert.deepEqual(body.passengers[1], { name: 'Rahul', gender: 'Male', age: 30, seatNumber: 5 }, 'missing age defaults to 30');
  });

  test('a body already in the booking format is left as it is', () => {
    const body = bookingController.normalizeBookingPayload({ selectedSeats: [7], journeyDate: '2026-10-20', passengers: [{ name: 'A', gender: 'Other', age: 20, seatNumber: 7 }] });
    assert.deepEqual(body.selectedSeats, [7]);
    assert.equal(body.passengers[0].seatNumber, 7);
  });
});


describe('sample posts: every title, body and comment is different', () => {
  const { POSTS } = require('../seed-community');
  const seedPlan = require('../seed-reviews');
  test('no two posts share a title or a body', () => {
    assert.equal(new Set(POSTS.map((p) => p.title)).size, POSTS.length, 'duplicate title');
    assert.equal(new Set(POSTS.map((p) => p.content)).size, POSTS.length, 'duplicate body');
  });
  test('no comment text repeats across posts', () => {
    const texts = POSTS.flatMap((p) => p.comments.map((c) => c.text));
    assert.equal(new Set(texts).size, texts.length, 'duplicate comment');
  });
  test('no review text repeats across the whole sample set', () => {
    const headlines = seedPlan.REVIEWS.map((r) => r.headline);
    const comments = seedPlan.REVIEWS.map((r) => r.comment);
    assert.equal(new Set(headlines).size, headlines.length, 'duplicate headline');
    assert.equal(new Set(comments).size, comments.length, 'duplicate comment');
  });
});


// ---- Bus catalog: every filter, combination, time, date and bus type has buses on every route ----
describe('bus catalog: every filter combination has buses on every route', () => {
  const { buildCatalog, coverageGaps, chooseTemplates, AMENITIES, BUS_TYPES, TYPE_GROUPS } = require('../seed-bus-catalog');
  const Bus = require('../models/bus');
  const { routes, buses } = buildCatalog();
  const byRoute = new Map();
  for (const b of buses) {
    const key = `${b.departureCity}-${b.destinationCity}`;
    if (!byRoute.has(key)) byRoute.set(key, []);
    byRoute.get(key).push(b);
  }

  test('every selectable From and To pair has buses', () => {
    for (const from of ['delhi', 'mumbai', 'bangalore', 'kolkata', 'chennai']) {
      for (const to of ['jaipur', 'goa', 'mysore', 'darjeeling', 'pondicherry']) {
        assert.ok(byRoute.has(`${from}-${to}`), `${from} to ${to}`);
      }
    }
  });

  test('every route: every single filter, every pair of filters and every departure x arrival x bus-type combination has a bus', () => {
    for (const [route, list] of byRoute) {
      const gaps = coverageGaps(list);
      assert.deepEqual(gaps, [], `${route} is missing: ${gaps.slice(0, 5).join(', ')}`);
    }
  });

  test('every route has every bus type, every amenity, live tracking and reschedulable buses', () => {
    for (const [route, list] of byRoute) {
      for (const type of BUS_TYPES) assert.ok(list.some((b) => b.busType === type), `${type}: ${route}`);
      for (const amenity of AMENITIES) assert.ok(list.some((b) => b.amenities.includes(amenity)), `${amenity}: ${route}`);
      assert.ok(list.some((b) => b.liveTracking), `live tracking: ${route}`);
      assert.ok(list.some((b) => b.reschedulable), `reschedulable: ${route}`);
    }
  });

  test('every filter removes some buses on every route: live tracking, reschedulable and each amenity are a real split', () => {
    for (const [route, list] of byRoute) {
      const live = list.filter((b) => b.liveTracking).length;
      const resched = list.filter((b) => b.reschedulable).length;
      assert.ok(live > 0 && live < list.length, `live tracking split: ${route} (${live} of ${list.length})`);
      assert.ok(resched > 0 && resched < list.length, `reschedulable split: ${route} (${resched} of ${list.length})`);
      for (const amenity of AMENITIES) {
        const n = list.filter((b) => b.amenities.includes(amenity)).length;
        assert.ok(n > 0 && n < list.length, `amenity split ${amenity}: ${route} (${n} of ${list.length})`);
      }
    }
  });

  test('buses run on every day of the week, so every date shows them', () => {
    for (const doc of buses) {
      const bus = new Bus(doc);
      assert.equal(bus.operatingDays.length, 7, doc.busNumber);
    }
  });

  test('every bus has a valid duration, so arrival times match the timetable', () => {
    for (const bus of buses) {
      const [dh, dm] = bus.departureTime.split(':').map(Number);
      const [ah, am] = bus.arrivalTime.split(':').map(Number);
      const minutes = ((ah * 60 + am) - (dh * 60 + dm) + 1440) % 1440;
      assert.ok(minutes > 0 && minutes < 1440, `${bus.busNumber} duration`);
    }
  });

  test('every catalog bus is valid for the database schema', () => {
    buses.forEach((doc, index) => {
      assert.equal(new Bus(doc).validateSync(), undefined, `bus ${index + 1} (${doc.busNumber})`);
    });
  });

  test('bus numbers are unique and the selection is the same for every route', () => {
    assert.equal(new Set(buses.map((b) => b.busNumber)).size, buses.length);
    assert.equal(routes.length * chooseTemplates().length, buses.length);
  });
});

describe('seat page endpoint: the filter fields are sent', () => {
  const routeController = require('../controller/route');
  const Bus = require('../models/bus');
  const Route = require('../models/route');
  function query(value) { const o = { sort() { return o; }, lean: async () => value }; return o; }
  test('amenities, live tracking, reschedulable and the raw bus type are returned', async () => {
    stub(Bus, 'find', () => query([{ _id: oid(), busType: 'AC Sleeper', departureTime: '08:00', arrivalTime: '14:00', amenities: ['wifi'], liveTracking: true, reschedulable: false, bookedSeats: [] }]));
    stub(Route, 'findOne', () => query(null));
    const res = mockRes();
    await routeController.getBusesForJourney({ params: { departure: 'delhi', arrival: 'jaipur', date: '2026-10-20' } }, res);
    const bus = res.body.matchedBuses[0];
    assert.deepEqual(bus.amenities, ['wifi']);
    assert.equal(bus.busTypeName, 'AC Sleeper');
    assert.equal(bus.liveTracking, 1);
    assert.equal(bus.reschedulable, 0);
  });
});


// ---- Offer codes ----
describe('offer codes: the home-page codes apply only where they are offered', () => {
  const { evaluateOffer } = require('../utils/offers');
  const now = new Date('2026-10-11T12:00:00+05:30');
  test('FIRST works on any route and never discounts more than the total', () => {
    const r = evaluateOffer({ code: 'first', departure: 'delhi', destination: 'jaipur', amount: 1000, now });
    assert.equal(r.valid, true); assert.equal(r.discount, 250); assert.equal(r.code, 'FIRST');
    assert.equal(evaluateOffer({ code: 'FIRST', departure: 'delhi', destination: 'jaipur', amount: 100, now }).discount, 100);
  });
  test('SUPERHIT works on Andhra Pradesh and Telangana routes only', () => {
    assert.equal(evaluateOffer({ code: 'SUPERHIT', departure: 'hyderabad', destination: 'vijayawada', amount: 900, now }).discount, 300);
    assert.equal(evaluateOffer({ code: 'SUPERHIT', departure: 'delhi', destination: 'jaipur', amount: 900, now }).reason, 'not_eligible');
  });
  test('BUS300 works on Rajasthan, Maharashtra and Goa routes only', () => {
    assert.equal(evaluateOffer({ code: 'BUS300', departure: 'delhi', destination: 'jaipur', amount: 900, now }).valid, true);
    assert.equal(evaluateOffer({ code: 'BUS300', departure: 'mumbai', destination: 'pune', amount: 900, now }).valid, true);
    assert.equal(evaluateOffer({ code: 'BUS300', departure: 'chennai', destination: 'madurai', amount: 900, now }).reason, 'not_eligible');
  });
  test('RBTRIP works on Kerala routes only', () => {
    assert.equal(evaluateOffer({ code: 'RBTRIP', departure: 'kochi', destination: 'munnar', amount: 900, now }).discount, 200);
    assert.equal(evaluateOffer({ code: 'RBTRIP', departure: 'delhi', destination: 'jaipur', amount: 900, now }).reason, 'not_eligible');
  });
  test('codes expire after 30 Nov 2026 and unknown codes are refused', () => {
    assert.equal(evaluateOffer({ code: 'FIRST', departure: 'delhi', destination: 'jaipur', amount: 900, now: new Date('2026-12-01T10:00:00+05:30') }).reason, 'expired');
    assert.equal(evaluateOffer({ code: 'NOPE', departure: 'delhi', destination: 'jaipur', amount: 900, now }).reason, 'unknown');
    assert.equal(evaluateOffer({ code: '', departure: 'delhi', destination: 'jaipur', amount: 900, now }).reason, 'unknown');
  });
});

// ---- Seat reservation: one atomic update, and a release that gives the seats back ----
describe('seat reservation is atomic and reversible', () => {
  const { reserveSeats, releaseSeats } = require('../utils/seatReservation');
  const Bus = require('../models/bus');
  test('a free seat is reserved with a conditional update that requires none of the seats to be taken', async () => {
    let call;
    stub(Bus, 'updateOne', async (filter, update) => { call = { filter, update }; return { matchedCount: 1 }; });
    const result = await reserveSeats(oid(), [4, 5]);
    assert.equal(result.ok, true);
    assert.deepEqual(call.filter.bookedSeats, { $nin: [4, 5] });
    assert.ok(JSON.stringify(call.update).includes('$concatArrays'));
  });
  test('when a seat is already taken nothing is reserved, and the taken seats are reported', async () => {
    stub(Bus, 'updateOne', async () => ({ matchedCount: 0 }));
    stub(Bus, 'findById', () => ({ select() { return this; }, lean: async () => ({ bookedSeats: [5, 9] }) }));
    const result = await reserveSeats(oid(), [4, 5]);
    assert.equal(result.ok, false);
    assert.deepEqual(result.taken, [5]);
  });
  test('releasing seats removes exactly those seats', async () => {
    let update;
    stub(Bus, 'updateOne', async (filter, u) => { update = u; return { matchedCount: 1 }; });
    await releaseSeats(oid(), [4, 5]);
    assert.ok(JSON.stringify(update).includes('$setDifference'));
  });
});

// ---- Rate limiting ----
describe('rate limiting: requests above the limit get HTTP 429 until the window ends', () => {
  const { createRateLimiter } = require('../middleware/rateLimit');
  const makeRes = () => ({ statusCode: 200, body: null, headers: {}, set(k, v) { this.headers[k] = v; return this; }, status(c) { this.statusCode = c; return this; }, json(b) { this.body = b; return this; } });
  test('the limit is enforced, then resets when the window ends', () => {
    let t = 0;
    const limiter = createRateLimiter({ windowMs: 1000, max: 2, now: () => t });
    const attempt = (ip) => { const res = makeRes(); let passed = false; limiter({ ip }, res, () => { passed = true; }); return { passed, res }; };
    assert.equal(attempt('1.2.3.4').passed, true);
    assert.equal(attempt('1.2.3.4').passed, true);
    const blocked = attempt('1.2.3.4');
    assert.equal(blocked.passed, false);
    assert.equal(blocked.res.statusCode, 429);
    assert.ok(blocked.res.headers['Retry-After']);
    t = 1500;
    assert.equal(attempt('1.2.3.4').passed, true);
  });
  test('each address has its own count', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 1, now: () => 0 });
    let first = false; let second = false;
    limiter({ ip: 'a' }, makeRes(), () => { first = true; });
    limiter({ ip: 'b' }, makeRes(), () => { second = true; });
    assert.equal(first && second, true);
  });
});

// ---- Routes for the home-page menus ----
describe('home-page menus: every route that has buses is listed', () => {
  const routeController = require('../controller/route');
  const Bus = require('../models/bus');
  test('each route is listed with its bus count', async () => {
    stub(Bus, 'aggregate', async () => [{ _id: { departureCity: 'delhi', destinationCity: 'jaipur' }, busCount: 3 }]);
    const res = mockRes();
    await routeController.getRoutePairs({}, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body.data, [{ departure: 'delhi', destination: 'jaipur', busCount: 3 }]);
  });
});

// ---- Community posts in four languages ----
describe('community: posts can be filtered by language', () => {
  const controller = require('../controller/community');
  const Post = require('../models/post');
  const Comment = require('../models/comment');
  const chainOf = (rows) => { const o = { populate() { return o; }, sort() { return o; }, exec: async () => rows }; return o; };
  async function queryFor(query) {
    let seen;
    stub(Post, 'find', (q) => { if (seen === undefined) seen = q; return chainOf([]); });
    stub(Comment, 'aggregate', async () => []);
    await controller.getAllPosts({ query }, mockRes());
    return seen;
  }
  test('a language is applied to the query', async () => {
    assert.equal((await queryFor({ language: 'ta' })).language, 'ta');
  });
  test('English also includes posts saved before languages existed', async () => {
    assert.deepEqual((await queryFor({ language: 'en' })).language, { $in: ['en', null] });
  });
  test('an unknown language is ignored', async () => {
    assert.equal((await queryFor({ language: 'xx' })).language, undefined);
  });
});

describe('community: the Hindi, Telugu and Tamil sample posts are valid and different', () => {
  const { LANGUAGE_POSTS } = require('../seed-data-languages');
  const Post = require('../models/post');
  test('every language post validates against the schema', () => {
    LANGUAGE_POSTS.forEach((item, index) => {
      const doc = new Post({ author: oid(), topic: item.topic, title: item.title, content: item.content, language: item.language, status: 'active' });
      assert.equal(doc.validateSync(), undefined, `post ${index + 1}`);
    });
  });
  test('all three languages are represented, and no title or body repeats', () => {
    assert.deepEqual([...new Set(LANGUAGE_POSTS.map((p) => p.language))].sort(), ['hi', 'ta', 'te']);
    assert.equal(new Set(LANGUAGE_POSTS.map((p) => p.title)).size, LANGUAGE_POSTS.length);
    assert.equal(new Set(LANGUAGE_POSTS.map((p) => p.content)).size, LANGUAGE_POSTS.length);
  });
});
