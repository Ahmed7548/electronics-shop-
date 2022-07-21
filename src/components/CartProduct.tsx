import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import allProducts from "../data/items.json";
import { currencyFormater } from "../utils/formatCurrency";
import { addTocart, decreaseAmountInCart } from "../store/slices/cartSlice";

function CartProduct({ product }: { product: { id: number; qty: number } }) {
	const productData = allProducts.find((prod) => prod.id === product.id);
	const dispatch = useDispatch();
	const incermentButton = useRef<HTMLButtonElement>();
	const decrementButton = useRef<HTMLButtonElement>();

	const changeQtyHandler = (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	): void => {
		if (e.target === incermentButton.current) {
			dispatch(addTocart({ id: product.id, qty: 1 }));
		} else if (e.target === decrementButton.current) {
			dispatch(decreaseAmountInCart(product.id));
		}
	};

	if (!productData) {
		return <p>product was not found</p>;
	}
	return (
		<div
			className=" m-auto d-flex justify-content-between border p-3 align-items-start bg-white"
			style={{ width: "500px" }}
		>
			<img
				src={productData?.imgUrl}
				width="200px"
				style={{ objectFit: "contain" }}
			/>
			<div className="ms-3 d-flex justify-content-center align-items-ccenter flex-column">
				<h3 className="fs-3">{productData?.name}</h3>
				<small className="text-muted">
					{currencyFormater(productData.price)}
				</small>
			</div>
			<div className="d-flex flex-column justify-content-center align-items-center p-2">
				<div
					className="d-flex"
					style={{ height: "3rem" }}
					onClick={changeQtyHandler}
				>
					<Button
						ref={incermentButton as React.MutableRefObject<HTMLButtonElement>}
						style={{ width: "2.5rem", height: "2.5rem" }}
					>
						+
					</Button>
					<div className="fs-2 mx-2">{product.qty}</div>
					<Button
						ref={decrementButton as React.MutableRefObject<HTMLButtonElement>}
						style={{ width: "2.5rem", height: "2.5rem" }}
					>
						-
					</Button>
				</div>
				<p className="mt-2">
					total price:{" "}
					<span className="text-muted">
						{currencyFormater(product.qty * productData.price)}
					</span>
				</p>
			</div>
		</div>
	);
}

export default CartProduct;
