import React from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import CartProduct from "../components/CartProduct";
import { useSelector, useDispatch } from "react-redux"
import {selectCartProducts} from "../store/slices/cartSlice"

function Cart() {
  const products: {id:number,qty:number}[] = useSelector(selectCartProducts)
  
  return (
    <>
      {products.length ? products.map(product => (<CartProduct product={product} key={product.id} />)):<p>no product in cart</p>}
    </>
	);
}

export default Cart;
