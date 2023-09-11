import mongoose from "mongoose"
import Calender from "../models/Calender.js"
import User from "../models/User.js"

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            min: 1,
            max: 10,
        },
        startDate: {
            type: Date, // Use the Date data type for start date
            required: true,
        },
        endDate: {
            type: Date, // Use the Date data type for end date
            required: true,
        },
        startTime: {
            type: String,
            required: true,
            validate: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Regular expression for HH:MM format
        },        
        endTime: {
            type: String,
            required: true,
            validate: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Regular expression for HH:MM format
        },        
        description: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        calender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Calender",
            required: true,
        },
        
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }, {timestamps: true}
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;