import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  category: "default",
};

const categorySlice = createSlice({
  initialState: INITIAL_STATE,
  name: "category",
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
