const mongoose = require('mongoose');
const Game = mongoose.model(process.env.GAME_MODEL);

const getOne = (req, res) => {
    console.log("Get one publisher controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select('publisher').exec((err, game) => {
        console.log("Game found");
        res.status(200).json(game.publisher);
    });
};

module.exports = {
    getOne
}
