import React from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import CartProduct from "../components/CartProduct";
import {useSelector,useDispatch} from "react-redux"

function Cart() {
  return (
    <>
		<CartProduct/>
    </>
	);
}

export default Cart;
