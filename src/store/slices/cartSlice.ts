import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Product } from "../../utils/types";

export type CartState = { product: Product; qty: number }[];

const initialState:CartState=[]

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addTocart(
			state,
			{ payload: { product, qty,qtySet } }: PayloadAction<{ product: Product; qty: number;qtySet?:number }>
		): void {
			const prodInCart = state.find((prod) => prod.product.id === product.id);
			if (prodInCart) {
				if (qtySet) {
					prodInCart.qty=qtySet
				}
				prodInCart.qty += qty;
				return;
			}
			state.push({ product, qty });
		},
		increaseAmountInCart(state, { payload: id }: PayloadAction<number>) {
			const pordInCart = state.find((prod) =>prod.product.id=== id);
			if (pordInCart) {
				pordInCart.qty += 1;
			}
		},
		setQtyInCart(state, { payload: { id, setQty } }: PayloadAction<{ id: number; setQty:number}>) {
			const prodInCart = state.find((prod) => prod.product.id === id);
			if (prodInCart) {
				prodInCart.qty=setQty
			}
		},
		removeFromCart(state, { payload: id }: PayloadAction<number>) {
			return state.filter((prod) => prod.product.id !== id);
		},
		decreaseAmountInCart(state, { payload: id }: PayloadAction<number>) {
			const pordInCart = state.find((prod) => prod.product.id === id);
			if (pordInCart) {
				if (pordInCart.qty === 1) {
					return state.filter((prod) => prod.product.id !== id);
				}
				pordInCart.qty -= 1;
			}
		},
		setCartFromSessionStorage(state, { payload: cart }) {
			return cart 
		},
		emptyCart(state) {
			return []
		}
	},
});

export const selectCartProducts = (state: RootState) => state.cart;

export const { addTocart, removeFromCart, decreaseAmountInCart,increaseAmountInCart,setQtyInCart,setCartFromSessionStorage,emptyCart } =
	cartSlice.actions;

export default cartSlice.reducer;
