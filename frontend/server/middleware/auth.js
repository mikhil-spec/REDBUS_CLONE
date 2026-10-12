const Customer = require('../models/customer');
const { verify } = require('../utils/authToken');

async function attachUser(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    const payload = verify(token);
    if (!payload) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const customer = await Customer.findById(payload.sub).select('_id name email avatar isVerified role badges notificationPreferences themePreference');
    if (!customer) {
      return res.status(401).json({ success: false, message: 'Authenticated user no longer exists.' });
    }

    req.user = customer;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid authentication session.' });
  }
}

function requireVerified(req, res, next) {
  if (!req.user?.isVerified) {
    return res.status(403).json({ success: false, message: 'A verified traveler account is required.' });
  }
  next();
}

function bindCustomer(req, res, next) {
  const customerId = String(req.user._id);
  if (req.body && typeof req.body === 'object') {
    const supplied = req.body.customerId || req.body.authorId || req.body.moderatorId;
    if (supplied && String(supplied) !== customerId) {
      return res.status(403).json({ success: false, message: 'You cannot act on behalf of another customer.' });
    }
    req.body.customerId = customerId;
    req.body.authorId = customerId;
    req.body.moderatorId = customerId;
  }
  if (req.params.customerId && String(req.params.customerId) !== customerId) {
    return res.status(403).json({ success: false, message: 'You can only access your own account data.' });
  }
  if (req.query.customerId && String(req.query.customerId) !== customerId) {
    return res.status(403).json({ success: false, message: 'You can only access your own account data.' });
  }
  if (req.query.customerId) req.query.customerId = customerId;
  next();
}

function requireModerator(req, res, next) {
  if (!['moderator', 'admin'].includes(req.user?.role)) {
    return res.status(403).json({ success: false, message: 'Moderator or administrator privileges are required.' });
  }
  next();
}

module.exports = { attachUser, requireVerified, bindCustomer, requireModerator };
