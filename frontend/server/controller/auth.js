const Customer = require('../models/customer');

// Fields that must not leave the server in a login response.
function publicCustomer(customer) {
  const safe = customer.toObject();
  delete safe.googleId;
  if (safe.notificationPreferences) delete safe.notificationPreferences.pushSubscription;
  return safe;
}
const { createSession } = require('../utils/authToken');

async function verifyGoogleCredential(idToken) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) throw new Error('GOOGLE_CLIENT_ID is not configured on the server.');
  if (!idToken) throw new Error('Google credential is required.');

  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
  if (!response.ok) throw new Error('Google credential verification failed.');
  const profile = await response.json();

  if (profile.aud !== clientId || profile.email_verified !== 'true') {
    throw new Error('Google account verification failed.');
  }

  return profile;
}

exports.googleLogin = async (req, res) => {
  try {
    const profile = await verifyGoogleCredential(req.body?.credential);
    const email = String(profile.email || '').toLowerCase();
    if (!email) return res.status(400).json({ success: false, message: 'Google account did not provide an email address.' });

    let customer = await Customer.findOne({ $or: [{ googleId: profile.sub }, { email }] });
    const isNewAccount = !customer;
    if (!customer) {
      customer = await Customer.create({
        name: profile.name || 'Verified Traveler',
        email,
        googleId: profile.sub,
        phone: `google-${profile.sub}`.slice(0, 30),
        isVerified: true,
        avatar: profile.picture || undefined,
        gender: 'Other',
        age: 18
      });
    } else {
      customer.googleId = profile.sub;
      customer.name = profile.name || customer.name;
      customer.avatar = profile.picture || customer.avatar;
      customer.isVerified = true;
      await customer.save();
    }

    const token = createSession(customer._id);
    return res.status(200).json({
      success: true,
      message: isNewAccount ? 'Account created with Google.' : 'Google authentication successful.',
      isNewAccount,
      token,
      data: publicCustomer(customer)
    });
  } catch (error) {
    console.error('[Auth] Google sign-in failed:', error.message);
    return res.status(401).json({ success: false, message: error.message || 'Google authentication failed.' });
  }
};
