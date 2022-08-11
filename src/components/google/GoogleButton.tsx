import React, { useCallback, useEffect, useRef } from 'react'
import { authApi } from '../../API/api'
import useGoogleScript from '../../hooks/useGoogleScript'

interface PropType extends GsiButtonConfiguration{
  client_id:string
}

const GoogleButton = (props:PropType) => {
  
  const {client_id}=props

  const buttonOptions={...props,client_id:null}


  const isGoogleScriptLoaded = useGoogleScript()
  const divRef = useRef<HTMLDivElement>(null)
  
  const signin = useCallback(async (credentials: string | undefined) => {
    if (typeof credentials === "undefined") throw new Error("failed to sign in with google")
    console.log(credentials)
    const { data, status } = await authApi.post("/google", { credentials: credentials })
    console.log(data)
  },[])

  useEffect(() => {
    if (typeof window === undefined || !window.google || !divRef.current) return 
    
    try {
      window.google.accounts.id.initialize({
        client_id: client_id,
        callback: async (res) => {
          await signin(res.credential)
        },
      })
      window.google.accounts.id.renderButton(divRef.current,buttonOptions)
    } catch (err) {
      console.log(err)
    }
  },[isGoogleScriptLoaded,divRef.current])


  return (
    <div ref={divRef}/>
  )
}

export default GoogleButton