import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    getCartItems(state, action) {
      state = action.payload;
    },
    addToCart(state, action) {
      state.push(action.payload);
    },

    removeFromCart(state, action) {
      state.filter((item) => item.id !== action.payload.id);
    },
  },
  updateQuantity(state, action) {
    const { id, quantity } = action.payload;
    const item = state.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
    }
  },
});

export const { getCartItems, addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
