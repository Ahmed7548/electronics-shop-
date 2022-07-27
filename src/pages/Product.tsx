import React, { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import ProductsArrangement from "../components/ProductsArrangement";
import { Button } from "react-bootstrap";
import QuantityController from "../components/QuantityController";
import api from "../API/api"
import { Product as ProductType } from "../utils/types";

import { useSearchParams } from "react-router-dom";




function Product() {
	const [searchParams]=useSearchParams()
	const [qty, setQty] = useState(1);
	const [page, setPage] = useState(1)
	const [product, setProduct] = useState<ProductType>()
	const [relatedProducts,setRelatedProducts]=useState<ProductType[]>()

	const IncrementHandler = () => {
		setQty((prevState) => prevState + 1);
	};
	const DecrementHandler = () => {
		if (qty === 1) return;
		setQty((prevState) => prevState - 1);
	};

	const ChangeQtyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (value < 1) return;
		setQty(value);
	};





	useEffect(() => {
		
		(async () => {
			let tags:string|undefined
			if (page === 1) {
				const { data: product }: { data: ProductType } = await api.get(`products/${searchParams.get("id")}`)
				tags=product.tags
				setProduct(product)
			}
			const { data: relatedProducts }: { data: ProductType[] } = await api.get(`products?tags=${tags||product?.tags}&_page=${page}`)
			setRelatedProducts(relatedProducts)
		})()
	},[page])

	return (
		<>
			<div className="d-flex flex-column flex-md-row justify-content-evenly align-items-center mb-5 bg-white p-3">
				<ImageSlider
					images={[
						"https://images.olx.com.eg/thumbnails/30529374-240x180.jpeg",
						"https://images.olx.com.eg/thumbnails/30529374-240x180.jpeg",
						"https://images.olx.com.eg/thumbnails/30529374-240x180.jpeg",
						"https://images.olx.com.eg/thumbnails/30529374-240x180.jpeg",
						"https://images.olx.com.eg/thumbnails/30529374-240x180.jpeg",
					]}
					height="60vh"
				/>
				<div className="slider p-3 mx-sm-3 bg-white">
					<h3>product name</h3>
					<small className="text-muted fs-5">$100.99</small>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
						porro. Officia quia velit architecto sint iusto tempore nulla ipsa!
						Deleniti, vitae magni nemo tempora expedita minima esse maxime
						fugiat quis!
					</p>
						<h5>product specification</h5>
					<ul>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>	
					</ul>
					<form className="d-flex justify-content-between">
						<Button variant="outline-dark">Add To Cart</Button>
						<QuantityController
							OnChangeQty={ChangeQtyHandler}
							decrement={DecrementHandler}
							qty={qty}
							increment={IncrementHandler}
							direction={"flex-row"}
						/>
					</form>
				</div>
			</div>
			<div>
				<ProductsArrangement
					products={[
						{ id: 1, name: "asdad", imgUrl: "", discribtion: "", price: 122 },
						{ id: 2, name: "asdad", imgUrl: "", discribtion: "", price: 122 },
						{ id: 3, name: "asdad", imgUrl: "", discribtion: "", price: 122 },
						{ id: 4, name: "asdad", imgUrl: "", discribtion: "", price: 122 },
						{ id: 5, name: "asdad", imgUrl: "", discribtion: "", price: 122 },
					]}
					loading={"succeeded"}
					cardHeight="20rem"
					// cardwidth="15rem"
				/>
			</div>
		</>
	);
}

export default Product;
