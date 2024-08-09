import cartModel from "../models/Cart.js";
import catchError from "../middleware/catchError.js";

const getCartItems = catchError(async (req, res) => {
  const userId = req.user._id;
  const cartItems = await cartModel.find({ userId });
  console.log(userId);
  res.status(200).json({ message: "success", cartItems });
});

const addCartItems = catchError(async (req, res) => {
  const userId = req.user._id;
  req.body.createdBy = userId;
  req.body.userId = userId;
  const createdCart = await cartModel.create(req.body);
  res.status(201).json({ message: "Cart item created", createdCart });
});

export { getCartItems, addCartItems };
