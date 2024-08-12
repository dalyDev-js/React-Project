import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  title: String,
  quantity: {
    type: Number,
    min: 1,
    default: 1,
  },
  images: Array,
  price: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  discountPercentage: Number,
});
export const cartItemModel = mongoose.model("CartItem", cartItemSchema);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [cartItemSchema],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
