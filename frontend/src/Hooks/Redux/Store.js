import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";
import categoryReducer from "./Slices/Category";
import tokenReducer from "./Slices/TokenSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    token: tokenReducer,
  },
});
