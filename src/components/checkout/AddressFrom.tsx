import { useCallback, useContext } from "react";
import { CheckOutContext } from "../../store/contexts/CheckOutContext";
import validator from "validator";
import { Form, Row, Col } from "react-bootstrap";
import useValiodator from "../../hooks/useValidator";
import CustomInputGroup from "../UI/InputGroup";
import { changeHandlerCreator } from "../../utils/helpers";

const AddressFrom = () => {
	const {
		adress: [adress, setAdress],
		city: [city, setCity],
		zip: [zip, setZip],
		gov: [gov, setGov],
	} = useContext(CheckOutContext);

	// adress
	// validator callBack must be put in usecallback
	const adressValidator = useCallback((value: string) => value.length > 1, []);
	const [adressValidity, setAdressValidity] = useValiodator(
		adressValidator,
		adress
	);

	// city
	const cityValidator = useCallback(
		(value: string) => validator.isAlphanumeric(value),
		[]
	);
	const [cityVAlidity, setCityVAlidity] = useValiodator(cityValidator, city);

	// zip
	const zipValidator = useCallback((value: string) => {
		return validator.isNumeric(value) && value.length === 5;
  }, []);
  
  const [zipValidity,setZipValidity]= useValiodator(zipValidator,zip)

	return (
		<>
			<CustomInputGroup
				label="Adress"
				msg="Adress required"
				type="text"
				validity={adressValidity}
				placeholder="Enter a descriptive address"
				value={adress}
				onChange={changeHandlerCreator<React.ChangeEvent<HTMLInputElement>>(
					setAdress,
					setAdressValidity
				)}
			/>
			<Row className="mb-3">
				<Col className="col-12 col-md-4">
					<CustomInputGroup
						label="City"
						msg="City Required"
						type="text"
						validity={cityVAlidity}
						placeholder="Enter a descriptive address"
						value={city}
						onChange={changeHandlerCreator<React.ChangeEvent<HTMLInputElement>>(
							setCity,
							setCityVAlidity
						)}
					/>
				</Col>
				<Col className="col-12 col-md-4">
					<CustomInputGroup
						label="ZIP Code"
						msg="ZIP Code required"
						type="text"
						validity={zipValidity}
						placeholder="Enter a descriptive address"
						value={zip}
						onChange={changeHandlerCreator<React.ChangeEvent<HTMLInputElement>>(
							setZip,
							setZipValidity,
							(value: string) =>
              {
                if (value === "") {
                  return false;
                }
                return value.length > 5 || !validator.isNumeric(value)
              }
						)}
					/>
				</Col>

				<Form.Group className="col-12 col-md-4" as={Col} controlId="formGridState">
					<Form.Label>Governerate</Form.Label>
					<Form.Select
						value={gov}
						onChange={changeHandlerCreator<
							React.ChangeEvent<HTMLSelectElement>
						>(setGov)}
					>
						{/* governerates array */}
						<option value="cairo">cairo</option>
						<option value="ismailia">Ismailia</option>
					</Form.Select>
				</Form.Group>
			</Row>
		</>
	);
};

export default AddressFrom;
