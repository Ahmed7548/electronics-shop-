import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

type State = { id: number; qty: number }[];

const cartSlice = createSlice<State, SliceCaseReducers<State>>({
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
			state = state.filter((prod) => prod.id !== id);
    },
    decreaseAmountInCart(state, { payload:id }: PayloadAction<number>):void {
      const pordInCart = state.find(prod => prod.id === id)
      if (pordInCart) {
        if (pordInCart.qty === 1) {
          state = state.filter((prod) => prod.id !== id);
          return
        }
        pordInCart.qty-=1
      }
    }
	},
});

export const {addTocart,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
