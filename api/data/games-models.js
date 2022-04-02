const mongoose = require('mongoose');

const PublisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    established: Number
});

const ReviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.Now
    }
});

const GamesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 11
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 11
    },
    minAge: {
        type: Number,
        min: 6,
        max: 99
    },
    reviews: [ReviewSchema],
    publisher: PublisherSchema,
    designers: [String]
});

mongoose.model(process.env.GAME_MODEL, GamesSchema, process.env.GAME_COLLECTION);
