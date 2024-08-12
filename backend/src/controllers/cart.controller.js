import cartModel, { cartItemModel } from "../models/Cart.js";
import catchError from "../middleware/catchError.js";

const getCartItems = catchError(async (req, res) => {
  const userId = req.user._id;
  console.log(userId, "userid");

  const cart = await cartModel.findOne({ userId }).populate("products");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ message: "success", cart });
});

// Add Cart Items
const addCartItems = catchError(async (req, res) => {
  const userId = req.user._id;
  const {
    product,
    title,
    quantity,
    images,
    price,
    totalPrice,
    discountPercentage,
  } = req.body;

  // Find the user's cart
  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    // If no cart exists, create a new cart with the new item
    cart = new cartModel({
      userId,
      products: [
        {
          product,
          title,
          quantity,
          images,
          price,
          totalPrice,
          discountPercentage,
        },
      ],
    });
  } else {
    // If cart exists, check if the product is already in the cart
    const existingProduct = cart.products.find(
      (item) => item.product.toString() === product.toString()
    );

    if (existingProduct) {
      // If the product exists, update its quantity
      existingProduct.quantity += quantity;
      existingProduct.totalPrice = existingProduct.quantity * price;
    } else {
      // If the product does not exist, add it as a new item
      cart.products.push({
        product,
        title,
        quantity,
        images,
        price,
        totalPrice,
        discountPercentage,
      });
    }
  }

  // Save the cart with the updated or new product
  const updatedCart = await cart.save();

  // Calculate total price and savings using reduce
  const { totalPrice: updatedTotalPrice, totalSavings } =
    updatedCart.products.reduce(
      (totals, item) => {
        const itemTotalPrice = item.totalPrice;
        const discountAmount = (itemTotalPrice * item.discountPercentage) / 100;
        totals.totalPrice += itemTotalPrice;
        totals.totalSavings += discountAmount;
        return totals;
      },
      { totalPrice: 0, totalSavings: 0 }
    );

  res.status(201).json({
    message: "Cart item added or updated",
    updatedCart,
    totalPrice: updatedTotalPrice,
    totalSavings,
  });
});

// Update Cart Item
const updateCartItem = catchError(async (req, res) => {
  const userId = req.user._id;
  const { itemId, quantity } = req.body;

  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const itemIndex = cart.products.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  // Update the quantity and recalculate the total price for the item
  cart.products[itemIndex].quantity = quantity;
  cart.products[itemIndex].totalPrice =
    cart.products[itemIndex].price * quantity;

  const updatedCart = await cart.save();

  // Calculate total price and savings using reduce
  const { totalPrice: updatedTotalPrice, totalSavings } =
    updatedCart.products.reduce(
      (totals, item) => {
        const itemTotalPrice = item.totalPrice;
        const discountAmount = (itemTotalPrice * item.discountPercentage) / 100;
        totals.totalPrice += itemTotalPrice;
        totals.totalSavings += discountAmount;
        return totals;
      },
      { totalPrice: 0, totalSavings: 0 }
    );

  res.status(200).json({
    message: "Cart item updated successfully",
    updatedCart,
    totalPrice: updatedTotalPrice,
    totalSavings,
  });
});

const deleteCartItem = catchError(async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;

  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Filter out the product with the given itemId
  cart.products = cart.products.filter(
    (product) => product._id.toString() !== itemId
  );

  await cart.save(); // Save the updated cart

  console.log("item", itemId, "deleted");
  res.status(200).json({ message: "item deleted", cart });
});

export { getCartItems, addCartItems, updateCartItem, deleteCartItem };
