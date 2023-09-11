import express from "express";
import { search } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/search", verifyToken, search);

export default router;