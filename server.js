const app = require("./app");
const port = process.env.PORT || 8100
const Item = require("./models/item");

app.post("/api/vendor/items", function (req, res) {
    let newItem = new Item(req.body)
    newItem
        .save() //this saves info to the db
        .then(function (savedItem) {  //this is data passed back from db
            return res.json({ item: savedItem }) //returning info from db 
        })
        .catch(function (err) {
            console.log("this is err: ", err); //err is the error from the .then method within mongoose
            return res.status(500).send(err);
        })
});

app.listen(port, function () {
    console.log(`server is running on port ${port}!`);
});