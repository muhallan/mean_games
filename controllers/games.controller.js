const dbconnection = require('../games/dbconnection');
const ObjectId = require('mongodb').ObjectId;

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

    const gamesCollection = getGamesCollection();

    gamesCollection.find().skip(offset).limit(count).toArray((err, games) => {
        res.status(200).json(games);
    });

};

module.exports.getOne = (req, res) => {
    const gamesController = getGamesCollection();
    const gameId = req.params.gameId;

    gamesController.findOne({_id: ObjectId(gameId)}, (err, game) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(game);
        }
    });
};

module.exports.addOne = (req, res) => {
    const gamesCollection = getGamesCollection();

    let newGame = {};

    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        if (parseInt(req.body.minPlayers) < 1 || parseInt(req.body.minPlayers) > 11) {
            return res.status(400).json({message: "The minimum number of players should be between 1 and 11"});
        } else {
            newGame.minPlayers = req.body.minPlayers;
        }
        if (parseInt(req.body.minAge) < 6 || parseInt(req.body.minAge) > 99) {
            return res.status(400).json({message: "Minimum age should be between 6 and 99"});
        } else {
            newGame.minAge = req.body.minAge;
        }

        gamesCollection.insertOne(newGame, (err, savedGame) => {
            if (err) {
                res.status(500).json({error: err});
            } else {
                res.status(201).json(savedGame);
            }
        });
    } else {
        res.status(400).json({message: "Incomplete data. A game requires title, price, minPlayers and minAge"})
    }
};

module.exports.deleteOne = (req, res) => {
    const gamesCollection = getGamesCollection();
    const gameId = req.params.gameId;
    gamesCollection.deleteOne({_id: ObjectId(gameId)}, (err, result) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(204).json();
        }
    });
};

const getGamesCollection = () => {
    const db = dbconnection.get();
    return db.collection("games");
}
