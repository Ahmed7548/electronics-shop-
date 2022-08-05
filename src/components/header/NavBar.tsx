import  {
	FormEvent,
	useState,
} from "react";
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
import  {
	useAppSelector,
} from "../../store/app/store";
import { Categories } from "../../store/slices/appStartSlice";
import Sign from "./Sign";

function NavBar({ categories }: { categories: Categories[] }) {
	// this will come from redux
	const auth = false;
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const searchHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// if not in store already navigate to store
		navigate(`/store?search=${search}`);
	};

	const cartItems = useAppSelector(selectCartProducts).length;
	return (
		<Navbar
			className="bg-white shadow-sm mb-3"
			collapseOnSelect
			expand="md"
		>
			<Container fluid="lg" className="d-block">
				<div className="d-flex mb-md-3 py-2 pb-md-0 justify-content-between align-items-center">
					<Navbar.Brand as={NavLink} to="/" className="ps-2">
						Electronics
					</Navbar.Brand>
				
					<div className="d-flex">
						<Sign auth={auth} user={{ name: "Ahmed", avatar: "...url", id: 1 }} />
					<ShoppingCartButton number={cartItems} />
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					</div>
				</div>
				<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
					
					<Nav>
						<Nav.Link to="/" as={NavLink}>
							Home
						</Nav.Link>
						<Nav.Link to="/store" as={NavLink}>
							Store
						</Nav.Link>
						<NavDropdown menuVariant="light" title="categories">
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
							className="me-2 "
							aria-label="Search"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
						<Button type="submit" variant="outline-dark" className="">
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
