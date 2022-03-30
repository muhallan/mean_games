const gameData = require('../games/games.json');

module.exports.getAll = (req, res) => {

    let offset = 0;
    let count = 5;

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    const pagedGames = gameData.slice(offset, offset + count);
    res.status(200).json(pagedGames);
};