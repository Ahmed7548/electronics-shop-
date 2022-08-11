import React, { useRef } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { currencyFormater } from "../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { addTocart } from "../../store/slices/cartSlice";
import { Product } from "../../utils/types";
import {toast} from "react-toastify"

interface PropType {
	item: Product;
	cardHeight?: string;
	cardWidth?: string;
}

function StoreProduct({ item, cardHeight, cardWidth }: PropType) {
	const navigate = useNavigate();
	const buttonRef = useRef<HTMLButtonElement>();
	const dispatch = useDispatch();

	const handelCardClick = (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	): void => {
		if (e.target !== buttonRef.current) {
			navigate(`/store/product?id=${item.id}`);
			return 
		}
		// add to cart code
		dispatch(addTocart({ product: item, qty: 1 }));
		toast.success('product added to cart successfully', {
			position: "top-center",
			});
	};

	return (
		<Card
			className="text-center p-3 mb-3 mt-3 my-md-0 pionter"
			onClick={handelCardClick}
			style={{ height: cardHeight, width: cardWidth }}
		>
			<Card.Img
				variant="top"
				height="30%"
				style={{ objectFit: "contain" }}
				src={item.imgUrl[0]}
			></Card.Img>
			<Card.Body className="d-flex flex-column justify-content-between p-0 pt-3">
				<div>
					<Card.Title>{item.name.length > 20
							? `${item.name.substring(0, 20)}...`
							: item.name}</Card.Title>
					<Card.Subtitle className="text-muted m-2">
						{currencyFormater(item.price)}
					</Card.Subtitle>
					<Card.Text>
						{item.discribtion.length > 30
							? `${item.discribtion.substring(0, 30)}...`
							: item.discribtion}
					</Card.Text>
				</div>
				<Button
					variant="outline-dark"
					className="mx-auto"
					ref={buttonRef as React.MutableRefObject<HTMLButtonElement>}
				>
					Add to cart
				</Button>
			</Card.Body>
		</Card>
	);
}

export default StoreProduct;
