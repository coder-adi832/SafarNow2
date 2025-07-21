import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import background from '../assets/images/backgound.jpg'

const Home = () => {
  return (
    <div className='relative h-screen w-screen'>
      <div className="absolute h-[100%] w-[100%] top-0">
        <img className="w-full h-full object-cover object-center" src={background} alt="Logo" />
      </div>
      <div className="absolute top-0 left-0 h-5 z-10">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
      </div>
    <div className="flex flex-col items-center justify-between h-[20%] bg-white p-4 absolute w-full z-10 bottom-0">
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl font-bold mb-4">Get Started</h1>
        <Link 
          to="/userlogin" 
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Continue
        </Link>
      </div>
    </div>
    </div>
  )
}

export default Home
