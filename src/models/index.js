const dbConfig = require("../database/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// db.investors = require("./investor.model.js")(mongoose);
db.investees = require("../models/investee_model.js")(mongoose);
// db.tickers = require("./ticker.model.js")(mongoose);

module.exports = db;