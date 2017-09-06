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

//middleware
app.use(bodyParser.json())
app.use(logger("dev"));

//ROUTES
//new item for the db
app.post("/api/vendor/items", function (req, res) {
    let newItem = new Item(req.body)
    console.log('INSIDE APP ROUTE.. req.body: ', req.body);
    newItem
        .save() //this saves info to the db
        .then(function (savedItem) {  //this is data passed back from db
            console.log('INSIDE APP ROUTE.. savedItem: ', savedItem);
            return res.json({ item: savedItem }) //returning info from db 
        })
        .catch(function (err) {
            console.log("this is err: ", err); //err is the error from the .then method within mongoose
            return res.status(500).send(err);
        })
});

//see list of items
app.get("/api/customer/items", function (req, res) {
    Item.find(function (foundItem) {
        if (!foundItem) {
            return res.send({ msg: "no Items found" })
        }
        return res.json({ item: foundItem })
    })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

//save a purchase
app.post("/api/customer/items/:itemId/purchases", function (req, res) {
    let newPurchase = new Purchase(req.body)
    newPurchase
        .save()
        .then(function (savedPurchase) {
            return res.json({ item: savedPurchase })
        })
        .catch(function (err) {
            return res.status(500).send(err)
        })
})

//gets a list of purchases with times
app.get("/api/vendor/purchases", function (req, res) {
    Item.find(function (foundPurchases) {
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
app.get("/api/vendor/money", function (req, res) {
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
app.put("/api/vendor/items/:itemId", function (req, res) {
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

module.exports = app; 