const mongoose = require('mongoose');
const Game = mongoose.model(process.env.GAME_MODEL);

module.exports.getAll = (req, res) => {
    console.log("Reviews Get all controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select('reviews').exec((err, game) => {
        console.log("Found reviews");
        res.status(200).json(game.reviews);
    })
};

module.exports.getOne = (req, res) => {
    console.log("Get One review controller");
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    Game.findById(gameId).select('reviews').exec((err, game) => {
        console.log("Found one review");
        res.status(200).json(game.reviews.id(reviewId));
    });
};
