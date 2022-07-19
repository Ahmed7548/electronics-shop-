import React from "react";
import { Col, Row } from "react-bootstrap";
import StoreProduct from "../components/StoreProduct";
import storeItems from "../data/items.json"


function Store() {
	return (
		<>
      <Row lg={3} md={2} sm={1} xs={1} className="g-5">
        {storeItems.map((item):JSX.Element => {
          return (<Col key={item.id}><StoreProduct item={item}/></Col>) 
        })}
			</Row>
		</>
	);
}

export default Store;
