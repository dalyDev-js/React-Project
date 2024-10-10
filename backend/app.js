import express from "express";
import cors from "cors";
import { dbConnect } from "./src/db/dbConnect.js";
import productRoutes from "./src/routes/products.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import AppError from "./src/utils/appError.js";
import cartRoutes from "./src/routes/cart.routes.js";

const corsOptions = {
  origin: ["http://localhost:3000", "https://your-production-frontend.com"], // Add your frontend URLs here
  credentials: true, // If you are using cookies or authentication tokens
};

const app = express();
const port = 3001;
app.use(cors(corsOptions));
dbConnect();
app.use(express.json());
app.use(productRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.get("/", (req, res) => res.send("Hello World!"));
app.use("*", (req, res, next) => {
  next(new AppError("URL NOT FOUND", 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
});

app.listen(port, () => console.log("listening on port ", port));
