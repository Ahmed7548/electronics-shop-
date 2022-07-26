import {useEffect, useState } from "react"
import useDepounce from "./useDebounce"

const useValiodator = (validityCheck:(value:string)=>boolean,value:string,delay:number=300):[boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [valid, setValidity] = useState(true)
  const debouncedValue = useDepounce<string>(value, delay)
  


// validityCheck must be passed after memoization with use callback
  useEffect(() => {
      setValidity(validityCheck(debouncedValue))
  }, [debouncedValue,validityCheck])
  




  return [valid,setValidity]
}

export default useValiodator