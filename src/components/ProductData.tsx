import React, { useState } from 'react'
import ImageSlider from "../components/ImageSlider";
import QuantityController from "../components/QuantityController";
import { Button,Container } from 'react-bootstrap';
import { Product } from '../utils/types';
import { useAppDispatch } from '../store/app/store';
import { addTocart } from '../store/slices/cartSlice';

const ProductData = ({product}:{product:Product}) => {
  const dispatch= useAppDispatch()
	const [qty, setQty] = useState(1);

  const IncrementHandler = () => {
		setQty((prevState) => prevState + 1);
	};
	const DecrementHandler = () => {
		if (qty === 1) return;
		setQty((prevState) => prevState - 1);
	};

	const ChangeQtyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (value < 1) return;
		setQty(value);
  };
  
  const addToCartHandler = (e:React.FormEvent) => {
    e.preventDefault()
    dispatch(addTocart({ product, qty }))
    setQty(1)
  }
  
  return (
    <><Container fluid className="d-flex flex-column flex-md-row justify-content-evenly align-items-center mb-5 bg-white p-3">
    <ImageSlider
      images={product.imgUrl}
      height="60vh"
    />
    <div className="slider p-3 mx-sm-3 bg-white">
        <h3>{product.name}</h3>
      <small className="text-muted fs-5">$100.99</small>
      <p>
        {product.discribtion}
      </p>
        <h5>product specification</h5>
        <ul>
          {product.specification.map((line, ind) => (<li key={ind}>{ line}</li>))}
      </ul>
      <form className="d-flex justify-content-between" onSubmit={addToCartHandler}>
        <Button type='submit' variant="outline-dark">Add To Cart</Button>
        <QuantityController
          OnChangeQty={ChangeQtyHandler}
          decrement={DecrementHandler}
          qty={qty}
          increment={IncrementHandler}
          direction={"flex-row"}
        />
      </form>
    </div>
  </Container></>
  )
}

export default ProductData