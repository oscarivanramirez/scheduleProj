import { expect } from "chai";
import chai from "chai"; // Import Chai
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app from "../index.js";
import Calender from "../models/Calender.js"; // Import your Calendar model
import { verifyToken } from "../middleware/auth.js";

chai.use(chaiHttp);

describe("Calendar Routes", () => {
    it("should create a new calendar event", async () => {
        const eventData = {
            title: "Trip to LA",
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
            .post("/calender/createCalender")
            .set("Authorization", `Bearer ${authToken}`)
            .send(eventData)

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


//router.post("/:calenderID/addOwner/:ownerID", verifyToken, addOwner);
describe.only("Calender Routes", () => {
    it("Adding an Owner to my Calender", async () => {

        // Perform authentication and get an authentication token
        const authResult = await chai.request(app)
            .post("/auth/login")
            .send({
                email: "butt@example.com",
                password: "heybutt123",
            });

        const authToken = authResult.body.token;

        // Perform the request with the authentication token
        const response = await chai.request(app)
            //post("/calender/ggg/addOwner/fff") incorrect to see if test would fail
            .post("/calender/64fd16e9c727f1a3c151d443/addOwner/64da763f31c07b5d588de1b1")
            .set("Authorization", `Bearer ${authToken}`)

        // Assert that the response status is 201
        //console.log("response",response)
        //expect(response.status).to.equal(201);
        
        // Optional: Assert other properties of the response
        
        // Check if the calendar event was actually saved to the database
        // const savedEvent = await Calender.findOne({ title: eventData.title });
        // expect(savedEvent).to.exist;
        // expect(savedEvent.owner).to.equal(eventData.owner);
    });

    // Add more test cases for different scenarios
});


/*
describe("Calender Routes", () => {
    it("Deleting a Calender", async () => {

        // Perform authentication and get an authentication token
        const authResult = await chai.request(app)
            .post("/auth/login")
            .send({
                email: "butt@example.com",
                password: "heybutt123",
            });

        const authToken = authResult.body.token;

        // Perform the request with the authentication token
        const response = await chai.request(app)
            //post("/calender/ggg/addOwner/fff") incorrect to see if test would fail
            .delete("/calender/64e6a77ccdc915815678f367/deleteCalender")
            .set("Authorization", `Bearer ${authToken}`)

        // Assert that the response status is 201
        //console.log("response",response)
        //expect(response.status).to.equal(201);
        
        // Optional: Assert other properties of the response
        
        // Check if the calendar event was actually saved to the database
        // const savedEvent = await Calender.findOne({ title: eventData.title });
        // expect(savedEvent).to.exist;
        // expect(savedEvent.owner).to.equal(eventData.owner);
    });

    // Add more test cases for different scenarios
});

*/