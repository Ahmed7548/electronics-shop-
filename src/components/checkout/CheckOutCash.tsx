import React, { useContext, useCallback, useState } from "react";
import { Col, Card, Form, Button, Row } from "react-bootstrap";
import InputGroup from "../UI/InputGroup";
import Accordion from "react-bootstrap/Accordion";
import AddressFrom from "./AddressFrom";
import TotalDetails from "./TotalDetails";
import CashOnDelivery from "../UI/checkOut/CashOnDelivery";
import CreditCard from "../UI/checkOut/CreditCard";
import {
	CheckOutContext,
	paymentMethods,
} from "../../store/contexts/CheckOutContext";
import useValiodator from "../../hooks/useValidator";
import validator from "validator";
import { changeHandlerCreator } from "../../utils/helpers";
import RadioBoxGroup from "../UI/RadioBoxGroup";
import { useAppSelector,useAppDispatch } from "../../store/app/store";
import { selectCartProducts,emptyCart } from "../../store/slices/cartSlice";

// there should be a route on the back end to check for the availability of the order items
// if there were any discounts

function CheckOutCash() {
	const [adressFormValidity, setFromValidity] = useState(false);

	//form validity change handler

	// select the card product from redux store
	const cartProducts = useAppSelector(selectCartProducts);
	const dispatch=useAppDispatch()

	const {
		adress: [adress],
		city: [city],
		zip: [zip],
		gov: [gov],
		coupon: [coupon],
		payMethod: [paymentMethod, setPaymentMethod],
		phone_1: [phone_1, setPhone_1],
		phone_2: [phone_2, setPhone_2],
	} = useContext(CheckOutContext);

	//payment method handler
	// const paymentMethodHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setPaymentMethod(e.target.value as paymentMethods);
	// };

	// todo
	// the Adress form state either be here or use context

	// phone number validator
	const phoneNumberValidator = useCallback((value: string) => {
		if (value[0] === "0") {
			return validator.isMobilePhone(value) && value.length === 11;
		}
		return validator.isMobilePhone(value) && value.length === 10;
	}, []);
	const [phone_1Validity, setPhone_1Validity] = useValiodator(
		phoneNumberValidator,
		phone_1,
		500
	);
	const [phone_2Validity, setPhone_2Validity] = useValiodator(
		phoneNumberValidator,
		phone_2,
		500
	);

	// return false when the input is valid and true if it needs to be limited
	const phoneInputLimiter = (value: string): boolean => {
		if (value === "") return false;
		if (value[value.length - 1] === " ") return true;
		return !validator.isNumeric(value) || value.length > 11;
	};

	// radioBox group changeHandler

	const radioChangeHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (e.target instanceof HTMLInputElement) {
			setPaymentMethod(e.target.value);
		}
	};

	//submit handler
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const numbers = {
			firstNumber: phone_1.trim()[0] === "0" ? `+2${phone_1}` : `+20${phone_1}`,
			secondNumber:
				phone_1.trim()[0] === "0" ? `+2${phone_2}` : `+20${phone_2}`,
		};
		const adressData = {
			addressString: adress,
			gov,
			city,
			zipCode: zip,
		};

		const orderObject = {
			phoneNumbers: numbers,
			adressData,
			coupon,
			paymentMethod,
			products: cartProducts.map((prod) => ({
				id: prod.product.id,
				qty: prod.qty,
			})),
		};

		console.log(orderObject);


		// after the order is placed successfully cart mus be emptied
		dispatch(emptyCart())
	};

	const formValidity = adressFormValidity && phone_1Validity && phone_2Validity;

	return (
		<Card>
			<Card.Header className="fs-3 text-center">Check out</Card.Header>
			<Form onSubmit={submitHandler}>
				<Row>
					<Col xs={12} md={7}>
						<div className="p-3">
							<Card.Body className="p-4">
								<AddressFrom setAdressFormValidity={setFromValidity} />
								<Row className="mb-3">
									<Col className="col-12 col-sm-6">
										<InputGroup
											label="Phone Number"
											msg="Not Valid"
											onChange={changeHandlerCreator(
												setPhone_1,
												setPhone_1Validity,
												phoneInputLimiter
											)}
											placeholder="Nhone Number"
											type="text"
											validity={phone_1Validity}
											value={phone_1}
											inputText="+20"
										/>
									</Col>
									<Col className="col-12 col-sm-6">
										<InputGroup
											label="Phone Number"
											msg="Not Valid"
											onChange={changeHandlerCreator(
												setPhone_2,
												setPhone_2Validity,
												phoneInputLimiter
											)}
											placeholder="phone Number"
											type="text"
											validity={phone_2Validity}
											value={phone_2}
											inputText="+20"
										/>
									</Col>
								</Row>
								<RadioBoxGroup
									onChange={radioChangeHandler}
									valueState={paymentMethod}
									radiosValues={[
										{
											label: <CashOnDelivery />,
											props: {
												value: paymentMethods.COD,
												type: "radio",
												id: "cash-on-delivery",
											},
										},
										{
											label: <CreditCard />,
											props: {
												value: paymentMethods.CARD,
												type: "radio",
												id: "Card-delivery",
											},
										},
									]}
								/>
							</Card.Body>
						</div>
					</Col>
					<Col xs={12} md={5}>
						<Accordion defaultActiveKey="1" className="p-4">
							<Accordion.Item eventKey="1">
								<Accordion.Header>Order Sum</Accordion.Header>
								<Accordion.Body>
									<TotalDetails />
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
						<div className="p-3">
							<Button
								variant="dark"
								type="submit"
								className="ms-auto px-5 w-100"
								disabled={!formValidity}
							>
								Check Out
							</Button>
						</div>
					</Col>
				</Row>
			</Form>
		</Card>
	);
}

export default CheckOutCash;
