import React, { useState } from 'react'
import pin from '../assets/images/location.png'
import money from '../assets/images/money.png'
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'

const OtpRidePopUp = (props) => {
  const [otp, setotp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-otp`, {
        rideId: props.ride._id,
        otp: otp
      })

      console.log('OTP confirmed:', res.data)

      navigate('/driver-riding')
    } catch (err) {
      console.error('Error confirming OTP:', err)
      alert('Invalid OTP or server error. Please try again.')
    }
  }

  return (
    <div className='p-4 w-full'>
      <h3 className='text-2xl font-semibold mb-5 text-center w-full'>Ride Found</h3>
      <div className='w-full flex justify-between mb-2'>
        <div className='flex items-center gap-2'>
          <img className='w-16 rounded-full' src="https://i.pinimg.com/736x/14/ea/70/14ea703845497d3a1dad42dee45bfe6e.jpg" alt="" />
          <h1>{props.ride?.userId.fullname.firstname + " " + props.ride?.userId.fullname.lastname}</h1>
        </div>
        <div className='flex flex-col justify-around p-2'>
          <h2>2.2Km</h2>
          <p>distance</p>
        </div>
      </div>
      <div className='flex flex-col justify-between items-center gap-3'>
        <div className='flex w-full gap-4 items-center border-b-2 border-[#DDE2E3] p-2'>
          <img src={pin} alt="" />
          <div>
            <h3>562/110-A</h3>
            <p>{props.ride?.pickup}</p>
          </div>
        </div>
        <div className='flex w-full gap-4 items-center border-b-2 border-[#DDE2E3] p-2'>
          <img src={pin} alt="" />
          <div>
            <h3>562/110-A</h3>
            <p>{props.ride?.destination}</p>
          </div>
        </div>
        <div className='flex w-full gap-4 items-center px-2'>
          <img src={money} alt="" />
          <div>
            <h3>{props.ride?.fare}</h3>
            <p>Cash</p>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-around my-4'>
        <form onSubmit={submitHandler} className='flex flex-col items-center gap-2'>
          <input
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            type="number"
            placeholder='Enter OTP'
            className='border p-2 rounded'
            required
          />
          <button
            type='submit'
            className='w-[75%] h-10 bg-green-500 text-white font-semibold rounded-2xl text-xl flex justify-around items-center'
          >
            Confirm
          </button>
          <button
            type='button'
            onClick={() => props.setridePopUp(false)}
            className='w-[75%] h-10 bg-red-500 text-white font-semibold rounded-2xl text-xl'
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default OtpRidePopUp
