import { useState } from 'react'
import ImageSlider from "../components/ImageSlider";
import QuantityController from "../components/QuantityController";
import { Button,Container } from 'react-bootstrap';
import { Product } from '../utils/types';

const ProductData = ({product}:{product:Product}) => {

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
  
  return (
    <><Container fluid className="d-flex flex-column flex-md-row justify-content-evenly align-items-center mb-5 bg-white p-3">
    <ImageSlider
      images={product.imgUrl}
      height="60vh"
    />
    <div className="slider p-3 mx-sm-3 bg-white">
      <h3>product name</h3>
      <small className="text-muted fs-5">$100.99</small>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
        porro. Officia quia velit architecto sint iusto tempore nulla ipsa!
        Deleniti, vitae magni nemo tempora expedita minima esse maxime
        fugiat quis!
      </p>
        <h5>product specification</h5>
      <ul>
        <li>adasdosm</li>
        <li>adasdosm</li>
        <li>adasdosm</li>
        <li>adasdosm</li>
        <li>adasdosm</li>
        <li>adasdosm</li>
        <li>adasdosm</li>
        <li>adasdosm</li>
        <li>adasdosm</li>
        <li>adasdosm</li>	
      </ul>
      <form className="d-flex justify-content-between">
        <Button variant="outline-dark">Add To Cart</Button>
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