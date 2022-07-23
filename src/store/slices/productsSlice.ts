import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../hooks/useGetStoreProducts";
import api from "../../API/api"
import { RootState } from "../app/store";
export interface ProductState{
  products: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}


export const fetchProducts = createAsyncThunk("products/getproducts", async (req: { param?: string|null; search?:string|null},thunkApi): Promise<Product[]> => {
  let getUrl = "/products?"
  if(req.param) getUrl+=`cat=${req.param}`
  if (req.search) getUrl += `name=${req.search}`
  const {data}=await api.get(getUrl) 
  return data as Product[]
})

const initialState: ProductState = {
  products: [],
  loading:"idle"
}


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, {payload:products}) => {
      state.products=products
      state.loading="succeeded"
    })
  }
})


export const productSelector=(state:RootState)=>state.products.products

export default productsSlice.reducer


export const {} =productsSlice.actions




