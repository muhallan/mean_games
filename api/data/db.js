const mongoose = require('mongoose');
require('./games-models');

mongoose.connect(process.env.DB_URL + "/" + process.env.DB_NAME, {useNewURLParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to", process.env.DB_NAME);
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose disconnected");
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose error", err);
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    mongoose.connection.close(() => {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGUSR2", () => {
    mongoose.connection.close(() => {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.exit(process.pid, "SIGUSR2");
    });
});

