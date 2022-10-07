import React, { useState, useContext } from "react";
import { Col, Card} from "react-bootstrap"
import { Outlet } from "react-router-dom";

enum paymentMethods {
	CARD = "CARD",
	COD = "CASH_ON_DELIVERY",
}

// there should be a route on the back end to check for the availability of the order items
// if there were any discounts

function CheckOut() {
	const [paymentMethod, setPaymentMethod] = useState<paymentMethods | null>(
		null
	);

	// todo
	// the Adress form state either be here or use context

	// we can use outlet here
	return (
    <Col className="col-12 m-auto">
    <Card>
        <Outlet/>
    </Card>
  </Col>
	);
}

export default CheckOut;
