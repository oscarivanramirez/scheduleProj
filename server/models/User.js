import mongoose from "mongoose";
import Calender from "../models/Calender.js";
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 20
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 20
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: []
        },
        calender: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calender' }],
        bio: String,
    }, {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;