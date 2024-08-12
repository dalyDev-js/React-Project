import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";

import tokenReducer from "./Slices/TokenSlice";
import categoryReducer from "./Slices/Category";
export default configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    token: tokenReducer,
  },
});
