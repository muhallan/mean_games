const dbconnection = require('../games/dbconnection');

module.exports.getAll = (req, res) => {

    let offset = 0;
    let count = 3;

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count < 0 || count > 10) {
            count = 3;
        }
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    const db = dbconnection.get();
    const gamesCollection = db.collection("games");

    gamesCollection.find().skip(offset).limit(count).toArray((err, games) => {
        res.status(200).json(games);
    });

};