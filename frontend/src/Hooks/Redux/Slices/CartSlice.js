import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    getCartItems(state, action) {
      state.items = action.payload;
    },
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateCartItem: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item._id === itemId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { getCartItems, addToCart, removeFromCart, updateCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
