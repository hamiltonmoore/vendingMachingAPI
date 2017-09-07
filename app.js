var express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const bluebird = require("bluebird");
const Item = require("./models/item");
const customerRouter = require("./routes/customerRoutes");
const vendorRouter = require("./routes/vendorRoutes");


const dbUrl = "mongodb://localhost:27017/vendingMachingAPI";
mongoose.Promise = bluebird;
let db = mongoose.connect(dbUrl);

const app = express();

//MIDDLEWARE
app.use(bodyParser.json())
app.use(logger("dev"));

//ROUTES
app.use("/api/customer", customerRouter);
app.use("/api/vendor", vendorRouter);

module.exports = app; 