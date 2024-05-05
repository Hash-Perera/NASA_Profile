const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AuthGuard } = require("./middlewares/auth-guard.js");

//! Initialize Express app
const app = express();

//! Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use(AuthGuard); // Custom middleware to authenticate users

//! Routes
const BASE_URL_V1 = require("./config/base-url.js");

app.use(BASE_URL_V1 + "/auth", require("./routes/auth.routes"));
app.use(BASE_URL_V1 + "/nasa", require("./routes/nasa.routes"));

module.exports = app;
