import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";


import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
const result = dotenv.config();
console.log(result);
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/todo", todoRoutes);

export default app;