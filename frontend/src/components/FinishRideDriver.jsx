import React from 'react'
import pin from '../assets/images/location.png'
import money from '../assets/images/money.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import arrowdown from '../assets/images/arrow-down-line.png'

const FinishRideDriver = (props) => {
    const navigate = useNavigate()
    const submitHandler = async (e) =>{
        e.preventDefault()

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/finish-ride`,{
          rideId: props.ride._id, 
      }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

        navigate('/driver-mainPage')

    }

  return (
        <div className='p-4 w-full'>
                        <div onClick={()=>{props.setfinishPanel(false)}} className='flex justify-around'>
                            <img className='w-8' src={arrowdown} alt="" />
                        </div>
                    <h3 className='text-2xl font-semibold mb-5 text-center w-full' >Finish Ride</h3>
                    <div className='w-full flex justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <img className='w-16 rounded-full' src="https://i.pinimg.com/736x/14/ea/70/14ea703845497d3a1dad42dee45bfe6e.jpg" alt="" />
                        <h1>{props.ride?.driverId.fullname.firstname + " " + props.ride?.driverId.fullname.lastname}</h1>
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
                                <h3>Pickup</h3>
                                <p>{props.ride?.pickup}</p>
                            </div>
                        </div>
                        <div className='flex w-full gap-4 items-center  border-b-2 border-[#DDE2E3] p-2'>
                            <img src={pin} alt="" />
                            <div>
                                <h3>Destination</h3>
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
                        <button onClick={(e) => {submitHandler(e)}} className='w-[75%] h-10 bg-green-500 text-white font-semibold rounded-2xl text-xl flex justify-around items-center'>Finish</button>
                    </div>
                </div>
  )
}

export default FinishRideDriver