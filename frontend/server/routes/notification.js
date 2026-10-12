const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notification');
const { attachUser, bindCustomer, requireVerified, requireModerator } = require('../middleware/auth');

router.get('/user/:customerId', attachUser, bindCustomer, notificationController.getUserNotifications);
router.patch('/read/:notificationId', attachUser, bindCustomer, notificationController.markAsRead);
router.patch('/read-all', attachUser, bindCustomer, notificationController.markAsRead);
router.get('/preferences/:customerId', attachUser, bindCustomer, notificationController.getPreferences);
router.put('/preferences/:customerId', attachUser, requireVerified, bindCustomer, notificationController.updatePreferences);
router.post('/push-subscription', attachUser, requireVerified, bindCustomer, notificationController.savePushSubscription);
router.post('/dispatch', attachUser, requireVerified, bindCustomer, notificationController.sendTestNotification);
router.post('/campaign/promotions', attachUser, requireVerified, bindCustomer, requireModerator, notificationController.sendPromotionCampaign);
router.post('/retry/:notificationId', attachUser, bindCustomer, notificationController.retryNotification);

module.exports = router;
