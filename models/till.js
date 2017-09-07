const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a till model
// balance

const tillSchema = new Schema({
    balance: Number,
})

let till = mongoose.model("till", tillSchema);

module.exports = till;