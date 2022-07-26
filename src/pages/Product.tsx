import React from "react";
import { Outlet } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import ProductsArrangement from "../components/ProductsArrangement";
import StoreProduct from "../components/StoreProduct";

function Product() {
	console.log("in product");

	return (
		<>
			<div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-5">
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
				<div>
					<h3>product name</h3>
					<h5 className="text-muted">$100.99</h5>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
						porro. Officia quia velit architecto sint iusto tempore nulla ipsa!
						Deleniti, vitae magni nemo tempora expedita minima esse maxime
						fugiat quis!
					</p>
					<ul>
						<li>adasdosm</li>
						<li>adasdosm</li>
						<li>adasdosm</li>
					</ul>

					
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
