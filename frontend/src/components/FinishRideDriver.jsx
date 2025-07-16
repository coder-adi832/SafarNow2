import React from 'react'
import pin from '../assets/images/location.png'
import money from '../assets/images/money.png'
import { Link } from 'react-router-dom'

const FinishRideDriver = () => {
  return (
        <div className='p-4 w-full'>
                    <h3 className='text-2xl font-semibold mb-5 text-center w-full' >Finish Ride</h3>
                    <div className='w-full flex justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <img className='w-16 rounded-full' src="https://i.pinimg.com/736x/14/ea/70/14ea703845497d3a1dad42dee45bfe6e.jpg" alt="" />
                        <h1>Rider ABC</h1>
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
                                <p>Kankariya Jheel, Ahmedabad</p>
                            </div>
                        </div>
                        <div className='flex w-full gap-4 items-center  border-b-2 border-[#DDE2E3] p-2'>
                            <img src={pin} alt="" />
                            <div>
                                <h3>562/110-A</h3>
                                <p>Kankariya Jheel, Ahmedabad</p>
                            </div>
                        </div>
                        <div className='flex w-full gap-4 items-center px-2'>
                            <img src={money} alt="" />
                            <div>
                                <h3>Rs 500</h3>
                                <p>Cash</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-around my-4'>
                        <Link to={'/driver-mainPage'} className='w-[75%] h-10 bg-green-500 text-white font-semibold rounded-2xl text-xl flex justify-around items-center'>Finish</Link>
                    </div>
                </div>
  )
}

export default FinishRideDriver