import { useRef } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { currencyFormater } from "../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { addTocart } from "../store/slices/cartSlice";

interface ProductData {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
	discribtion: string;
}


interface PropType{
  item: ProductData;
  cardHeight?: string;
  cardWidth?: string;
}

function StoreProduct({ item,cardHeight,cardWidth }:PropType) {
	const navigate = useNavigate();
	const buttonRef = useRef<HTMLButtonElement>();
	const dispatch = useDispatch();

	const handelCartClick = (
		e: React.MouseEvent<HTMLElement, MouseEvent>
	): void => {
		if (e.target !== buttonRef.current) {
			console.log("pass");
			navigate(`/store/product?id=${item.id}`);
		}
		// add to cart code
		dispatch(addTocart({ id: item.id, qty: 1 }));
	};

	return (
		<Card
			className="text-center pt-3"
			onClick={handelCartClick}
			style={{ height:cardHeight,width:cardWidth}}
		>
			<Card.Img
				variant="top"
				src={item.imgUrl}
				height="30%"
				style={{ objectFit: "contain" }}
			/>
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
