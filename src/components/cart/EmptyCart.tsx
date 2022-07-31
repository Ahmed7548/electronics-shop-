import React from 'react'
import CartSvg from '../UI/CartSvg'

function EmptyCart() {
  return (
    <p className=" m-auto border p-3 align-items-center bg-white cart-element fs-3 text-center">
      Cart Is Empty
      <CartSvg width='10rem' height='10rem' fill='#000'/>
    </p>
  )
}

export default EmptyCart