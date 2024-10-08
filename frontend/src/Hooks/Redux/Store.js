import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";

import tokenReducer from "./Slices/TokenSlice";
import WishlistReducer from "./Slices/WishlistSlice";
import categoryReducer from "./Slices/Category";
import LanguageSlice from "./Slices/LanguageSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    token: tokenReducer,
    wishlist: WishlistReducer,
    language: LanguageSlice,
  },
});
