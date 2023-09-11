import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createCalender, deleteCalender, addOwner } from "../controllers/calender.js";

const router = express.Router();
router.post("/createCalender", verifyToken, createCalender);
router.delete("/:calenderID/deleteCalender", verifyToken, deleteCalender);
router.post("/:calenderID/addOwner/:ownerID", verifyToken, addOwner);

export default router;