import CartSvg from "../UI/CartSvg";

function EmptyCart() {
	return (
    <>
      <div className=" m-auto border p-3 align-items-center bg-white cart-element fs-3 text-center">
			<p >
				Cart Is Empty
			</p>
			<CartSvg width="10rem" height="10rem" fill="#000" />
      </div>
		</>
	);
}

export default EmptyCart;
