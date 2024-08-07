import { signin, signup, verifyEmail } from "../controllers/user.controller.js";
import express from "express";
import { checkEmail } from "../middleware/checkEmail.js";

const userRoutes = express.Router();

userRoutes.post("/signup", checkEmail, signup);
userRoutes.post("/signin", signin);
userRoutes.get("/verify/:token", verifyEmail);

export default userRoutes;
