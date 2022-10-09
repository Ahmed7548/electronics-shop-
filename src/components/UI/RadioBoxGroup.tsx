import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FormCheckInputProps } from "react-bootstrap/esm/FormCheckInput";

interface Prop {
	valueState: string;
	onChange: (e: React.ChangeEvent<HTMLDivElement>) => void;
	radiosValues: {
		props: FormCheckInputProps;
		label: React.ReactNode;
	}[];
}

const RadioBoxGroup = ({ valueState, onChange, radiosValues }: Prop) => {
	const changeHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
		onChange(e);
	};

	return (
		<Row onChange={changeHandler}>
			{radiosValues.map(({ props, label }, ind) => (
				<Col
					xs={5}
					md={4}
					lg={3}
					as={"label"}
					value={props.value}
					className="bg-light p-2 m-2 border pionter d-flex align-items-center justify-content-center position-relative"
					key={ind}
				>
					<Form.Check
						name="radio-group"
						defaultChecked={valueState === props.value}
						{...props}
					/>
					{label}
				</Col>
			))}
		</Row>
	);
};

export default RadioBoxGroup;
