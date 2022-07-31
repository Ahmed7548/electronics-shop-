import React, { useEffect, useState } from "react";
import ImageSlider from "../components/UI/ImageSlider";
import { Button, Container } from "react-bootstrap";
import QuantityController from "../components/UI/QuantityController";
import { useSearchParams } from "react-router-dom";
import {
	fetchProduct,
	fetchRelatedProducts,
	selectProduct,
	selectRealtedProducts,
} from "../store/slices/singleProductSlice";
import { useAppDispatch, useAppSelector } from "../store/app/store";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductData from "../components/product/ProductData";
import Error from "../components/Error";

function Product() {
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const { product, loading } = useAppSelector(selectProduct);


	useEffect(() => {
		const id = searchParams.get("id");
		if (id) dispatch(fetchProduct({ id: parseInt(id) }));
	}, []);

	if (loading === "idle" || loading === "pending") {
		return <p>loading.....</p>;
	}

	if (loading === "failed") {
		return (
			<>
				<Error title="couldn't fetch">couldn't fetch product data</Error>{" "}
			</>
		);
	}

	return (
		<>
			{/* {loading? : } */}
			<ProductData product={product} />
			<div>
				<RelatedProducts tags={product?.tags || ""} />
			</div>
		</>
	);
}

export default Product;
