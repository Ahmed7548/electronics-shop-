import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import allProducts from "../data/items.json";
import { currencyFormater } from "../utils/formatCurrency";
import { addTocart, decreaseAmountInCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function CartProduct({ product }: { product: { id: number; qty: number } }) {
	const productData = allProducts.find((prod) => prod.id === product.id);
	const dispatch = useDispatch();
	const navigate= useNavigate()
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

	const onImageClick = () => {
		navigate(`/poduct/${product.id}`)
	}

	if (!productData) {
		return <p>product was not found</p>;
	}
	return (
		<div
			className="d-flex justify-content-between border p-3 align-items-center bg-white"
		>
			<img
				onClick={onImageClick}
				className="prod-img cart-imge"
				src={productData?.imgUrl}
				style={{ objectFit: "contain",}}
			/>
			<div className="ms-3 d-flex justify-content-center align-items-ccenter flex-column ">
				<h3 className="fs-3">{productData.name.length>15?productData?.name.substring(0,15):productData.name}</h3>
				<small className="text-muted">
					{currencyFormater(productData.price)}
				</small>
			</div>
			<div className="d-flex flex justify-content-center align-items-center p-2">
				<div
					className="d-flex flex-column"
					onClick={changeQtyHandler}
				>
					<Button  variant="outline-dark"
						ref={incermentButton as React.MutableRefObject<HTMLButtonElement>}
						className="p-0 text-center small-button"
					>
						{"<"}
					</Button>
					<div className="fs-2 mx-2">{product.qty}</div>
					<Button variant="outline-dark"
						ref={decrementButton as React.MutableRefObject<HTMLButtonElement>}
						className="p-0 text-center small-button"
					>
						{">"}
					</Button>
				</div>
				<div className="ms-1">
					total price:{" "}
					<span className="text-muted fs-5">
						{currencyFormater(product.qty * productData.price)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default CartProduct;
