import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface Order {

}

interface User  {
  isLogedIn: boolean;
  info?: {
    name: {
      first: string;
      last: string
    };
    img: {
      thumbnailImg: string;
      bigImg: string;
    };
    addresses: {
      governerate: string;
      city: string;
      street: string;
      building?: number;
      appartment?: number
      postalCode: number;
      address: string;
    }[]
  };
  orders?: Order[];
  auth?: {
    accessToken: string;
    refreshToken:string
  }
}   

const initialState:User = {
  isLogedIn: false
}



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
  },
  extraReducers(bulder) {
    
  }
})



export default userSlice.reducer



export const selectLoginStatus = (state: RootState) => state.user.isLogedIn 
export const selectAccesssToken=(state:RootState)=>state.user.auth?.accessToken
export const selectRefreshToken = (state: RootState) => state.user.auth?.refreshToken
export const selectUser=(state:RootState)=>state.user

export const {}=userSlice.actions