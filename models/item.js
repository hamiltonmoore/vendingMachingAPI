const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        data:
        {
            id: String,
            description: String,
            cost: Number,
            quantity: Number
        },

    });

let item = mongoose.model("item", itemSchema);

module.exports = item;