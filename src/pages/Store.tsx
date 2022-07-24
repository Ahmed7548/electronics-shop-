import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Error from "../components/Error";
import StoreProduct from "../components/StoreProduct";
import useGetStoreProducts from "../hooks/useGetStoreProducts";

function Store() {

	const [products, loading, setPage, getProducts] = useGetStoreProducts();

// handle the scroll of the document
	const scrollHandler = (e: Event): void => {
		const htmlElement = document.querySelector("html") as HTMLElement;
		const scrollDistance = htmlElement.scrollHeight - htmlElement.clientHeight;
		if (
			scrollDistance - htmlElement.scrollTop <=
			htmlElement.clientHeight / 2
		) {
			setPage((prevState) => prevState + 1);

			//removes the listener untill the products  has been fetched
			document.removeEventListener("scroll", scrollHandler);
			// get the products
			getProducts();
		}
	};


	useEffect(() => {
		// prevent adding a listener when there is no more products
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
			{loading === "idle" && <p>loading....</p>}
			{loading === "noMore" && (
				<p className="my-5 text-center">no more products</p>
			)}
			{loading === "failed" && (
				<Error title="404 not found">
					couldn't find the resources you are looking for please check your
					internet connection or try latter
				</Error>
			)}
		</>
	);
}

export default Store;
