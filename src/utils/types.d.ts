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