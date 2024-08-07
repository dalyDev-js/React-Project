import express from "express";
import { getCartItems } from "../controllers/cart.controller";

const cartRoutes = express.Router();

cartRoutes.get("/cart/:id", getCartItems);
