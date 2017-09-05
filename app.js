var express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");

const bluebird = require("bluebird");
const Item = require("./models/item");

const dbUrl = "mongodb://localhost:27017/vendingMachingAPI";
mongoose.Promise = bluebird;
let db = mongoose.connect(dbUrl);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

module.exports = app; 