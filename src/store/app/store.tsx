import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { State } from "../slices/cartSlice";

export type Store = {
   cart:State
 }

const  store = configureStore({
  reducer: {
  cart:cartReducer
}
})


export default store