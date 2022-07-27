import {
	createSlice,
	createAsyncThunk,
	SerializedError,
} from "@reduxjs/toolkit";
import { Product } from "../../utils/types";
import api from "../../API/api";
import store, { RootState } from "../app/store";

interface ProductState {
	product: {
		data: Product | null;
		loading: "idle" | "pending" | "succeeded" | "failed";
		error: SerializedError | null;
	};
	relatedProducts: {
		entries: Product[];
		loading: "idle" | "pending" | "succeeded" | "failed" | "noMore";
		error: SerializedError | null;
	};
}

const initialState: ProductState = {
	product: {
		data: null,
		loading: "idle",
		error: null,
	},
	relatedProducts: {
		entries: [],
		loading: "idle",
		error: null,
	},
};

export const fetchProduct = createAsyncThunk(
	"product/getProduct",
	async ({ id }: { id: number }, thunkApi): Promise<Product> => {
		const { data } = await api.get(`products/${id}`);

		return data as Product;
	}
);

export const fetchRelatedProducts = createAsyncThunk(
	"product/getRelatedProduct",
	async (
		{ tags, page }: { tags: string; page?: number },
		thunkApi
	): Promise<{ data: Product[]; page: number }> => {
		let getUrl: string = "products?";

		getUrl += `tags=${tags}&_page=${page || 1}`;

		// by tags...
		const { data } = await api.get(getUrl);

		return { data: data as Product[], page: page || 1 };
	}
);

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchProduct.fulfilled, (state, { payload: product }) => {
			state.product.data = product;
			state.product.loading = "succeeded";
		});
		builder.addCase(fetchProduct.pending, (state) => {
			state.product.loading = "pending";
		});
		builder.addCase(fetchProduct.rejected, (state, action) => {
			state.product.loading = "failed";
			state.product.error = action.error;
		});
		builder.addCase(
			fetchRelatedProducts.fulfilled,
			(state, { payload: { data, page } }) => {
				state.product.loading = "succeeded";
				if (page > 1) {
					state.relatedProducts.entries.push(...data);
					return;
				}
				state.relatedProducts.entries = data;
			}
		);
		builder.addCase(fetchRelatedProducts.pending, (state) => {
			state.relatedProducts.loading = "pending";
		});
		builder.addCase(fetchRelatedProducts.rejected, (state, action) => {
			state.relatedProducts.loading = "failed";
			state.relatedProducts.error = action.error;
		});
	},
});

export const selectProduct = (state: RootState) => state.viewedProduct;

export const {} = productSlice.actions;

export default productSlice.reducer;
