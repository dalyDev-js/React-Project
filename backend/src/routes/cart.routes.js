import express from "express";
import { addCartItems, getCartItems } from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const cartRoutes = express.Router();

cartRoutes.get("/cart", verifyToken, getCartItems);
cartRoutes.post("/cart", verifyToken, addCartItems);

export default cartRoutes;
