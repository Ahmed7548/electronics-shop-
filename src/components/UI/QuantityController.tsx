import React from "react";
import { Button, Form } from "react-bootstrap";


interface PropType {
	increment: () => void;
  decrement: () => void;
  OnChangeQty:(e:React.ChangeEvent<HTMLInputElement>)=>void
  qty: number;
  direction?: "flex-column"|"flex-row";
}

const QuantityController = ({ qty, increment, decrement,OnChangeQty,direction }: PropType) => {


  const onNumChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    OnChangeQty(e)
  }

	return (
		<div className={`d-flex align-items-center ${direction||"flex-column"} quantity-controller  `}>
			<Button
				variant="outline-dark"
				className="p-0 text-center small-button "
				onClick={() => {
					increment();
				}}
			>
				{"<"}
			</Button>
      {/* <div className="fs-2 mx-2">{qty}</div> */}
      <input type="number" name="qty" id="qty" className={`fs-3 mx-2 num-input border`} value={qty} onChange={onNumChange} />
			<Button
				variant="outline-dark"
				className="p-0 text-center small-button "
				onClick={() => {
					decrement();
				}}
			>
				{">"}
			</Button>
		</div>
	);
};

export default QuantityController;
