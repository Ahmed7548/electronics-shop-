import useGetProducts from "../../hooks/usegetProducts";
import { useAppDispatch } from "../../store/app/store";
import {
	fetchRelatedProducts,
	selectRealtedProducts,
} from "../../store/slices/singleProductSlice";
import ProductsArrangement from "../layout/ProductsGrid";

const RelatedProducts = ({ tags }: { tags: string }) => {
	const dispatch = useAppDispatch();

	const [products, loading] = useGetProducts(
		selectRealtedProducts,
		async () => {
			dispatch(fetchRelatedProducts({ tags }));
		},
		async (param, search, page) => {
			dispatch(fetchRelatedProducts({ tags, page }));
		}
	);
	console.log(products);
	return (
		<>
			<ProductsArrangement loading={loading} products={products} />
		</>
	);
};

export default RelatedProducts;
