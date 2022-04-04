const dbconnection = require('../data/dbconnection');

const mongoose = require('mongoose');
const Game = mongoose.model(process.env.GAME_MODEL);

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

    Game.find().skip(offset).limit(count).exec((err, games) => {
        res.status(200).json(games);
    });

};

module.exports.getOne = (req, res) => {

    const gameId = req.params.gameId;

    Game.findById(gameId).exec((err, game) => {
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
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec((err, result) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(204).json();
        }
    });
};

module.exports.replaceOne = (req, res) => {
    console.log("replace one game controller");
    _updateOne(req, res, _setFullGameUpdates);
};

module.exports.partialUpdateOne = (req, res) => {
    console.log("Patch one game controller");
    _updateOne(req, res, _setPartialGameUpdates);
};

const _updateOne = (req, res, setGameUpdates) => {
    const response = {
        status: 200,
        message: {}
    };

    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Invalid game ID");
        response.status = 500;
        response.message = {message: "Invalid Game ID provided"};
    } else {
        Game.findById(gameId).exec((err, game) => _getGameUpdateCallback(err, game, req, res, response, setGameUpdates));
    }
    if (response.status !== 200) {
        res.status(response.status).json(response.message);
    }
};

const _setFullGameUpdates = (req, game, response) => {
    game.title = req.body.title;
    game.year = req.body.year;
    game.rate = req.body.rate;
    game.price = req.body.price;
    game.minPlayers = req.body.minPlayers;
    game.maxPlayers = req.body.maxPlayers;
    game.minAge = req.body.minAge;
    game.publisher = req.body.publisher;
    game.designers = req.body.designers;
    let reviews = req.body.reviews;
    if (Array.isArray(reviews)) {
        reviews = reviews.filter(review => Object.keys(review).length != 0);
    } else {
        reviews = [];
    }
    game.reviews = reviews;
}

const _getGameUpdateCallback = (err, game, req, res, response, setGameUpdates) => {
    if (err) {
        console.log("Error reading games");
        response.status = 500;
        response.message = {error: err};
    } else if(!game) {
        console.log("Game not found");
        response.status = 404;
        response.message = {message: "Game with id " + gameId + " not found"};
    } else {
        console.log("Game found");
   
        setGameUpdates(req, game, response);

        game.save((err, savedGame) => _saveUpdatedGameCallback(err, savedGame, res, response));
    }
    if (response.status !== 200) {
        res.status(response.status).json(response.message);
    }
};

const _setPartialGameUpdates = (req, game, response) => {
    game.title = req.body.title || game.title;
    game.year = req.body.year || game.year;
    game.rate = req.body.rate || game.rate;
    game.price = req.body.price || game.price;
    game.minPlayers = req.body.minPlayers || game.minPlayer;
    game.maxPlayers = req.body.maxPlayers || game.maxPlayer;
    game.minAge = req.body.minAge || game.minAge;
    game.publisher = req.body.publisher || game.publisher;
    game.designers = req.body.designers || game.designers;
    let reviews = req.body.reviews;
    if (Array.isArray(reviews)) {
        reviews = reviews.filter(review => Object.keys(review).length != 0);
    } else if (!reviews) {
        let currentReviews = game.reviews;
        currentReviews = currentReviews.filter(review => Object.keys(review).length != 0);
        reviews = currentReviews
    } else if (reviews) {
        response.status = 400;
        response.message = "reviews must be an array of review objects";
    }
    game.reviews = reviews;
};

const _saveUpdatedGameCallback = (err, savedGame, res, response) => {
    if (err) {
        console.log("Error saving games");
        response.status = 500;
        response.message = {error: err};
    } else {
        console.log("Game updated");
        response.status = 200;
        response.message = savedGame;
    }
    res.status(response.status).json(response.message);
}

const getGamesCollection = () => {
    const db = dbconnection.get();
    return db.collection("games");
}
