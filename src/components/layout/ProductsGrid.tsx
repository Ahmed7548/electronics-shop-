import { Col, Row } from "react-bootstrap";
import Error from "../Error";
import StoreProduct from "../product/StoreProduct";
import { LoadingStatus } from "../../utils/types";
import { Product } from "../../utils/types";

interface PropType {
	products: Product[];
	loading: LoadingStatus;
	cardwidth?: string;
	cardHeight?: string;
}
function ProductsArrangement({ products, loading,cardHeight,cardwidth }: PropType) {
	return (
		<>
			<Row lg={4} md={3} sm={2} xs={2} className="g-sm-5">
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
					<p className="my-5 text-cente fs-2 text-secondary text-center">loading....</p>
				))}
			{loading === "noMore" && (
				<p className="my-5 text-cente fs-2 text-secondary text-center">no more products</p>
			)}
			{loading === "no-products" && (
				<p className="my-5 text-cente fs-2 text-secondary text-center">there is no matching products</p>
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
