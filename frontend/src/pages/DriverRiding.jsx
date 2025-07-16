import React, { useRef, useState } from 'react'
import logo from '../assets/images/logo.png'
import arrowup from '../assets/images/arrowup.png'
import logout from '../assets/images/logout.png'
import { Link } from 'react-router-dom'
import FinishRideDriver from '../components/FinishRideDriver'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


const DriverRiding = () => {

    const [finishPanel, setfinishPanel] = useState(false)
    const finishPanelRef = useRef(null)

    useGSAP(() => {
    if (finishPanel) {
      gsap.to(finishPanelRef.current, {
        transform:'translateY(0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(finishPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [finishPanel])


  return (
    <div className='h-screen w-screen relative overflow-hidden'>
        <img className='w-16 absolute top-5 left-5' src={logo} alt="" />
      <Link to = '/driver/logout'>
      <img className=' absolute top-5 right-5' src={logout} alt="" />
      </Link>
      <div className='h-[85%] w-full'>
        <img
        className='h-full w-full object-cover'
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt="Background animation"
      />
      </div>

        <div className='h-[15%] w-full absolute bottom-0 bg-amber-300'>
            <div className='flex justify-around'>
                <img className='w-8' src={arrowup} alt="" />
            </div>
            <div className='flex justify-around w-full px-10 items-center mt-3' >
                <div className='w-[50%] px-5'>
                    <h3>4Km Away</h3>
                </div>
                <div className='w-[50%]'>
                    <button onClick={()=>{setfinishPanel(true)}} className='w-[80%] h-10 bg-green-500 rounded-xl text-white'>Finish Ride</button>
                </div>
            </div>
        </div>


        <div ref={finishPanelRef} className='fixed w-full p-3 z-10 bottom-0 bg-white'>
            <FinishRideDriver/>
      </div>
    </div>
  )
}

export default DriverRiding