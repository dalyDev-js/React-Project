import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState: INITIAL_VALUE,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});
