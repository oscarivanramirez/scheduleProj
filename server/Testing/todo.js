import { expect } from "chai";
import chai from "chai"; // Import Chai
import chaiHttp from "chai-http";
import app from "../index.js";


chai.use(chaiHttp);

// router.post("/:calenderID/createTodo", verifyToken, createTodo);
describe("Todo Schema", () => {
    it("should create a new todo", async () => {
        const todoData = {
            title: "Trip to Getty Observatory",
            startDate: new Date("2023-08-10"),
            endDate: new Date("2023-08-10"),
            startTime: "12:30",
            endTime: "14:00",
            city: "Los Angeles",
            state: "California",
            country: "US",
        };

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
            .post("/todo/64fd16e9c727f1a3c151d443/createTodo")
            .set("Authorization", `Bearer ${authToken}`)
            .send(todoData)

        // Assert that the response status is 201
        //console.log("response",response)
        expect(response.status).to.equal(201);
        
        // Optional: Assert other properties of the response
        
        // Check if the calendar event was actually saved to the database
        // const savedEvent = await Calender.findOne({ title: eventData.title });
        // expect(savedEvent).to.exist;
        // expect(savedEvent.owner).to.equal(eventData.owner);
    });

    // Add more test cases for different scenarios
});

//router.delete("/:todoId/deleteTodo", verifyToken, deleteTodo)
describe.only("Todo Schema", () => {
    it("should delete an existing todo", async () => {

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
            .delete("/todo/64fe70c3fef4e438c9dbc4da/deleteTodo")
            .set("Authorization", `Bearer ${authToken}`)

        // Assert that the response status is 201
        //console.log("response",response)
        expect(response.status).to.equal(201);
        
    });

    // Add more test cases for different scenarios
});