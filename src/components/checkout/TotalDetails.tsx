import React, { useContext,useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { CheckOutContext } from "../../store/contexts/CheckOutContext";

const TotalDetails = () => {
	const [btnDis,setBtnDis]=useState(false)

	const {
		coupon: [, setCoupon],
	} = useContext(CheckOutContext);


	const couponChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCoupon(e.target.value)
	}


	// todo ->check for coupon validity by the api and if valid update the discount part 
	const CheckForCouponValidity = () => {
		console.log("api request")
		setBtnDis(true)
		setTimeout(() => {
			setBtnDis(false)
		},1000)
	}

	return (
		<div>
			<Row className="mt-2">
				<Col className="">
					<h5>Cart Total</h5>
				</Col>
				<Col className="text-end">
					<small className="text-muted">100.00$</small>
				</Col>
			</Row>
			<Row className="mt-2">
				<Col className="">
					<h5>Shipping Fee</h5>
				</Col>
				<Col className="text-end">
					<small className="text-muted">20.00$</small>
				</Col>
			</Row>
			<Row className="mt-2">
				<Col className="">
					<h5>discounts</h5>
				</Col>
				<Col className="text-end">
					<small className="text-muted">-20.00$</small>
				</Col>
			</Row>
			<Row className="border-top pt-4">
				<Col className="">
					<h4>Total</h4>
				</Col>
				<Col className="text-end">
					<small className="fs-5">100.00$</small>
				</Col>
			</Row>
			<fieldset>
				<Row className="align-items-end justify-content-between g-sm-3 g-4">
					<Col xs={8}>
						<Form.Group>
							<Form.Label>Coupon</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Coupon"
								onChange={couponChangeHandler}
							/>
						</Form.Group>
					</Col>
					<Col xs={4} className="d-flex justify-content-end">
						<Button variant="outline-dark" onClick={CheckForCouponValidity} disabled={btnDis}>
							Apply
						</Button>
					</Col>
				</Row>
			</fieldset>
		</div>
	);
};

export default TotalDetails;
