import {useEffect, useState } from "react"
import useDepounce from "./useDebounce"

const useValiodator = (validityCheck:(value:string)=>boolean,value:string):[boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [valid, setValidity] = useState(true)
  const debouncedValue = useDepounce<string>(value, 500)
  



  useEffect(() => {
      setValidity(validityCheck(debouncedValue))
  }, [debouncedValue,validityCheck])
  




  return [valid,setValidity]
}

export default useValiodator