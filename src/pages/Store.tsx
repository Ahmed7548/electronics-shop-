import { useEffect } from "react";

import ProductsArrangement from "../components/ProductsArrangement";
import useGetStoreProducts from "../hooks/useGetStoreProducts";

function Store() {
	const [products, loading, setPage, getProducts] = useGetStoreProducts();

	console.log(products);
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
			<ProductsArrangement products={products} loading={loading} cardHeight="25rem"/>
		</>
	);
}

export default Store;
