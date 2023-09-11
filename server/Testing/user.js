import { expect } from "chai";
import mongoose from "mongoose";
import chai from "chai"; // Import Chai
import chaiHttp from "chai-http"; // Import Chai HTTP plugin
import app from "../index.js"; // Import your Express app
import User from "../models/User.js";
import dotenv from "dotenv"; // Import dotenv
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// Initialize Chai HTTP plugin
chai.use(chaiHttp);

describe("User Model", () => {
    before(async () => {
        // Connect to your MongoDB Atlas database
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    after(async () => {
        // Disconnect after tests are done
        await mongoose.disconnect();
    });

    it("should create a new user", async () => {
        const userData = {
            firstName: "Kylian",
            lastName: "Mbappe",
            email: "osc@gmail.com",
            password: "Lgtb2023!!",
            bio: "get money",
        };

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        expect(savedUser).to.have.property("firstName", "Kylian");
        // Add more assertions as needed
    });
});

describe.only('POST /auth/register', () => {

    it('should register a new user', (done) => {
        const userData = {
            firstName: 'oscar',
            lastName: 'rami',
            email: 'oscar@example.com',
            password: 'heybutt123',
            bio: 'alone',
        };

        chai.request(app) // Use chai-http to make the request
            .post('/auth/register')
            .type('form') // Specify the content type as form
            .attach('picture', fs.readFileSync('/Users/oscarramirez/Desktop/ScheduleProj/server/public/img/IMG_7226.jpg'), 'oscar.jpg') // Attach the image
            .field(userData) // Add the rest of the userData
            .end((err, res) => {
                expect(res).to.have.status(201); // Assuming successful registration returns 201 status
                // Add more assertions as needed

                done(); // Call done to indicate the test is complete
            });
    });

    // Add more test cases for different scenarios, such as invalid data, duplicate email, etc.
});
