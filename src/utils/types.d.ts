export type LoadingStatue = "idle" | "pending" | "succeeded" | "failed" | "noMore"

export interface Product {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
	discribtion: string;
	tags?:"string"
}