import cartModel from "../models/Cart";
import catchError from "../middleware/catchError";

const getCartItems = catchError(async (req, res) => {
  const userId = req.params.userId;
  const cartItems = await cartModel.find({ userId });
  res.status(200).json({ message: "success", cartItems });
});

export { getCartItems };
