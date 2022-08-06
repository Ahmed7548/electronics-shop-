import { useEffect, useState } from "react"
import useDepounce from "./useDebounce"

const useValiodator = (validityCheck:(value:string)=>boolean,value:string) => {
  const [valid, setValidity] = useState(true)
  const debouncedValue = useDepounce<string>(value, 500)
  
  useEffect(() => {
    if(valid) return
    setValidity(true)
  }, [value])

  useEffect(() => {
    if (!validityCheck(debouncedValue)) {
      setValidity(false)
    } else {
      setValidity(true)
    }
  },[debouncedValue])



  return valid
}

export default useValiodator