import { Button} from "react-bootstrap";
import CartProduct from "../components/CartProduct";
import { selectCartProducts } from "../store/slices/cartSlice";
import EmptyCart from "../components/EmptyCart";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/app/store";

function Cart() {
	const navigate = useNavigate();
  const products = useAppSelector(selectCartProducts);

	const keepShopping = () => {
		// a better feeture is to return to what ever the past route is
		navigate("/store");
	};

	return (
		<>
			<div className=" m-auto p-3 bg-white cart-container">
				{products.length ? (
					products.map((product) => (
						<CartProduct product={product} key={product.id} />
					))
				) : (
					<EmptyCart />
				)}
				<div className="d-flex justify-content-between align-items-ceter p-3 pb-0 ">
					<Button variant="outline-success" onClick={keepShopping}>
						{" "}
						Keep Shopping
					</Button>
					{products.length>0&&<Button variant="outline-dark"> Proceed To Checkout</Button>}
				</div>
			</div>
		</>
	);
}

export default Cart;
