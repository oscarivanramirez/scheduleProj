import { expect } from "chai";
import chai from "chai"; // Import Chai
import chaiHttp from "chai-http";
import app from "../index.js";


chai.use(chaiHttp);

// router.get("/user/search", search);
describe("Search Schema", () => {
    it("searching through users", async () => {

        // Perform authentication and get an authentication token
        const authResult = await chai.request(app)
            .post("/auth/login")
            .send({
                email: "oscar@example.com",
                password: "heybutt123",
            });

        const authToken = authResult.body.token;

        // Perform the request with the authentication token
        const response = await chai.request(app)
            .get("/user/search?q=John")
            .set("Authorization", `Bearer ${authToken}`)

        // Assert that the response status is 201
        //console.log("response",response)
        expect(response.status).to.equal(200);
        
    });

    // Add more test cases for different scenarios
});
