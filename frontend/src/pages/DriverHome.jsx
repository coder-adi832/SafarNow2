import React, { useRef, useState } from 'react'
import logo from '../assets/images/logo.png'
import logout from '../assets/images/logout.png'
import { Link } from 'react-router-dom'
import DriverDetails from '../components/DriverDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import OtpRidePopUp from '../components/OtpRidePopUp'


const DriverHome = () => {

  const [ridePopUp, setridePopUp] = useState(true)
  const ridePopUpRef = useRef(null)

  const [otp, setotp] = useState(false)
  const otpRef = useRef(null)

  useGSAP(() => {
    if (ridePopUp) {
      gsap.to(ridePopUpRef.current, {
        transform:'translateY(0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(ridePopUpRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [ridePopUp])

  useGSAP(() => {
    if (otp) {
      gsap.to(otpRef.current, {
        transform:'translateY(0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(otpRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [otp])


  return (
    <div className='relative h-screen w-screen'>
      <img className='w-16 absolute top-5 left-5' src={logo} alt="" />
      <Link to = '/driver/logout'>
      <img className=' absolute top-5 right-5' src={logout} alt="" />
      </Link>
      <img
        className='h-full w-full object-cover'
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt="Background animation"
      />

      <div>
        <DriverDetails/>
      </div>
      
      <div ref={ridePopUpRef} className='fixed w-full p-3 z-10 bottom-0 bg-white'>
          <RidePopUp setridePopUp = {setridePopUp} setotp = {setotp}/>
      </div>
      <div ref={otpRef} className='fixed w-full p-3 z-10 bottom-0 bg-white'>
          <OtpRidePopUp/>
      </div>
    </div>
  )
}

export default DriverHome
