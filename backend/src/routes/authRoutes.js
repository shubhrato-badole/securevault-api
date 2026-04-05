import express from "express"
import {register , login , logout , me } from "../controllers/authController.js";
import {rateLimiter} from "../middleware/rateLimiter.js";
import { validate, authSchema } from "../middleware/validationMiddleware.js";
import { AuthenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", rateLimiter, validate(authSchema), register);
router.post("/login", rateLimiter, validate(authSchema), login);
router.post("/logout", logout);
router.get("/me", AuthenticateToken, me);

export default router;