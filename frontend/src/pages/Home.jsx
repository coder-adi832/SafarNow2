import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import background from '../assets/images/backgound.jpg'

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f0f0]">
      {/* Phone-sized container */}
      <div className="relative w-full max-w-[375px] h-[667px] bg-white rounded-xl shadow-lg overflow-hidden sm:h-[667px]">

        {/* Background */}
        <img
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src={background}
          alt="Background"
        />

        {/* Logo */}
        <div className="absolute top-4 left-4 z-10">
          <img src={logo} alt="Logo" className="w-24 h-auto" />
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 w-full z-10 bg-white p-4 shadow-md">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold mb-4">Get Started</h1>
            <Link
              to="/userlogin"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Continue
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
