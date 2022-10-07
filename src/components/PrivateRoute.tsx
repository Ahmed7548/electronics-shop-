import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  const auth=true
  return (
    <>
    {auth?<Outlet/>:<Navigate to="auth/login"/>}
    </>
  )
}

export default PrivateRoute