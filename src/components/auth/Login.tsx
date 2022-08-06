import React, { useState } from "react";
import useValiodator from "../../hooks/useValidator";
import validator from "validator";
import AuthContainer from "./AuthContainer";
import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputGroup from "../UI/InputGroup";
import { changeHandlerCreator } from "../../utils/helpers";

const Login = () => {
	const [email, setEmail] = useState("");
	const isEmailValid = useValiodator(
		(str: string) => validator.isEmail(str, {}),
		email
	);

	const [password, setPassword] = useState("");

	return (
		<>
			<Card.Header className="fs-3 text-center">Log in</Card.Header>
			<Card.Body>
				<InputGroup
					label="Email"
					onChange={changeHandlerCreator<React.ChangeEvent<HTMLInputElement>>(
						setEmail
					)}
					validity={isEmailValid}
					msg="invalid email"
					value={email}
					placeholder="enter your email"
					type="text"
				/>
				<InputGroup
					label="Password"
					onChange={changeHandlerCreator<React.ChangeEvent<HTMLInputElement>>(
						setPassword
					)}
					validity={true}
					msg=""
					value={password}
					placeholder="enter your password"
					type="password"
				/>
				<div className="my-3 text-center">
					<Button
						disabled={isEmailValid}
						variant="outline-primary"
						className="w-100 mb-1"
						type="submit"
					>
						log in
					</Button>
					<Form.Text className=" w-100">
						don,t have acount <Link to="/auth/signup">sign up</Link> now
					</Form.Text>
				</div>
			</Card.Body>
		</>
	);
};

export default Login;
