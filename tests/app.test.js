const request = require("supertest");
const app = require("../app");

const mockup = {
    description: "lays",
    price: 35,
    quantity: 5
}

//this tests the addition of an item
describe("POST /item", function () {
    test("should return successfully", function () {
        return request(app)
            .post("/api/vendor/items")  //this is the route we're posting to 
            .send(item)
            .expect(response.status).toBe(200)
            .expect(reponse.body.data.quantity).toBe(5)
            .expect(response.body.data.description).toBe("lays")
            .expect(response.body.data.price).toBe(35)
            .expect(function (res) {
            });
    })
})

//this tests the view of items
describe("GET /item", function () {
    test("should return successfully", function () {
        return request(app)
            .post("/api/customer/items")
            .send(item)
            .exepct(response.status).toBe(200)
            .expect(response.body.data.quantity).toBe(5)
            .expect(response.body.data.description).toBe("lays")
            .expect(response.body.data.price).toBe(35)
            .expect(function (res) {
            });
    })
})

//this tests the purchase of an item
describe("POST /item", function () {
    test("should return successfully", function () {
        return request(app)
            .post("/api/customer/items/:itemId/purchases")
            .send(item)
            .exepct(response.status).toBe(200)
            .expect(response.body.data.quantity).toBe(5)
            .expect(response.body.data.description).toBe("lays")
            .expect(response.body.data.price).toBe(35)
            .expect(function (res) {
            });
    })
})

//this tests lists of purchases GET 
describe("GET /item", function () {
    test("should return successfully", function () {
        return request(app)
            .post("/api/vendor/purchases")
            .send(item)
            .expect(response.status).toBe(200)
            .expect(response.body.data.quantity).toBe(5)
            .expect(response.body.data.description).toBe("lays")
            .expect(response.body.data.price).toBe(35)
            .expect(function (res) {
            });
    })
})

