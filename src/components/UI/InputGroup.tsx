import React, { useState } from "react";
import { Form, FormGroup, Placeholder } from "react-bootstrap";

interface PropType {
	label: string;
	type: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validity: boolean;
	msg: string;
	className?: string;
}

const InputGroup = ({
	label,
	onChange,
	type,
	placeholder,
	value,
	validity,
	msg,
	className,
}: PropType) => {
	const [clicked, setClicked] = useState(false);

	const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		if (clicked === false) {
			setClicked(true);
		}
	};
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (clicked === false) {
			setClicked(true);
		}
		onChange(e)
	}

	let displayValid=!validity && clicked 

	return (
		<>
			<FormGroup className={`mb-3 ${className}`}>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					onBlur={blurHandler}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={changeHandler}
					className={displayValid? "invalid-input":""}
				/>
				{displayValid&& (
					<Form.Text className="text-danger">{msg}!</Form.Text>
				)}
			</FormGroup>
		</>
	);
};

export default InputGroup;
