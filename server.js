const app = require("./app");
const port = process.env.PORT || 8100

//function to add money in machine:
// function addMoney() {
//     let sum;
//     for (i = 0; i < argument.length; i++) {
//         sum = arguments[i] + 
//      }
//     addMoney({ foundItem: foundItem: {item: cost }})
// }

app.listen(port, function () {
    console.log(`server is running on port ${port}!`);
});

