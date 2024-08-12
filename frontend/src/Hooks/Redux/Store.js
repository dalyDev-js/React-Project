import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";

import tokenReducer from "./Slices/TokenSlice";
<<<<<<< HEAD
import WishlistReducer from "./Slices/WishlistSlice";
=======
import categoryReducer from "./Slices/Category";
>>>>>>> ed9cc0b200e9986780e401a43da2ec592fa42ae9
export default configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoryReducer,
    token: tokenReducer,
    wishlist: WishlistReducer
  },
});
