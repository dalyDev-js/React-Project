import express from "express";
import {
  addCartItems,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const cartRoutes = express.Router();

cartRoutes.get("/cart", verifyToken, getCartItems);
cartRoutes.post("/cart", verifyToken, addCartItems);
cartRoutes.put("/cart/:itemId", verifyToken, updateCartItem);
cartRoutes.delete("/cart/:itemId", verifyToken, deleteCartItem);
export default cartRoutes;
