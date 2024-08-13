import productModel from "../models/Product.js";
import catchError from "../middleware/catchError.js";

// Get all products
const getProducts = catchError(async (req, res) => {
  let products = await productModel.find({});
  res.status(200).json({ message: "success", products });
});

// Get a single product by ID
const getProductById = catchError(async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "success", product });
});

// Create a new product
const createProduct = catchError(async (req, res) => {
  const newProduct = new productModel(req.body);
  const savedProduct = await newProduct.save();
  res.status(201).json({ message: "Product created", product: savedProduct });
});

// Update an existing product
const updateProduct = catchError(async (req, res) => {
  const updatedProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "Product updated", product: updatedProduct });
});

// Delete a product
const deleteProduct = catchError(async (req, res) => {
  const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "Product deleted", product: deletedProduct });
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
