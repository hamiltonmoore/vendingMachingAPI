const express = require("express");
const vendorRoutes = express.Router();
const Item = require("../models/item");
const purchases = require("../models/purchase");
const till = require("../models/till");

vendorRoutes.post("/items", function (req, res) {
    console.log('INSIDE APP ROUTE.. req.body: ', req.body);
    let newItem = new Item(req.body)
    newItem
        .save() //this saves info to the db
        .then(function (savedItem) {  //this is data passed back from db
            console.log('INSIDE APP ROUTE.. savedItem: ', savedItem);
            return res.json(savedItem) //returning info from db 
        })
        .catch(function (err) {
            console.log("this is err: ", err); //err is the error from the .then method within mongoose
            return res.status(500).send(err);
        })
});

//gets a list of purchases with times
vendorRoutes.get("/purchases", function (req, res) {
    // get purchases not items. 
    purchases.find(function (foundPurchases) {
        if (!foundPurchases) {
            return res.send({ msg: "no purchases found" })
        }
        res.json({ item: foundPurchases })
    })
        .catch(function (err) {
            return res.status(500).send(err)
        })
})

//gets amount of money in machine
vendorRoutes.get("/money", function (req, res) {
    Item.find(function (foundMoney) {
        if (!foundMoney) {
            return res.send({ msg: "no money in machine" })
        }
        res.json({ item: foundPurchases })
    })
        .catch(function (err) {
            return res.status(500).send(err)
        })
})

//updates item description, quantity and cost
vendorRoutes.put("/items/:itemId", function (req, res) {
    Item.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedItem) {
            if (!updatedItem) {
                return res.send({ msg: "could not update item" });
            }
            res.json({ item: updatedItem })
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

// deletes an item 
vendorRoutes.delete("/items/:id", function (req, res) {
    Item.findByIdAndRemove(req.params.id)
        .then(function (updatedItem) {
            console.log('updatedItem: ', updatedItem);
            res.send({ msg: "Item Deleted" });
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

module.exports = vendorRoutes;