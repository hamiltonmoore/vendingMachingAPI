const request = require("supertest");
const app = require("../app");

const mockup = {
    description: "lays",
    price: 35,
    quantity: 5
}

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

