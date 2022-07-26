import React from "react";
import { useDispatch } from "react-redux";
import allProducts from "../data/items.json";
import { currencyFormater } from "../utils/formatCurrency";
import { addTocart, decreaseAmountInCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import QuantityController from "./QuantityController";

function CartProduct({ product }: { product: { id: number; qty: number } }) {
	const productData = allProducts.find((prod) => prod.id === product.id);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const incrementQty = () => {
		dispatch(addTocart({ id: product.id, qty: 1 }));
	};

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = parseInt(e.target.value);
		if (value < 1) return;
		dispatch(addTocart({ id: product.id, setQty: value }));
	};

	const decrementQty = () => {
		dispatch(decreaseAmountInCart(product.id));
	};

	const onImageClick = () => {
		// navigate(`/poduct/${product.id}`);
		navigate(`/store/product?id=${product.id}`);

	};

	if (!productData) {
		return <p>product was not found</p>;
	}
	return (
		<div className="d-flex justify-content-between border p-3 align-items-center bg-white">
			<img
				onClick={onImageClick}
				className="prod-img cart-imge"
				src={productData?.imgUrl}
				style={{ objectFit: "contain" }}
			/>
			<div className="ms-3 d-flex justify-content-center align-items-ccenter flex-column ">
				<h3 className="fs-3">
					{productData.name.length > 15
						? productData?.name.substring(0, 15)
						: productData.name}
				</h3>
				<small className="text-muted">
					{currencyFormater(productData.price)}
				</small>
			</div>
			<div className="d-flex flex justify-content-center align-items-center p-2">
				<QuantityController
					increment={incrementQty}
					decrement={decrementQty}
					qty={product.qty}
					OnChangeQty={changeHandler}
				/>
				<div className="ms-1">
					total price:{" "}
					<span className="text-muted fs-6">
						{currencyFormater(product.qty * productData.price)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default CartProduct;
