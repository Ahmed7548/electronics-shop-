import { createContext, useState } from "react";

export enum paymentMethods {
	CARD = "CARD",
	COD = "CASH_ON_DELIVERY",
}

export const CheckOutContext = createContext<{
	[key: string]: [
		string,
		React.Dispatch<React.SetStateAction<string>>
	];
}>({});

const CheckOutProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// adress
	const [adress, setAdress] = useState("");

	// city
	const [city, setCity] = useState("");

	//zip
	const [zip, setZip] = useState("");

	//gov
	const [gov, setGov] = useState("");

	//coupon
	const [coupon, setCoupon] = useState("");

	//paymentMethod
	const [paymentMethod, setPaymentMethod] = useState<string>(
		paymentMethods.COD
  );
  
  //phones
  const [phone_1,setPhone_1]=useState("")
  const [phone_2,setPhone_2]=useState("")

	return (
		<CheckOutContext.Provider
			value={{
				adress: [adress, setAdress],
				city: [city, setCity],
				zip: [zip, setZip],
				gov: [gov, setGov],
				coupon: [coupon, setCoupon],
        payMethod: [paymentMethod, setPaymentMethod],
        phone_1: [phone_1,setPhone_1],
        phone_2:[phone_2,setPhone_2]
			}}
		>
			{children}
		</CheckOutContext.Provider>
	);
};

export default CheckOutProvider;
