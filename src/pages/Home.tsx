import React from 'react'
import HomeHeader from '../components/HomeHeader'
import GridContainer from '../components/GridContainer'
import "../styles/home.css"

function Home() {
  return (
    <>
      <div className='bg-white'>
      <HomeHeader imageUrl='https://images.unsplash.com/photo-1615859131861-052f0641a60e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2lkZXxlbnwwfHwwfHw%3D&w=1000&q=80'/>
        <GridContainer data={[{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""},{title:"",imgUrl:""}]} />
        </div>
    </>
  )
}

export default Home