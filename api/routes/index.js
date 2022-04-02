const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games.controller');
const publisherController = require('../controllers/publisher.controller');
const reviewsController = require('../controllers/reviews.controller');

router.route('/games')
    .get(gamesController.getAll)
    .post(gamesController.addOne);

router.route('/games/:gameId')
    .get(gamesController.getOne)
    .delete(gamesController.deleteOne);

router.route('/games/:gameId/publisher')
    .get(publisherController.getOne);

router.route('/games/:gameId/reviews')
    .get(reviewsController.getAll);

router.route('/games/:gameId/reviews/:reviewId')
    .get(reviewsController.getOne);

module.exports = router;
