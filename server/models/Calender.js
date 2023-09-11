import mongoose from "mongoose";
import User from "../models/User.js"
import Todo from "../models/Todo.js"
const calenderSchema = new mongoose.Schema(
    {
        todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
        title: {
            type: String,
            required: true,
            min: 1,
            max: 20,
        },
        owner: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }],
    }, {timestamps: true}
);

const Calender = mongoose.model("Calender", calenderSchema);
export default Calender;