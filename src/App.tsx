import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import NavBar from "./components/header/NavBar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/app/store";
import {
	selectAppStartData,
	fetchAppStartData,
} from "./store/slices/appStartSlice";
import Error from "./components/Error";
import Product from "./pages/Product";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/auth/Login";
import User from "./pages/User";
import CheckOut from "./pages/CheckOut";
import { setCartFromSessionStorage } from "./store/slices/cartSlice";
import AuthContainer from "./components/auth/AuthContainer";
import SignUp from "./components/auth/SignUp";

function App() {


	const appStartData = useAppSelector(selectAppStartData);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAppStartData());
		const cartProducts = window.sessionStorage.getItem("cart")
		if (cartProducts) {
			dispatch(setCartFromSessionStorage(JSON.parse(cartProducts)))
		}
	}, []);

	if (appStartData.loading === "failed") {
		return (
			<>
				<NavBar categories={appStartData.categories} />
				<Error title="404"> couldn't load resources</Error>
			</>
		);
	}

	if (appStartData.loading === "pending") {
		return (
			<>
				<NavBar categories={appStartData.categories} />
				<p className="mt-5">loading</p>
			</>
		);
	}
	return (
		<>
			<NavBar categories={appStartData.categories} />
			<Container fluid="lg" as={"main"} className="mb-4">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />}>
						<Route path=":cat" element={<Store />} />
					</Route>
					<Route path="store/product" element={<Product />} />
					<Route path="/about" element={<About />} />
					<Route path="/cart" element={<Cart />} />
					<Route element={<PrivateRoute />}>
						<Route path="checkout" element={<CheckOut/>}/>
						<Route path="user/:id" element={<User />} />
					</Route>
					<Route path="/auth" element={<AuthContainer />}>
						<Route path="login" element={<Login/>}/>
						<Route path="signup" element={<SignUp />} />
						<Route path="*" element={<><Navigate to="/auth/login"/></>}/>
					</Route>
					<Route path="*" element={<><Error title="page was not found">
					page was not found
					</Error></>} />
				</Routes>
			</Container>
				<Footer/>
			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"

			/>

		</>
	);
}

export default App;
