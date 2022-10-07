import React, { useState } from "react";
import { Form, FormGroup, InputGroup as BSInputGroup } from "react-bootstrap";

interface PropType {
	label: string;
	type: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validity: boolean;
	msg: string;
	className?: string;
	inputText?: string;
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
	inputText,
}: PropType) => {
	let _inputGroup: React.ReactNode = "";

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
		onChange(e);
	};

	let inputValid = !validity && clicked;

	const _formControl = (
		<Form.Control
			onBlur={blurHandler}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={changeHandler}
			className={inputValid ? "invalid-input" : ""}
		/>
	);

	if (inputText) {
		console.log(inputText)
		_inputGroup = (
			<BSInputGroup>
				<BSInputGroup.Text>{inputText}</BSInputGroup.Text>
				{_formControl}
			</BSInputGroup>
		);
	} else {
		_inputGroup = _formControl;
	}

	return (
		<>
			<FormGroup className={`mb-3 ${className}`}>
				<Form.Label>{label}</Form.Label>
				{_inputGroup}
				{inputValid && <Form.Text className="text-danger">{msg}!</Form.Text>}
			</FormGroup>
		</>
	);
};

export default InputGroup;
