import React, { useEffect, useRef, useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import "../../styles/imageInput.css"


interface PropType {
  onInput:(image:File)=>void
}

const ImageInput = ({onInput}:PropType) => {  
  const [preview,setPreview]=useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const readerRef= useRef(new FileReader()) 


  const handleInput = () => {
    console.log(fileInputRef.current?.files)
    if (fileInputRef.current &&fileInputRef.current.files && fileInputRef.current.files.length>0) {
      readerRef.current.readAsDataURL(fileInputRef.current.files[0])
      console.log(fileInputRef.current.files[0])
      onInput(fileInputRef.current.files[0])
      }
  }
  
  useEffect(() => {
    readerRef.current.addEventListener("load", function()  {
      if (typeof this.result==="string") {
        setPreview(this.result)
      }
    })
  },[])
  
  return (
    <>
      <div className="image-input border mb-3">
        <div className="preview full no-pointer-events bc-img bc-img-fit" style={{backgroundImage:`url(${preview})`}}></div>
        <BsPersonCircle className="icon full no-pointer-events" />
        <input className="full" type="file" ref={fileInputRef} onInput={handleInput} />
      </div>
    </>
  )
}


export default ImageInput