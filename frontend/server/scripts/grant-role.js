// Assigns a role to an existing traveler account so moderation can be used.
// The account must have signed in at least once (accounts are created only via Google sign-in).
//
// Usage (from frontend/server, with MONGODB_URI set in .env):
//   npm run grant-role -- user@example.com moderator
//   npm run grant-role -- user@example.com traveler
//
// Moderator and admin roles also mark the account as verified, because moderation
// routes require a verified account.

require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('../models/customer');

const ROLES = ['traveler', 'verified_guide', 'moderator', 'admin'];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  const [, , rawEmail, role] = process.argv;
  if (!rawEmail || !ROLES.includes(role)) {
    console.error(`Usage: npm run grant-role -- <email> <${ROLES.join('|')}>`);
    process.exitCode = 1;
    return;
  }

  const email = rawEmail.trim();
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/redbus_db');
  try {
    const customer = await Customer.findOne({
      email: new RegExp(`^${escapeRegex(email)}$`, 'i'),
    }).select('_id email role isVerified');

    if (!customer) {
      console.error(`No account found for ${email}. The traveler must sign in once before a role can be granted.`);
      process.exitCode = 1;
      return;
    }

    const update = { role };
    if (['moderator', 'admin'].includes(role)) update.isVerified = true;

    // updateOne skips full-document validation so an older account record can still be updated.
    await Customer.updateOne({ _id: customer._id }, { $set: update });
    console.log(
      `Updated ${customer.email}: role ${customer.role} -> ${role}` +
        (update.isVerified ? ' (verified)' : `, verified=${customer.isVerified}`)
    );
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  console.error('Failed to update role:', error.message);
  process.exitCode = 1;
});
