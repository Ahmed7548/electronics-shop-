import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export type CartState = { id: number; qty: number }[];

const cartSlice = createSlice<CartState, SliceCaseReducers<CartState>>({
	name: "Cart",
  initialState: [],
	reducers: {
		addTocart(
			state,
			{ payload: { id, qty } }: PayloadAction<{ id: number; qty: number }>
    ): void {
      const prodInCart = state.find((prod) => prod.id === id);
			if (prodInCart) {
				prodInCart.qty += qty;
				return;
      }
      state.push({ id, qty });
		},
		removeFromCart(state, { payload: id }: PayloadAction<number>) {
			return state.filter((prod) => prod.id !== id);
    },
    decreaseAmountInCart(state, { payload:id }: PayloadAction<number>) {
      const pordInCart = state.find(prod => prod.id === id)
      if (pordInCart) {
        if (pordInCart.qty === 1) {
          return state.filter(prod=>prod.id!==id)
        }
        pordInCart.qty-=1
      }
    }
	},
});

export const selectCartProducts=(state:any)=>state.cart

export const {addTocart,removeFromCart,decreaseAmountInCart} = cartSlice.actions;

export default cartSlice.reducer;
