import express from "express";
import cors from "cors";
import { dbConnect } from "./src/db/dbConnect.js";
import productRoutes from "./src/routes/products.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import AppError from "./src/utils/appError.js";
import cartRoutes from "./src/routes/cart.routes.js";

 

const app = express();
const port = process.env.PORT || 3001;
 app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  // If it's an OPTIONS request, return early
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

dbConnect();

// Middleware to parse JSON
app.use(express.json());

// Define your routes
app.use(productRoutes);
app.use(userRoutes);
app.use(cartRoutes);

// Root route
app.get("/", (req, res) => res.send("Hello World!"));

// Catch-all for undefined routes
app.use("*", (req, res, next) => {
  next(new AppError("URL NOT FOUND", 404));
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

// Start server
app.listen(port, () => console.log(`Backend is running on port ${port}`));
