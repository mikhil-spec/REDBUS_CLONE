const nodemailer = require('nodemailer');
const Notification = require('../models/notification');
const Customer = require('../models/customer');
const { renderLocalizedTemplate } = require('../utils/localization');

let webPush = null;
try { webPush = require('web-push'); } catch { webPush = null; }

let emailTransporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

if (webPush && process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && process.env.VAPID_SUBJECT) {
  // An invalid optional push key must not stop the whole server from starting.
  try {
    webPush.setVapidDetails(process.env.VAPID_SUBJECT, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  } catch (error) {
    console.error('[Push] VAPID keys are invalid, push notifications are disabled:', error.message);
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const allowMocks = String(process.env.ALLOW_NOTIFICATION_MOCKS || 'false') === 'true';
const VALID_CHANNELS = new Set(['in_app', 'email', 'push', 'sms']);
const EVENT_PREFERENCE = {
  BOOKING_CONFIRMATION: 'bookingUpdates',
  BOOKING_CANCELLATION: 'bookingUpdates',
  SCHEDULE_CHANGE: 'scheduleChanges',
  JOURNEY_REMINDER: 'journeyReminders',
  PROMOTIONAL_OFFER: 'promotions',
};

async function deliverEmail(recipientEmail, title, body) {
  if (!emailTransporter) {
    if (allowMocks) { console.log(`[Email mock -> ${recipientEmail}] ${title}`); return true; }
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.');
  }
  await emailTransporter.sendMail({
    from: process.env.SMTP_FROM || `RedBus Notifications <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    subject: title,
    text: body,
    html: `<div style="font-family:Arial,sans-serif;padding:20px;border-top:4px solid #d84e55"><h2>RedBus Journey Alert</h2><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></div>`,
  });
  // This means the mail provider accepted the message, not that the recipient read it.
  return true;
}

async function deliverPushNotification(subscriptionJson, title, body) {
  if (!webPush || !process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY || !process.env.VAPID_SUBJECT) {
    if (allowMocks) { console.log(`[Push mock] ${title}`); return true; }
    throw new Error('Web Push/VAPID is not configured.');
  }
  if (!subscriptionJson) throw new Error('Recipient has no registered browser push subscription.');
  const subscription = typeof subscriptionJson === 'string' ? JSON.parse(subscriptionJson) : subscriptionJson;
  await webPush.sendNotification(subscription, JSON.stringify({ title, body, url: '/notifications' }));
  return true;
}

async function deliverSms(phoneNumber, body) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) {
    if (allowMocks) { console.log(`[SMS mock -> ${phoneNumber}] ${body}`); return true; }
    throw new Error('Twilio SMS is not configured.');
  }
  if (!phoneNumber || String(phoneNumber).startsWith('google-')) {
    throw new Error('A real, verified phone number is required for SMS delivery.');
  }
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const params = new URLSearchParams({ To: phoneNumber, From: from, Body: body });
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  if (!response.ok) throw new Error(`Twilio SMS failed (${response.status}).`);
  return true;
}

function latestStatusByChannel(record) {
  const latest = new Map();
  for (const log of record.deliveryLogs || []) {
    const previous = latest.get(log.channel);
    if (!previous || Number(log.attemptNumber || 0) >= Number(previous.attemptNumber || 0)) {
      latest.set(log.channel, log);
    }
  }
  return latest;
}

function updateAggregateDeliveryStatus(record) {
  const latest = latestStatusByChannel(record);
  const channels = [...new Set(record.deliveryChannels || [])];
  const failed = channels.filter(channel => latest.get(channel)?.status !== 'delivered');
  record.deliveryStatus = failed.length === 0
    ? 'delivered'
    : channels.some(channel => latest.get(channel)?.status === 'delivered')
      ? 'partially_delivered'
      : 'failed';
  return failed;
}

exports.dispatchNotification = async ({ recipientId, eventType, templateData = {}, forceChannels = null, metadata = {} }) => {
  const customer = await Customer.findById(recipientId);
  if (!customer) throw new Error('Recipient customer not found.');

  const preferences = customer.notificationPreferences || {};
  const preferenceKey = EVENT_PREFERENCE[eventType];
  if (!preferenceKey) throw new Error('Unsupported notification event type.');
  if (preferences.eventSubscriptions?.[preferenceKey] === false) return null;

  let targetedChannels = Array.isArray(forceChannels) && forceChannels.length
    ? forceChannels
    : ['in_app', ...(preferences.channels?.email ? ['email'] : []), ...(preferences.channels?.push ? ['push'] : []), ...(preferences.channels?.sms ? ['sms'] : [])];
  targetedChannels = [...new Set(targetedChannels)];
  // Only target browser push when the traveler has actually registered a subscription.
  // Otherwise every notification would carry a permanently failed push attempt.
  if (!(Array.isArray(forceChannels) && forceChannels.length) && !preferences.pushSubscription) {
    targetedChannels = targetedChannels.filter(channel => channel !== 'push');
  }
  if (targetedChannels.some(channel => !VALID_CHANNELS.has(channel))) throw new Error('Unsupported notification delivery channel.');

  const lang = preferences.preferredLanguage || 'en';
  const { title, message, language } = renderLocalizedTemplate(eventType, lang, templateData);
  const record = new Notification({ recipient: customer._id, eventType, title, message, language, deliveryChannels: targetedChannels, deliveryStatus: 'queued', metadata });
  for (const channel of targetedChannels) {
    try {
      if (channel === 'in_app') {
        record.deliveryLogs.push({ channel, status: 'delivered', attemptNumber: 1 });
      } else if (channel === 'email') {
        await deliverEmail(customer.email, title, message);
        record.deliveryLogs.push({ channel, status: 'delivered', attemptNumber: 1 });
      } else if (channel === 'push') {
        await deliverPushNotification(preferences.pushSubscription, title, message);
        record.deliveryLogs.push({ channel, status: 'delivered', attemptNumber: 1 });
      } else if (channel === 'sms') {
        await deliverSms(customer.phone, message);
        record.deliveryLogs.push({ channel, status: 'delivered', attemptNumber: 1 });
      }
    } catch (error) {
      record.deliveryLogs.push({ channel, status: 'failed', attemptNumber: 1, errorMessage: error.message });
    }
  }

  const failed = updateAggregateDeliveryStatus(record);
  if (failed.length && record.retryCount < record.maxRetries) record.nextRetryAt = new Date(Date.now() + 60 * 1000);
  else record.nextRetryAt = null;
  await record.save();
  return record;
};

exports.retryFailedNotification = async (notificationId) => {
  const record = await Notification.findById(notificationId).populate('recipient');
  if (!record) throw new Error('Notification entry not found.');
  if (record.deliveryStatus === 'delivered') return record;
  if (record.retryCount >= record.maxRetries) throw new Error('Maximum retry threshold reached for this notification.');

  const previousFailedChannels = updateAggregateDeliveryStatus(record);
  if (!previousFailedChannels.length) {
    record.nextRetryAt = null;
    await record.save();
    return record;
  }

  record.retryCount += 1;
  const attemptNumber = record.retryCount + 1;
  const preferences = record.recipient.notificationPreferences || {};
  for (const channel of previousFailedChannels) {
    try {
      if (channel === 'email') await deliverEmail(record.recipient.email, record.title, record.message);
      else if (channel === 'push') await deliverPushNotification(preferences.pushSubscription, record.title, record.message);
      else if (channel === 'sms') await deliverSms(record.recipient.phone, record.message);
      else if (channel === 'in_app') { /* In-app history is already stored in MongoDB. */ }
      record.deliveryLogs.push({ channel, status: 'delivered', attemptNumber });
    } catch (error) {
      record.deliveryLogs.push({ channel, status: 'failed', attemptNumber, errorMessage: error.message });
    }
  }

  const stillFailed = updateAggregateDeliveryStatus(record);
  record.nextRetryAt = stillFailed.length && record.retryCount < record.maxRetries
    ? new Date(Date.now() + Math.pow(2, record.retryCount - 1) * 60 * 1000)
    : null;
  await record.save();
  return record;
};
