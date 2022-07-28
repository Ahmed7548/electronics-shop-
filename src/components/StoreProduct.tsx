import React, { useRef } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { currencyFormater } from "../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { addTocart } from "../store/slices/cartSlice";
import { Product } from "../utils/types";

interface PropType {
	item: Product;
	cardHeight?: string;
	cardWidth?: string;
}

function StoreProduct({ item, cardHeight, cardWidth }: PropType) {
	const navigate = useNavigate();
	const buttonRef = useRef<HTMLButtonElement>();
	const dispatch = useDispatch();

	const handelCartClick = (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	): void => {
		if (e.target !== buttonRef.current) {
			navigate(`/store/product?id=${item.id}`);
		}
		// add to cart code
		dispatch(addTocart({ product: item, qty: 1 }));
	};

	return (
		<Card
			className="text-center pt-3 mb-3 mt-3 my-md-0"
			onClick={handelCartClick}
			style={{ height: cardHeight, width: cardWidth }}
		>
			<Card.Img
				variant="top"
				height="30%"
				style={{ objectFit: "contain" }}
				src={item.imgUrl[0]}
			></Card.Img>
			<Card.Body className="d-flex flex-column justify-content-around">
				<div>
					<Card.Title>{item.name}</Card.Title>
					<Card.Subtitle className="text-muted m-2">
						{currencyFormater(item.price)}
					</Card.Subtitle>
					<Card.Text>
						{item.discribtion.length > 100
							? `${item.discribtion.substring(0, 100)}...`
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
