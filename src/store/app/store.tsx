import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "../slices/cartSlice";
import productsReducer from "../slices/productsSlice";
import appStartReducer from "../slices/appStartSlice"
import productReducer from "../slices/productSlice"

const  store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    appStartData: appStartReducer,
    viewedProduct:productReducer
}
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch =useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> =useSelector

export default store