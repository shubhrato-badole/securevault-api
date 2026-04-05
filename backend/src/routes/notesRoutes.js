import express from "express";
import {getNotes , createNotes, deleteNotes} from "../controllers/notesController.js"
import { AuthenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", AuthenticateToken, getNotes);
router.post("/", AuthenticateToken, createNotes);
router.delete("/:id", AuthenticateToken, deleteNotes);

export default router;

