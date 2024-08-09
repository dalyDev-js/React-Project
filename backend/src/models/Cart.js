import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: Number,
    quantity: Number,
    createdAt: Date,
    totalPrice: Number,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
