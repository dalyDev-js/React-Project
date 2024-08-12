import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    favorites: [],
  };
  

const wishlistSlice= createSlice({
    name: "favorites",
    initialState: INITIAL_STATE,
    reducers:{
        addToFavorites(state, action){
            state.favorites.push(action.payload);
        },
        removeFromFavorites(state, action){
          state.filter((product)=>product.id !== action.payload.id)
        }
    }
})