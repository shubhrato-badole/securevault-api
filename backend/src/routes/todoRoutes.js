import express from "express";
import {
  getTodos,
  createTodos,
  deleteTodos,
} from "../controllers/todoController.js";
import { AuthenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", AuthenticateToken, getTodos);
router.post("/", AuthenticateToken, createTodos);
router.delete("/:id", AuthenticateToken, deleteTodos);

export default router;