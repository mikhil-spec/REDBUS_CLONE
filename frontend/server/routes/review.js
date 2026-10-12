const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review');
const { attachUser, requireVerified, bindCustomer } = require('../middleware/auth');

router.post('/', attachUser, requireVerified, bindCustomer, reviewController.createReview);
router.get('/buses', reviewController.listReviewedBuses);
router.get('/bus/:busId', reviewController.getRouteReviews);
router.put('/:reviewId', attachUser, requireVerified, bindCustomer, reviewController.updateReview);
router.post('/:reviewId/helpful', attachUser, requireVerified, bindCustomer, reviewController.voteHelpfulReview);
router.post('/:reviewId/report', attachUser, requireVerified, bindCustomer, reviewController.reportReview);
router.get('/eligible/:customerId', attachUser, requireVerified, bindCustomer, reviewController.getEligibleCompletedBookings);

module.exports = router;
