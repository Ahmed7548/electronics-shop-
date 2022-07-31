import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/api";
import { RootState } from "../app/store";
export interface Categories {
	name: string;
	id: number;
	imgUrl: string;
}
export interface AppStartState {
	categories: Categories[];
	loading: "idle" | "pending" | "succeeded" | "failed";
}

export const fetchAppStartData = createAsyncThunk(
	"categories/getCategories",
	async (): Promise<Categories[]> => {
		const { data } = await api.get("/categories");
		return data as Categories[];
	}
);

const initialState: AppStartState = {
	categories: [],
	loading: "idle",
};

const appStartSlice = createSlice({
	name: "appStart",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchAppStartData.fulfilled,
			(state, { payload: categories }) => {
				state.categories = categories;
				state.loading = "succeeded";
			}
		);
		builder.addCase(fetchAppStartData.rejected, (state, action) => {
			state.loading = "failed";
		});
		builder.addCase(fetchAppStartData.pending, (state, action) => {
			state.loading = "pending";
		});
	},
});

export const selectAppStartData = (state: RootState) => state.appStartData;

export default appStartSlice.reducer;

export const {} = appStartSlice.actions;
