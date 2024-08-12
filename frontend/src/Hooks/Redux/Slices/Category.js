import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  categories: [
    "men's clothing",
    "jewelery",
    "electronics",
    "Women's clothing",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
  ],
};

const categorySlice = createSlice({
  initialState: INITIAL_STATE,
  name: "categories",
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
