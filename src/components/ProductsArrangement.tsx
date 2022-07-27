import { Col, Row } from "react-bootstrap";
import Error from "../components/Error";
import StoreProduct from "../components/StoreProduct";
import { LoadingStatue } from "../utils/types";
import { Product } from "../utils/types";

interface PropType {
	products: Product[];
	loading: LoadingStatue;
	cardwidth?: string;
	cardHeight?: string;
}

function ProductsArrangement({ products, loading,cardHeight,cardwidth }: PropType) {
	return (
		<>
			<Row lg={3} md={2} sm={1} xs={1} className="g-sm-5">
				{products.map((item): JSX.Element => {
					return (
						<Col key={item.id}>
							<StoreProduct cardHeight={cardHeight} cardWidth={cardwidth} item={item} />
						</Col>
					);
				})}
			</Row>
			{loading === "idle" ||
				(loading === "pending" && (
					<p className="ms-auto mt-5 w-100">loading....</p>
				))}
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

export default ProductsArrangement;
