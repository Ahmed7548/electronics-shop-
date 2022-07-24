import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import StoreProduct from "../components/StoreProduct";
import useGetStoreProducts from "../hooks/useGetStoreProducts";

function Store() {
	const [products, loading, setPage, getProducts] = useGetStoreProducts();
	const [productsLength,setProductsLength]=useState(products.length)
	const scrollHandler = (e: Event): void => {
		const htmlElement = document.querySelector("html") as HTMLElement;
		const scrollDistance = htmlElement.scrollHeight - htmlElement.clientHeight;
		if (scrollDistance - htmlElement.scrollTop <= (htmlElement.clientHeight)/2) {
			setPage((prevState) => prevState + 1);
			document.removeEventListener("scroll", scrollHandler);
			getProducts();
		}
	};

	useEffect(() => {
		console.log("effeeeeect");
		if (loading === "noMore") {
			return;
		}
		document.addEventListener("scroll", scrollHandler);
		return () => {
			document.removeEventListener("scroll", scrollHandler);
		};
	}, [products]);

	return (
		<>
			<Row lg={3} md={2} sm={1} xs={1} className="g-5">
				{products.map((item): JSX.Element => {
					return (
						<Col key={item.id}>
							<StoreProduct item={item} />
						</Col>
					);
				})}
			</Row>
		</>
	);
}

export default Store;
