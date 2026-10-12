const express = require('express');
const router = express.Router();
const communityController = require('../controller/community');
const { attachUser, requireVerified, bindCustomer, requireModerator } = require('../middleware/auth');

router.get('/posts', communityController.getAllPosts);
router.get('/moderation/reported', attachUser, requireVerified, bindCustomer, requireModerator, communityController.getModerationQueue);
router.post('/posts', attachUser, requireVerified, bindCustomer, communityController.createPost);
router.get('/posts/:id', communityController.getPostById);

router.post('/posts/:postId/like', attachUser, requireVerified, bindCustomer, communityController.toggleLikePost);
router.post('/posts/:postId/comments', attachUser, requireVerified, bindCustomer, communityController.addComment);
router.post('/posts/:postId/report', attachUser, requireVerified, bindCustomer, communityController.reportPost);

router.patch('/posts/:postId/moderate', attachUser, requireVerified, requireModerator, bindCustomer, communityController.moderatePost);
router.get('/profile/:customerId', communityController.getTravelerProfile);

module.exports = router;
