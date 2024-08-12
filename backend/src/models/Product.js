import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    price: Number,
    image: String,
    category: String,
    images: Array,
    rating: Number,

    stock: Number,
    discountPercentage: Number,
  },
  { timestamps: true, versionKey: false }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
