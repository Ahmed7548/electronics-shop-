import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import ProductsArrangement from "../components/ProductsArrangement";
import useGetProducts from "../hooks/usegetProducts";
import { useAppDispatch } from "../store/app/store";
import { fetchProducts, productSelector } from "../store/slices/productsSlice";

function Store() {
	const dispatch = useAppDispatch();
	const { cat } = useParams();
	const [products, loading] = useGetProducts(
		productSelector,
		async (param, search) => {
			await dispatch(fetchProducts({ param, search }));
		},
		async (param, search, page) => {
			await dispatch(fetchProducts({ param, search, page }));
		},
		"search",
		cat
	);


	return (
		<>
			<ProductsArrangement
				products={products}
				loading={loading}
				cardHeight="25rem"
			/>
		</>
	);
}

export default Store;
