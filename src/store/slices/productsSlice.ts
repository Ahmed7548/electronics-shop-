import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoadingStatus, Product } from "../../utils/types";
import api from "../../API/api";
import { RootState } from "../app/store";

export interface ProductsState {
	products: Product[];
	loading: LoadingStatus;
	message?:string
}


// fetch products from server
export const fetchProducts = createAsyncThunk(
	"products/getproducts",
	async (
		req: { param?: string | null; search?: string | null; page?: number },
		thunkApi
	): Promise<[Product[], number]> => {
    let getUrl = "/products?";

		if (req.param) getUrl += `cat=${req.param}&`;
    if (req.search) getUrl += `name=${req.search}&`;
    

    getUrl += `_page=${req.page || 1}`;
    
		const { data } = await api.get(getUrl);
		return [data as Product[], req.page || 1];
	}
);

const initialState: ProductsState = {
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
					if (page === 1) {
						console.log(page)
						state.loading = "no-products"
						state.products = []
						return
					}
					state.loading = "noMore";
					return;
				}
				state.loading = "succeeded";
				if (page > 1) {
					state.products = [...state.products, ...products];
					return;
				}
				state.products = products;
			}
		);
		builder.addCase(fetchProducts.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(fetchProducts.rejected, (state) => {
			state.loading = "failed";
		});
	},
});

export const productSelector = (state: RootState) => state.products;

export default productsSlice.reducer;

export const {} = productsSlice.actions;
