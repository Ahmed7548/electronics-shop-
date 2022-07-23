import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/app/store";
import { selectAppStartData,fetchAppStartData } from "./store/slices/appStartSlice";

function App() {
	const appStartData = useAppSelector(selectAppStartData)
	const dispatch=useAppDispatch()
	useEffect(() => {
		dispatch(fetchAppStartData())
	},[])
	return (
		<>
			<NavBar categories={appStartData.categories} />
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
