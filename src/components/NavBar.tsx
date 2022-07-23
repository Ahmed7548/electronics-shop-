import React from "react";
import { Container, Nav, Navbar, NavDropdown  } from "react-bootstrap";
import ShoppingCartButton from "./ShoppingCartButton";
import { NavLink } from "react-router-dom";
import { selectCartProducts } from "../store/slices/cartSlice";
import { useAppSelector } from "../store/app/store";

function NavBar() {
	
	const cartItems= useAppSelector(selectCartProducts).length

	return (
		<Navbar sticky="top" className="bg-white shadow-sm mb-3" collapseOnSelect  expand="md">
			<Container fluid="md">
			<Navbar.Brand as={NavLink} to="/">Electronics</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="esponsive-navbar-nav">
				<Nav className="m-auto" >
					<Nav.Link to="/" as={NavLink}>
						Home
					</Nav.Link>
					<Nav.Link to="/store" as={NavLink}>
						Store
					</Nav.Link>
					<NavDropdown title="categories">
						<NavDropdown.Item>mobile</NavDropdown.Item>
						<NavDropdown.Item>laptops</NavDropdown.Item>
						<NavDropdown.Item>TVs</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item>show All categories</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link to="/about" as={NavLink}>
						About
					</Nav.Link>
					</Nav>
					<ShoppingCartButton number={cartItems}/>
					</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
