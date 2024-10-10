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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow local frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow all required methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow necessary headers
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  if (req.method === "OPTIONS") {
    // Handle preflight request
    return res.sendStatus(204); // Preflight checks are fine, return no content
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
