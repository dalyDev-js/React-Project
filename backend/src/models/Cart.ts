import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref : 'users', required: true},
    productId: {type: mongoose.Schema.Types.ObjectId, ref : 'products', required: true},
    quantity: {type: Number, required: true},
    createdAt: {type: mongoose.Schema.Types.Date, required: true},
});

export const CartModel = mongoose.model("cart", CartSchema)