import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createTodo, deleteTodo } from "../controllers/todo.js";

const router = express.Router();
router.post("/:calenderID/createTodo", verifyToken, createTodo);
router.delete("/:todoId/deleteTodo", verifyToken, deleteTodo)

export default router;