const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        description: String,
        cost: Number,
    });

let item = mongoose.model("item", itemSchema);

module.exports = item;