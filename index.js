require("dotenv").config();
require("./api/data/dbconnection").open();
require("./api/data/db");
const express = require('express');

const path = require("path");
const routes = require("./api/routes");

const app = express();

app.use("/api", (req, res, next) => {
    console.log(req.headers);
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    // res.header("Access-Contol-Allow-Headers", "Accept, Accept-Language, Content-Language, Content-Type");
    res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function() {
    console.log(process.env.LISTEN_TO_PORT_MSG, server.address().port);
});
