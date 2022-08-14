import { AxiosError } from "axios";

export type LoadingStatus = "idle" | "pending" | "succeeded" | "failed" | "noMore"|"no-products"

export interface Product {
	id: number;
	name: string;
	price: number;
	imgUrl: string[];
	discribtion: string;
  specification: string[];
  tags?: "string";
}

interface Order{

}

export interface SignInResponse {
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		googleId: string;
		imageUrl: string;
		name: {
			first: string;
			family: string
		},
		orders: Order[];
	}
}


