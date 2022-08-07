import React, { useState } from "react";
import { Card, Form, FormGroup, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import validator from "validator";
import useValiodator from "../../hooks/useValidator";
import InputGroup from "../UI/InputGroup";
import { changeHandlerCreator } from "../../utils/helpers";
import { GoogleLogin, CredentialResponse  } from "@react-oauth/google";
import { authApi } from "../../API/api";
import { AxiosError } from "axios";


enum Gender {
	MALE = "M",
	FEMALE = "F",
	OTHER = "O",
}

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const isFirstNameVAlid = useValiodator(
		(str: string) => validator.isAlpha(str, "en-US", { ignore: "-" }),
		firstName
	);

	const [lastName, setLastName] = useState("");
	const isLastNameVAlid = useValiodator(
		(str: string) => validator.isAlpha(str, "en-US", { ignore: "-" }),
		lastName
	);

	const [email, setEmail] = useState("");
	const isEmailValid = useValiodator(
		(str: string) => validator.isEmail(str, {}),
		email
	);

	const [password, setPassword] = useState("");
	const isStrongPassword = useValiodator(
		(str: string) =>
			validator.isStrongPassword(str, {
				minLength: 6,
				minNumbers: 1,
				minSymbols: 1,
				minUppercase: 1,
			}),
		password
	);

	const [confirmedPassword, setConfirmedPassword] = useState("");
	const [confirmedPassValidity, setConfirmedPassVAlidity] = useState(true);

	const [errSignUp,setErrSignUp]=useState("")


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

	const googleLoginSuccess = async (response: CredentialResponse) => {
		try {		
	console.log("here")
	const { data,status, } = await authApi.post("/google", { credential: response.credential })
} catch (err) {
	if (err instanceof AxiosError) {
		setErrSignUp(err.response?.data.msg)
			}
			console.log(err)
		}
	}

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
							>(setFirstName)}
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
							>(setLastName)}
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
							setEmail
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
							setPassword
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
							setConfirmedPassword
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
							<GoogleLogin onSuccess={googleLoginSuccess} theme="filled_black" text="continue_with" />
							</div>
					</div>
				</Form>
				{errSignUp && <div className="text-center"><small className="text-danger text-center">{errSignUp}</small></div>}
			</Card.Body>
		</>
	);
};

export default SignUp;
