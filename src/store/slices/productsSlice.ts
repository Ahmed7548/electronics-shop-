import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../hooks/useGetStoreProducts";
import api from "../../API/api"
import { RootState } from "../app/store";
export interface ProductState{
  products: Product[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}


export const fetchProducts = createAsyncThunk("products/getproducts", async (reqBody: {
  cat?: string;
  search?:string 
}): Promise<Product[]> => {
  let getUrl = "/products?"
  if(reqBody.cat) getUrl+=`cat=${reqBody.cat}`
  if(reqBody.search) getUrl+=`name=${reqBody.cat}`
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




