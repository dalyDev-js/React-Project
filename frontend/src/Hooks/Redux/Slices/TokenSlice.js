import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState: INITIAL_VALUE,
  reducers: {
    getToken(state) {
      return state.token;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
