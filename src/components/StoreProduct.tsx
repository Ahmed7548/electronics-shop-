import { useRef } from "react";
import { Card,Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { currencyFormater } from "../utils/formatCurrency";


interface ProductData {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  discribtion:string
}

function StoreProduct({ item }: { item: ProductData }) {
  const navigate = useNavigate()
  const buttonRef= useRef<HTMLButtonElement>()

  const handelCartClick = (e:React.MouseEvent<HTMLElement, MouseEvent>):void => {
    if (e.target !== buttonRef.current) {
      console.log("pass")
      navigate(`/${item.id}`)
    }
    // add to cart code
  }
  
  return (
    <Card className="text-center pt-3" onClick={handelCartClick} style={{height:"25rem"}}>
      <Card.Img variant="top" src={item.imgUrl} height="200px" style={{objectFit:"cover"}}/>
      <Card.Body >
        <Card.Title>
          {item.name}
        </Card.Title>
        <Card.Subtitle className="text-muted m-2">
          {currencyFormater(item.price)}
        </Card.Subtitle>
        <Card.Text>
          {item.discribtion.length>100?`${item.discribtion.substring(0,100)}...`:item.discribtion}
        </Card.Text>
        <Button variant="outline-dark" className="mx-auto" ref={buttonRef as React.MutableRefObject<HTMLButtonElement>}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  )
  
}

export default StoreProduct