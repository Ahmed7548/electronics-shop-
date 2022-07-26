import { Button } from "react-bootstrap";
import CartProduct from "../components/cart/CartProduct";
import { selectCartProducts } from "../store/slices/cartSlice";
import EmptyCart from "../components/cart/EmptyCart";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/app/store";
import {  useState } from "react";

function Cart() {
	const products = useAppSelector(selectCartProducts);
	const navigate = useNavigate();
	const [totalPrice, setTotalPrice] = useState(
		products.reduce((acc, cur): number => {
			acc += cur.qty * cur.product.price;
			return acc;
		}, 0)
	);

	const keepShopping = ():void => {
		// a better feeture is to return to what ever the past route is
		navigate("/store");
	};

	const cheCkOut = ():void => {
		
	}

	const cart=		products.map((product) => (
						<CartProduct
							product={product.product}
							qty={product.qty}
							setTotalPrice={setTotalPrice}
							key={product.product.id}
						/>
					))

	return (
		<>
			<div className=" m-auto p-3 bg-white cart-container">
				{products.length ? (
					<>
						{cart}
						<p className="ms-auto mt-3 fs-3 d-flex justify-content-end align-items-center">
							Total: <small className="text-muted ms-2">${totalPrice.toFixed(2)}</small>
						</p>
					</>
				) : (
					<EmptyCart />
				)}
				<div className="d-flex justify-content-between align-items-ceter p-4  pb-0  ">
					<Button variant="outline-success" className="mx-2" onClick={keepShopping}>
						{" "}
						Keep Shopping
					</Button>
					{products.length > 0 && (
						<Link to="/checkout"><Button variant="outline-dark" className="mx-2" onClick={cheCkOut}> Proceed To Checkout</Button></Link>
					)}
				</div>
			</div>
		</>
	);
}

export default Cart;
