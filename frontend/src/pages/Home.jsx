import React from 'react'
import '../CSS/home.css'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
const Home = () => {
  return (
    <div className='home-box'>
      <div className="home-logo">
        <img src= {logo} alt="" />
      </div>
      <div className="home-bottom">
        <h1>Get Started</h1>
        <Link to = '/userlogin' className='home-continue'>Continue</Link>
      </div>
    </div>
  )
}

export default Home