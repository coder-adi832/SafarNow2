import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logo.png'
import arrowup from '../assets/images/arrowup.png'
import logout from '../assets/images/logout.png'
import { Link, Navigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import CompleteRide from '../components/CompleteRide'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'


const UserRiding = () => {
    const socket = useContext(SocketContext)
    const location = useLocation()
    const [completeRidepanel, setcompleteRidepanel] = useState(false)
    const completeRidepanelRef = useRef()

    const ride = location.state?.ride
    
    useGSAP(() => {
    if (completeRidepanel) {
      gsap.to(completeRidepanelRef.current, {
        transform:'translateY(0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(completeRidepanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [completeRidepanel])

  useEffect (() =>{
    socket.on('ride-finished', (data) => {
    console.log('Ride finished!', data);
        setcompleteRidepanel(true)
    });
  })

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
        <img className='w-16 absolute top-5 left-5' src={logo} alt="" />
      <Link to = '/user/logout'>
      <img className=' absolute top-5 right-5' src={logout} alt="" />
      </Link>
      <div className='h-[85%] w-full'>
        <LiveTracking/>
      </div>

        <div className='h-[15%] w-full absolute bottom-0 bg-amber-300'>
            <div onClick={()=>{setcompleteRidepanel(true)}} className='flex justify-around'>
                <img className='w-8' src={arrowup} alt="" />
            </div>
            <div className='flex justify-around w-full px-10 items-center mt-3' >
                <div className='w-[50%] px-5'>
                    <h3>4Km Away</h3>
                </div>
            </div>
        </div>


        <div ref={completeRidepanelRef} className='fixed w-full p-3 z-10 bottom-0 bg-white'>
            <CompleteRide ride = {ride}/>
      </div>
    </div>
  )
}

export default UserRiding