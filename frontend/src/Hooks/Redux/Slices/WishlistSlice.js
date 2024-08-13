import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    fav: [],
  };
  

const wishlistSlice= createSlice({
    name: "favorites",
    initialState: INITIAL_STATE,
    reducers:{
        addToFavorites(state, action){
            state.fav.push(action.payload);
        },
        removeFromFavorites(state, action){
          state.fav.filter((product)=>product.id !== action.payload)
        }
    }
})

export const {addToFavorites, removeFromFavorites} = wishlistSlice.actions
export default wishlistSlice.reducer