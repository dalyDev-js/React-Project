import express from "express";
import { dbConnect } from "./src/db/dbConnect.js";
import productRoutes from "./src/routes/products.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import AppError from "./src/utils/appError.js";

const app = express();
const port = 3000;

dbConnect();
app.use(express.json());
app.use(productRoutes);
app.use(userRoutes);

app.use("*", (req, res, next) => {
  next(new AppError("URL NOT FOUND", 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log("listening on port ", port));
