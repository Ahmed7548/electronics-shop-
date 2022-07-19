import React from "react";
import { Container, Nav, Navbar as Navbarbs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ShoppingCartButton from "./ShoppingCartButton";
import { NavLink } from "react-router-dom";

function NavBar() {

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
			<ShoppingCartButton number={3}/>
			</Container>
		</Navbarbs>
	);
}

export default NavBar;
