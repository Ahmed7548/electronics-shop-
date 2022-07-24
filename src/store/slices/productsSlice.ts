import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../hooks/useGetStoreProducts";
import api from "../../API/api";
import { RootState } from "../app/store";



export interface ProductState {
	products: Product[];
	loading: "idle" | "pending" | "succeeded" | "failed"|"noMore";
}

export const fetchProducts = createAsyncThunk(
	"products/getproducts",
	async (
		req: { param?: string | null; search?: string | null; page?: number},
		thunkApi
	): Promise<[Product[], number]> => {
		let getUrl = "/products?";
		if (req.param) getUrl += `cat=${req.param}`;
		if (req.search) getUrl += `name=${req.search}`;
		getUrl += `_page=${req.page||1}`;
		const { data } = await api.get(getUrl);
		return [data as Product[], req.page||1];
	}
);

const initialState: ProductState = {
	products: [],
	loading: "idle",
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchProducts.fulfilled,
      (state, { payload: [products, page] }) => {
        if (products.length === 0) {
          state.loading = "noMore"
          return
        }
				state.loading = "succeeded";
				if (page > 1) {
					state.products = [...state.products, ...products];
					return;
				}
				state.products = products;
			}
		);
	},
});

export const productSelector = (state: RootState) => state.products;

export default productsSlice.reducer;

export const {} = productsSlice.actions;
