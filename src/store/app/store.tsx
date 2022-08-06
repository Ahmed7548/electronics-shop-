import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import productsReducer from "../slices/productsSlice";
import appStartReducer from "../slices/appStartSlice"
import productReducer from "../slices/singleProductSlice"
import userReducer from "../slices/userSlice"
import { addAppListener, listenerMiddleware, startAppListening } from '../middleWare/middlewareListeners';


startAppListening({
  predicate: (action,curState,prevState) => {
    const prefix = action.type as string
    const typePrefix=prefix?.split("/")[0]
   return typePrefix==="cart" 
  },
  effect: (action, listenerApi) => {
    const cart = listenerApi.getState().cart
    window.sessionStorage.setItem("cart",JSON.stringify(cart))
  },
})


const  store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    appStartData: appStartReducer,
    viewedProduct: productReducer,
    user:userReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch =useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> =useSelector

export default store