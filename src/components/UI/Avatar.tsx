import React from 'react'
import { NavLink } from 'react-router-dom';

interface PropType{
  name: string;
  avatar: string;
  id:number
}

const Avatar = ({name,avatar,id}:PropType) => {
  return (
    <div className='avatar'>
      <NavLink to={`/user/${id}`} className="d-block"> 
      <div>
      asdasdsadasda
      </div>
      </NavLink>

    </div>
  )
}

export default Avatar