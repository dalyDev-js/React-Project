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
  },
  { timestamps: true, versionKey: false }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
