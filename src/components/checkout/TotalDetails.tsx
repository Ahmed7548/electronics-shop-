import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const TotalDetails = () => {
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
			<Form>
				<Row className="align-items-end justify-content-between">
					<Col xs={8}>
						<Form.Group>
							<Form.Label>Coupon</Form.Label>
							<Form.Control type="text" placeholder="Enter Coupon" />
						</Form.Group>
					</Col>
					<Col xs={4}>
						<Button variant="outline-dark">Apply</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default TotalDetails;
