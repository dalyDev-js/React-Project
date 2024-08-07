import express from "express";
import { getProducts } from "../controllers/products.controller.js";

const productRoutes = express.Router();

productRoutes.get("/products", getProducts);

export default productRoutes;
