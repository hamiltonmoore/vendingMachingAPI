const request = require("supertest");
const app = require("../app");
const Item = require("../models/item");

const mockup = {
    description: "lays",
    price: 35,
    quantity: 5
}

//this tests the addition of an item
describe("POST /item", function () {
    test("should create new items in machine", function () {
        console.log('mockup: ', mockup);
        return request(app)
            .post("/api/vendor/items")  //this is the route we're posting to 
            .send(mockup)
            .then(response => {
                expect(response.status).toBe(200)
                console.log('response.body: ', response.body);
                expect(response.body.data.quantity).toBe(5)
                expect(response.body.data.description).toBe("lays")
                expect(response.body.data.price).toBe(35)
            });
    })

    //this tests the purchase of an item
    test("should test purchase of an item", function () {
        return request(app)
            .post("/api/customer/items/:itemId/purchases")
            .send(mockup)
            .then(response => {
                exepct(response.status).toBe(200)
                expect(response.body.data.quantity).toBe(5)
                expect(response.body.data.description).toBe("lays")
                expect(response.body.data.price).toBe(35)
            });
    })
})

//this tests the view of items
describe("GET /item", function () {
    test("should return successfully", function () {
        return request(app)
            .post("/api/customer/items")
            .send(mockup)
            .then(response => {
                exepct(response.status).toBe(200)
                expect(response.body.data.quantity).toBe(5)
                expect(response.body.data.description).toBe("lays")
                expect(response.body.data.price).toBe(35)
            });
    })
    //this tests lists of purchases GET 
    test("should display purchases", function (response) {
        return request(app)
            .post("/api/vendor/purchases")
            .send(mockup)
            .then(response => {
                expect(response.status).toBe(200)
                expect(response.body.data.quantity).toBe(5)
                expect(response.body.data.description).toBe("lays")
                expect(response.body.data.price).toBe(35)
            });
    })
})
//requests amount of money in machine
test("should display amount of money", function (response) {
    return request(app)
        .post("/api/vendor/money")
        .send(mockup)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.data.quantity).toBe(5)
            expect(response.body.data.description).toBe("lays")
            expect(response.body.data.price).toBe(35)
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
                expect(response.body.data.quantity).toBe(5)
                expect(response.body.data.description).toBe("lays")
                expect(response.body.data.price).toBe(35)
            });
    })
})