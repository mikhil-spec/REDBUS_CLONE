const Notification =
  require('../models/notification');

const Customer =
  require('../models/customer');

const {
  dispatchNotification,
  retryFailedNotification
} =
  require('../services/notificationDispatcher');

// Fetch notification history
exports.getUserNotifications =
  async (req, res) => {
    try {
      const { customerId } =
        req.params;

      const {
        unreadOnly,
        eventType
      } = req.query;

      const customer =
        await Customer.findById(
          customerId
        ).select('_id');

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            'Customer not found.'
        });
      }

      const filter = {
        recipient: customer._id
      };

      if (unreadOnly === 'true') {
        filter.isRead = false;
      }

      if (eventType) {
        filter.eventType =
          eventType;
      }

      const notifications =
        await Notification.find(
          filter
        )
          .sort({
            createdAt: -1
          })
          .limit(100);

      const unreadCount =
        await Notification.countDocuments(
          {
            recipient:
              customer._id,
            isRead: false
          }
        );

      return res.status(200).json({
        success: true,
        unreadCount,
        count:
          notifications.length,
        data:
          notifications
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          'Failed to retrieve notification history.',
        error: error.message
      });
    }
  };

// Mark one/all as read
exports.markAsRead =
  async (req, res) => {
    try {
      const {
        notificationId
      } = req.params;

      const {
        customerId,
        markAll
      } = req.body;

      if (!customerId) {
        return res.status(400).json({
          success: false,
          message:
            'customerId is required.'
        });
      }

      const customer =
        await Customer.findById(
          customerId
        ).select('_id');

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            'Customer not found.'
        });
      }

      if (markAll) {
        await Notification.updateMany(
          {
            recipient:
              customer._id,
            isRead: false
          },
          {
            $set: {
              isRead: true
            }
          }
        );

        return res.status(200).json({
          success: true,
          message:
            'All notifications marked as read.'
        });
      }

      const notification =
        await Notification.findOneAndUpdate(
          {
            _id:
              notificationId,
            recipient:
              customer._id
          },
          {
            $set: {
              isRead: true
            }
          },
          {
            new: true
          }
        );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message:
            'Notification not found.'
        });
      }

      return res.status(200).json({
        success: true,
        data:
          notification
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          'Unable to update notification status.',
        error: error.message
      });
    }
  };

// Get preferences
exports.getPreferences =
  async (req, res) => {
    try {
      const { customerId } =
        req.params;

      const customer =
        await Customer.findById(
          customerId
        ).select(
          'notificationPreferences name email phone'
        );

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            'Customer not found.'
        });
      }

      return res.status(200).json({
        success: true,
        data:
          customer.notificationPreferences
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          'Failed to fetch preferences.',
        error: error.message
      });
    }
  };

// Update preferences
exports.updatePreferences =
  async (req, res) => {
    try {
      const { customerId } =
        req.params;

      const {
        preferredLanguage,
        channels,
        eventSubscriptions,
        pushToken
      } = req.body;

      const customer =
        await Customer.findById(
          customerId
        );

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            'Customer not found.'
        });
      }

      if (!customer.notificationPreferences) {
        customer.notificationPreferences =
          {};
      }

      if (preferredLanguage) {
        customer.notificationPreferences.preferredLanguage =
          preferredLanguage;
      }

      if (channels) {
        customer.notificationPreferences.channels =
          {
            ...customer
              .notificationPreferences
              .channels,
            ...channels
          };
      }

      if (eventSubscriptions) {
        customer
          .notificationPreferences
          .eventSubscriptions =
          {
            ...customer
              .notificationPreferences
              .eventSubscriptions,
            ...eventSubscriptions
          };
      }

      if (pushToken !== undefined) {
        customer
          .notificationPreferences
          .pushToken =
          pushToken;
      }

      await customer.save();

      return res.status(200).json({
        success: true,
        message:
          'Notification preferences updated successfully.',
        data:
          customer.notificationPreferences
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          'Error saving notification preferences.',
        error: error.message
      });
    }
  };

// Save a browser Web Push subscription for the authenticated traveler.
exports.savePushSubscription = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user._id);
    const subscription = req.body?.subscription;
    if (!subscription || typeof subscription !== 'object' || !subscription.endpoint) {
      return res.status(400).json({ success: false, message: 'A valid Web Push subscription is required.' });
    }
    customer.notificationPreferences = customer.notificationPreferences || {};
    customer.notificationPreferences.pushSubscription = JSON.stringify(subscription);
    customer.notificationPreferences.pushToken = subscription.endpoint;
    await customer.save();
    return res.status(200).json({ success: true, message: 'Push subscription saved.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to save push subscription.', error: error.message });
  }
};

// Dispatch notification
exports.sendTestNotification =
  async (req, res) => {
    try {
      const {
        recipientId,
        eventType,
        templateData,
        metadata
      } = req.body;

      if (!recipientId || !eventType) {
        return res.status(400).json({
          success: false,
          message: 'recipientId and eventType are required.'
        });
      }

      // This endpoint is a self-service demo/test action, not a privileged
      // notification broadcast API. Never let a regular user target another account.
      if (String(recipientId) !== String(req.user._id)) {
        return res.status(403).json({
          success: false,
          message: 'You can only send test notifications to your own account.'
        });
      }

      const allowedEventTypes = new Set([
        'BOOKING_CONFIRMATION',
        'BOOKING_CANCELLATION',
        'SCHEDULE_CHANGE',
        'JOURNEY_REMINDER',
        'PROMOTIONAL_OFFER'
      ]);
      if (!allowedEventTypes.has(eventType)) {
        return res.status(400).json({ success: false, message: 'Unsupported notification event type.' });
      }

      const dispatched = await dispatchNotification({
        recipientId: req.user._id,
        eventType,
        templateData: templateData || {},
        metadata: metadata || {}
      });

      return res.status(201).json({
        success: true,
        message:
          'Notification dispatched.',
        data:
          dispatched
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          'Dispatch failed.',
        error: error.message
      });
    }
  };

// Retry failed notification
exports.retryNotification =
  async (req, res) => {
    try {
      const {
        notificationId
      } = req.params;

      const {
        customerId
      } = req.body;

      if (!customerId) {
        return res.status(400).json({
          success: false,
          message:
            'customerId is required.'
        });
      }

      const ownedNotification =
        await Notification.findOne({
          _id:
            notificationId,
          recipient:
            customerId
        }).select('_id');

      if (!ownedNotification) {
        return res.status(404).json({
          success: false,
          message:
            'Notification not found.'
        });
      }

      const result =
        await retryFailedNotification(
          notificationId
        );

      return res.status(200).json({
        success: true,
        message:
          'Retry routine completed.',
        data:
          result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message ||
          'Retry failed.'
      });
    }
  };

// Moderator/admin promotional campaign. Sends PROMOTIONAL_OFFER only to verified
// travelers who have explicitly opted in to promotions. Delivery runs in the
// background, so the request returns at once with the number of recipients queued.
exports.sendPromotionCampaign = async (req, res) => {
  try {
    const promoCode = String(req.body?.promoCode || '').trim().toUpperCase();
    const discountPercentage = Number(req.body?.discountPercentage);

    if (!/^[A-Z0-9]{3,20}$/.test(promoCode)) {
      return res.status(400).json({ success: false, message: 'promoCode must be 3-20 letters or digits.' });
    }
    if (!Number.isFinite(discountPercentage) || discountPercentage < 1 || discountPercentage > 90) {
      return res.status(400).json({ success: false, message: 'discountPercentage must be between 1 and 90.' });
    }

    const recipients = await Customer.find({
      isVerified: true,
      'notificationPreferences.eventSubscriptions.promotions': true,
    }).select('_id').limit(5000).lean();

    const response = res.status(202).json({
      success: true,
      message: 'Promotional campaign queued for delivery.',
      queued: recipients.length,
    });

    (async () => {
      let sent = 0;
      let skipped = 0;
      let failed = 0;
      for (const recipient of recipients) {
        try {
          const record = await dispatchNotification({
            recipientId: recipient._id,
            eventType: 'PROMOTIONAL_OFFER',
            templateData: { promoCode, discountPercentage: String(discountPercentage) },
            metadata: { campaign: promoCode },
          });
          if (record) sent += 1; else skipped += 1;
        } catch (error) {
          failed += 1;
          console.error('[Promotions] delivery failed for', String(recipient._id), error.message);
        }
      }
      console.log(`[Promotions] campaign ${promoCode} finished: sent=${sent} skipped=${skipped} failed=${failed}`);
    })();

    return response;
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to start the promotional campaign.', error: error.message });
  }
};
