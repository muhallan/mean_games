const express = require('express');
require("dotenv").config();
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function() {
    console.log(process.env.LISTEN_TO_PORT_MSG, server.address().port);
});
