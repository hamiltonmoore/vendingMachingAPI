const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create purchase model

// itemName
// itemCost
// moneyInserted
// dateOfPurchase

const purchaseSchema = new Schema({
    itemName: String,
    itemCost: Number,
    moneyInserted: Number,
    moneyReturned: Number,
    dateOfPurchase: String
})

let purchase = mongoose.model("purchase", purchaseSchema);

module.exports = purchase;