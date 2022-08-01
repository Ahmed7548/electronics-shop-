import React, { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import {
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Form,
	Button,
} from "react-bootstrap";
import ShoppingCartButton from "../UI/ShoppingCartButton";
import { NavLink, useNavigate } from "react-router-dom";
import { selectCartProducts } from "../../store/slices/cartSlice";
import store, {
	RootState,
	useAppDispatch,
	useAppSelector,
} from "../../store/app/store";
import { Categories } from "../../store/slices/appStartSlice";

function NavBar({ categories }: { categories: Categories[] }) {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();


	

	const searchHandler= (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// if not in store already navigate to store
			navigate(`/store?search=${search}`);
	
	};

	const cartItems = useAppSelector(selectCartProducts).length;
	return (
		<Navbar
			sticky="top"
			className="bg-white shadow-sm mb-3"
			collapseOnSelect
			expand="md"
		>
			<Container fluid="md">
				<Navbar.Brand as={NavLink} to="/">
					Electronics
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="esponsive-navbar-nav">
					<Nav className="m-auto">
						<Nav.Link to="/" as={NavLink}>
							Home
						</Nav.Link>
						<Nav.Link to="/store" as={NavLink}>
							Store
						</Nav.Link>
						<NavDropdown menuVariant="dark" title="categories">
							{categories.map((category) => (
								<NavDropdown.Item
									as={NavLink}
									to={`/store/${category.name}`}
									key={category.id}
								>
									{category.name}
								</NavDropdown.Item>
							))}
						</NavDropdown>
						<Nav.Link to="/about" as={NavLink}>
							About
						</Nav.Link>
					</Nav>
					<Form className="d-flex my-sm-3 my-md-0" onSubmit={searchHandler}>
						<Form.Control
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
						<Button
							type="submit"
							variant="outline-success"
							className="me-3"
						>
							Search
						</Button>
					</Form>
					<ShoppingCartButton number={cartItems} />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;