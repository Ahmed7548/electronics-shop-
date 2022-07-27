import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RootState, useAppSelector } from "../store/app/store";
import { LoadingStatue } from "../utils/types";
import { Product } from "../utils/types";

interface SelectorReturn {
	products: Product[];
	loading: LoadingStatue;
}

export type FetchProductCallBack = (
	param?: string | null,
	search?: string | null,
	page?: number
) => Promise<void>;

const useGetProducts = (
	productsSelector: (state: RootState) => SelectorReturn,
	initialCb: FetchProductCallBack,
	infiniteScrollCb: FetchProductCallBack,
	searchParamKey?: string | null,
	param?: string | null
): [Product[], LoadingStatue] => {
	const page = useRef(1);
	const [searchParams] = useSearchParams();

	const { products, loading } = useAppSelector(productsSelector);

	console.log(products)

	const scrollHandler = (e: Event): void => {
		const htmlElement = document.querySelector("html") as HTMLElement;
		const scrollDistance = htmlElement.scrollHeight - htmlElement.clientHeight;
		if (
			scrollDistance - htmlElement.scrollTop <=
			htmlElement.clientHeight / 2
		) {
			//removes the listener untill the products  has been fetched
			document.removeEventListener("scroll", scrollHandler);
			// get the products
			infiniteScrollCb(
				param,
				searchParams.get(searchParamKey || ""),
				page.current + 1
			).then((_) => {
				page.current += 1;
			});
		}
	};

	useEffect(() => {
		if (loading === "noMore") {
			return;
		}
		document.addEventListener("scroll", scrollHandler);
		return () => {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, [products]);

	useEffect(() => {
		//this one too
		initialCb(param, searchParams.get(searchParamKey || "")).then((_) => {
			page.current = 1;
		});
	}, [searchParams.get(searchParamKey || ""), param]);
	return [products, loading];
};

export default useGetProducts;
