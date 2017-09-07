const express = require("express");
const customerRoutes = express.Router();
const Item = require("../models/item");
const Purchase = require("../models/purchase");
const Till = require("../models/till");

//see list of items
customerRoutes.get("/items", function (req, res) {
    Item.find()
        .then(function (foundItems) {
            if (!foundItems) {
                return res.send({ msg: "no Items found" })
            }
            return res.json(foundItems)
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})


// make a purchase
customerRoutes.post("/items/:id/purchases/:amountPayed", function (req, res) {
    // Delete the item that was purchased from the database.
    let purchasedItem;
    let purchase;
    Item.findById(req.params.id)
        .then(function (foundItem) {
            purchasedItem = Object.assign({}, foundItem);
            let moneyReturned = parseInt(req.params.amountPayed) - foundItem.cost;
            console.log("PI", purchasedItem);
            if (req.params.amountPayed < purchasedItem.cost) {
                return res.send("Not Enough Money");
            }

            foundItem.remove();
            console.log(parseInt(req.params.amountPayed), purchasedItem.cost)
            console.log('moneyReturned: ', moneyReturned);

            let newPurchase = new Purchase({
                itemName: foundItem.description,
                itemCost: foundItem.cost,
                moneyInserted: parseFloat(req.params.amountPayed),
                moneyReturned: moneyReturned,
                dateOfPurchase: new Date().toString()
            })

            return newPurchase.save();
        }).then(function (savedPurchase) {
            purchase = savedPurchase;
            return Till.findOne();
        }).then(function (till) {
            return till.update({ "balance": till.balance - purchase.moneyReturned });
        }).then(function (till) {
            res.send(purchase);
        })
})

module.exports = customerRoutes;