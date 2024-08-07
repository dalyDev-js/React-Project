import productModel from "../models/Product.js";
import catchError from "../middleware/catchError.js";

const getProducts = catchError(async (req, res) => {
  let products = await productModel.find({});
  res.status(200).json({ message: "success", products });
});

export { getProducts };
