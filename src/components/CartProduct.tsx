import React from 'react'
import {Button} from "react-bootstrap"

function CartProduct() {
  return (
    <div
    className=" m-auto d-flex justify-content-between border p-3 align-items-start bg-white"
    style={{ width: "500px" }}
  >
    <img
      src="https://images.olx.com.eg/thumbnails/30529374-240x180.jpeg"
      width="200px"
      style={{ objectFit: "contain" }}
    />
    <div className="ms-3 d-flex justify-content-center align-items-ccenter flex-column">
      <h3 className="fs-3">product</h3>
      <small className="text-muted">$10.3</small>
    </div>
    <div className="d-flex flex-column justify-content-center align-items-center p-2">
      <div className="d-flex" style={{height:"3rem"}}>
        <Button  style={{width:"2.5rem",height:"2.5rem"}}>+</Button><div className="fs-2 mx-2">1</div><Button style={{width:"2.5rem",height:"2.5rem"}}>-</Button>
      </div>
        <p className="mt-2">total price: <span className="text-muted">$33.4</span></p>
    </div>
  </div>
  )
}

export default CartProduct