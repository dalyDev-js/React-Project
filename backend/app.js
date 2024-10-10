import express from "express";
import cors from "cors";
import { dbConnect } from "./src/db/dbConnect.js";
import productRoutes from "./src/routes/products.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import AppError from "./src/utils/appError.js";
import cartRoutes from "./src/routes/cart.routes.js";

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "https://react-project-production-5a86.up.railway.app"], // Your frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all necessary HTTP methods
  credentials: true, // Allow cookies and credentials to be passed
  allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  optionsSuccessStatus: 200, // Response status for successful OPTIONS requests
};

const app = express();
const port = process.env.PORT || 3001;
app.use(cors(corsOptions));
// Apply CORS middleware
app.options("*", cors(corsOptions));

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
