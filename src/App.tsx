import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import NavBar from "./components/NavBar";

function App() {
	return (
		<>
			<NavBar />
			<Container fluid="sm" className="mb-4">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />} />
					<Route path="/about" element={<About />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
