import React from "react";
import { Container, Nav, Navbar as Navbarbs } from "react-bootstrap";
import ShoppingCartButton from "./ShoppingCartButton";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartProducts, State } from "../store/slices/cartSlice";
import { Store } from "../store/app/store";

function NavBar() {
	
	const cartItems= useSelector<Store,State>(selectCartProducts).length

	return (
		<Navbarbs sticky="top" className="bg-white shadow-sm mb-3">
			<Container>
				<Nav className="me-auto">
					<Nav.Link to="/" as={NavLink}>
						Home
					</Nav.Link>
					<Nav.Link to="/store" as={NavLink}>
						Store
					</Nav.Link>
					<Nav.Link to="/about" as={NavLink}>
						About
					</Nav.Link>
				</Nav>
			<ShoppingCartButton number={cartItems}/>
			</Container>
		</Navbarbs>
	);
}

export default NavBar;
