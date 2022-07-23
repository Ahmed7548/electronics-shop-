import React from "react";
import { Col, Row } from "react-bootstrap";
import StoreProduct from "../components/StoreProduct";
import useGetStoreProducts from "../hooks/useGetStoreProducts";


function Store() {
	const products = useGetStoreProducts()
	return (
		<>
      <Row lg={3} md={2} sm={1} xs={1} className="g-5">
        {products.map((item):JSX.Element => {
          return (<Col key={item.id}><StoreProduct item={item}/></Col>) 
        })}
			</Row>
		</>
	);
}

export default Store;
