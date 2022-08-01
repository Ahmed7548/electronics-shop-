import React from "react";
import { useDispatch } from "react-redux";
import { currencyFormater } from "../../utils/formatCurrency";
import {
	decreaseAmountInCart,
	increaseAmountInCart,
	setQtyInCart,
} from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import QuantityController from "../UI/QuantityController";
import { Product } from "../../utils/types";

interface PropType {
	product: Product;
	qty: number;
	setTotalPrice:React.Dispatch<React.SetStateAction<number>>
}

function CartProduct({ product, qty,setTotalPrice }:PropType) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const incrementQty = () => {
		dispatch(increaseAmountInCart(product.id));
		setTotalPrice(prev=>prev+product.price)
	};

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = parseInt(e.target.value);
		if (value < 1) return;
		dispatch(setQtyInCart({ id: product.id, setQty: value }));

		// update the total price by substracting the prev single product total price and then adding the new single product total price
		setTotalPrice(prev=>prev-(product.price*qty)+(product.price*value))
	};

	const decrementQty = () => {
		dispatch(decreaseAmountInCart(product.id));
		setTotalPrice(prev=>prev-product.price)
	};

	const onImageClick = () => {
		// navigate(`/poduct/${product.id}`);
		navigate(`/store/product?id=${product.id}`);
	};

	if (!product) {
		return <p>product was not found</p>;
	}
	return (
		<div className="d-flex justify-content-between border p-3 align-items-center bg-white">
			<img
				onClick={onImageClick}
				className="prod-img cart-imge"
				src={product?.imgUrl[0]}
				style={{ objectFit: "contain" }}
			/>
			<div className="ms-3 d-flex justify-content-center align-items-ccenter flex-column ">
				<h3 className="fs-3">
					{product.name.length > 15
						? product?.name.substring(0, 15)
						: product.name}
				</h3>
				<small className="text-muted">{currencyFormater(product.price)}</small>
			</div>
			<div className="d-flex flex justify-content-center align-items-center p-2">
				<QuantityController
					increment={incrementQty}
					decrement={decrementQty}
					qty={qty}
					OnChangeQty={changeHandler}
				/>
				<div className="ms-1">
					total price:{" "}
					<span className="text-muted fs-6">
						{currencyFormater(qty * product.price)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default CartProduct;
