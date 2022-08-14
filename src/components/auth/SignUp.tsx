import React, { useState,useCallback } from "react";
import { Card, Form, FormGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import validator from "validator";
import useValiodator from "../../hooks/useValidator";
import InputGroup from "../UI/InputGroup";
import { changeHandlerCreator } from "../../utils/helpers";
import ContinueWitGoogle from "../google/ContinueWitGoogle";

const SignUp = () => {
	const nameValidator= useCallback((str:string)=>validator.isAlpha(str, "en-US", { ignore: "-" }),[])
	const [firstName, setFirstName] = useState("");
	const [isFirstNameVAlid, setfirstNameValidity] = useValiodator(
		nameValidator,
		firstName
	);

	const [lastName, setLastName] = useState("");
	const [isLastNameVAlid, setLastNameValidity] = useValiodator(
		nameValidator,
		lastName
	);

	const [email, setEmail] = useState("");
	const emailValidator= useCallback((str:string)=>validator.isEmail(str, {}),[])
	const [isEmailValid, setEmailValidity] = useValiodator(
		emailValidator,
		email
	);

	const [password, setPassword] = useState("");
	const passwordValidator = useCallback((str: string) => validator.isStrongPassword(str, {
		minLength: 6,
		minNumbers: 1,
		minSymbols: 1,
		minUppercase: 1,
	}),[])
	const [isStrongPassword, setPasswordValidity] = useValiodator(
		passwordValidator,
		password
	);

	const [confirmedPassword, setConfirmedPassword] = useState("");
	const [confirmedPassValidity, setConfirmedPassVAlidity] = useState(true);

	const [errSignUp, setErrSignUp] = useState("");

	let submitDisabled = !(
		isFirstNameVAlid &&
		isLastNameVAlid &&
		isEmailValid &&
		isStrongPassword &&
		confirmedPassValidity
	);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password.trim() !== confirmedPassword.trim()) {
			setConfirmedPassVAlidity(false);
			return;
		}

		if (confirmedPassValidity === false) {
			setConfirmedPassVAlidity(true);
		}
		console.log({
			firstName,
			lastName,
			email,
			password,
			confirmedPassword,
		});
	};


	return (
		<>
			<Card.Header className="fs-3 text-center">SignUp</Card.Header>
			<Card.Body>
				<Form onSubmit={submitHandler}>
					<FormGroup className="d-flex justify-content-between">
						<InputGroup
							className="me-1"
							label="First Name"
							onChange={changeHandlerCreator<
								React.ChangeEvent<HTMLInputElement>
							>(setFirstName, setfirstNameValidity)}
							placeholder="first name"
							type="text"
							validity={isFirstNameVAlid}
							value={firstName}
							msg="first name invalid"
						/>
						<InputGroup
							className="ms-1"
							label="Last Name"
							onChange={changeHandlerCreator<
								React.ChangeEvent<HTMLInputElement>
							>(setLastName, setLastNameValidity)}
							placeholder="last name"
							type="text"
							validity={isLastNameVAlid}
							value={lastName}
							msg="last name invalid"
						/>
					</FormGroup>
					<InputGroup
						label="Email"
						onChange={changeHandlerCreator<React.ChangeEvent<HTMLInputElement>>(
							setEmail,
							setEmailValidity
						)}
						placeholder="email"
						type="email"
						validity={isEmailValid}
						value={email}
						msg="invalid email"
					/>
					<InputGroup
						label="Password"
						onChange={changeHandlerCreator<React.ChangeEvent<HTMLInputElement>>(
							setPassword,
							setPasswordValidity
						)}
						placeholder="password"
						type="password"
						validity={isStrongPassword}
						value={password}
						msg="weak password"
					/>
					<InputGroup
						label="Confirm Password"
						onChange={changeHandlerCreator<React.ChangeEvent<HTMLInputElement>>(
							setConfirmedPassword,
							setConfirmedPassVAlidity
						)}
						placeholder="confirm password"
						type="password"
						validity={confirmedPassValidity}
						value={confirmedPassword}
						msg="confirmed password is not the same as the password"
					/>

					<div className="my-3 text-center">
						<Button
							disabled={submitDisabled}
							variant="outline-primary"
							className="w-100 mb-1"
							type="submit"
						>
							sign up
						</Button>
						<Form.Text className=" w-100">
							already have acount <Link to="/auth/login">Login</Link>...
						</Form.Text>
						<div className="my-3 m-auto d-flex justify-content-center">
					<ContinueWitGoogle setError={setErrSignUp} text="signup_with"/>
						</div>
					</div>
				</Form>
				{errSignUp && (
					<div className="text-center">
						<small className="text-danger text-center">{errSignUp}</small>
					</div>
				)}
			</Card.Body>
		</>
	);
};

export default SignUp;
