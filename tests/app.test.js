const request = require("supertest");
const app = require("../app");
const Item = require("../models/item");

const mockup = {
    description: "lays chips",
    cost: 35
}

//this tests the addition of an item
describe("POST /item", function () {
    let newItemId;
    afterAll(function () {
        return request(app)
            .delete("/api/vendor/items/" + newItemId)  //this is the route we're posting to 
            .send(mockup)
            .then(response => {
                console.log(response.body);
            });
    })

    test("should create new items in machine", function () {
        return request(app)
            .post("/api/vendor/items")  //this is the route we're posting to 
            .send(mockup)
            .then(response => {
                expect(response.status).toBe(200)
                console.log('response.body: ', response.body);
                expect(response.body.description).toBe("lays chips")
                expect(response.body.cost).toBe(35)
                newItemId = response.body._id
            });
    })

    //this tests the purchase of an item
    // test("should test purchase of an item", function () {
    //     return request(app)
    //         .post("/api/customer/items/" + newItemId + "/purchases")
    //         .send(mockup)
    //         .then(response => {
    //             expect(response.status).toBe(200)
    //             expect(response.body.quantity).toBe(5)
    //             expect(response.body.description).toBe("lays")
    //             expect(response.body.cost).toBe(35)
    //         });
    // })
})

//this tests the view of items
describe("GET /api/customer/items", function () {
    test("should return a array", function () {
        return request(app)
            .get("/api/customer/items")
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body).toBeInstanceOf(Array);
            });
    })
    //this tests lists of purchases GET 
    // test("should display purchases", function (response) {
    //     return request(app)
    //         .post("/api/vendor/purchases")
    //         .send(mockup)
    //         .then(response => {
    //             expect(response.status).toBe(200)
    //             expect(response.body.quantity).toBe(5)
    //             expect(response.body.description).toBe("lays")
    //             expect(response.body.cost).toBe(35)
    //         });
    // })
})
//requests amount of money in machine
test("should display amount of money", function (response) {
    return request(app)
        .post("/api/vendor/money")
        .send(mockup)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.quantity).toBe(5)
            expect(response.body.description).toBe("lays")
            expect(response.body.cost).toBe(35)
        });
})

//this updates an item
describe("PUT /item", function () {
    test("should return successfully", function (response) {
        return request(app)
            .post("/api/vendor/items/:itemId")
            .send(mockup)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body.quantity).toBe(5)
                expect(response.body.description).toBe("lays")
                expect(response.body.cost).toBe(35)
            });
    })
})