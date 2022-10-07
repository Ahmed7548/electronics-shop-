import React, { useContext, useCallback } from "react";
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

// there should be a route on the back end to check for the availability of the order items
// if there were any discounts

function CheckOutCash() {
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
	const phoneNumberValidator = useCallback(
		(value: string) => validator.isMobilePhone(value) && value.length>9 && value.length<11,
		[]
	);
	const [phone_1Validity, setPhone_1Validity] = useValiodator(
		phoneNumberValidator,
		phone_1,500
	);
	const [phone_2Validity, setPhone_2Validity] = useValiodator(
		phoneNumberValidator,
		phone_2,500
  );
  
  // return false when the input is valid and true if it needs to be limited
  const phoneInputLimiter = (value: string): boolean => {
    if(value==="") return false
    return !validator.isNumeric(value) || value.length>11
  }




  //submit handler
  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({
      adress,
      city,
      gov,
      zip,
      coupon,
      phone_1,
      phone_2,
      paymentMethod
    })
  }


	return (
		<Card>
			<Card.Header className="fs-3 text-center">Check out</Card.Header>
			<Form onSubmit={submitHandler}>
				<Row>
					<Col xs={12} md={8}>
						<div className="p-3">
							<Card.Body className="p-4">
								<AddressFrom />
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
											placeholder="Nhone Number"
											type="text"
											validity={phone_2Validity}
											value={phone_2}
											inputText="+20"
										/>
									</Col>
								</Row>
								<Row>
									<Col xs={6} md={4} lg={3}>
										<div
											className="bg-light p-2 border pionter d-flex align-items-center"
											onClick={() => setPaymentMethod(paymentMethods.COD)}
										>
											<Form.Check
												checked={paymentMethod === paymentMethods.COD}
												// onClick={()=>setPaymentMethod(paymentMethods.COD)}
												value={paymentMethods.COD}
												type="radio"
												id={"cash-on-delivery"}
											/>
											<CashOnDelivery />
										</div>
									</Col>
									<Col xs={6} md={4} lg={3}>
										<div
											className="bg-light p-2 border pionter d-flex  align-items-center"
											onClick={() => setPaymentMethod(paymentMethods.CARD)}
										>
											<Form.Check
												checked={paymentMethod === paymentMethods.CARD}
												value={paymentMethods.CARD}
												type="radio"
												id={"cash-on-delivery"}
											/>
											<CreditCard />
										</div>
									</Col>
								</Row>
							</Card.Body>
						</div>
					</Col>
					<Col xs={12} md={4}>
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
