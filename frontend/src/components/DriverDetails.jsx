import React from 'react'
import time from '../assets/images/time.png'

const DriverDetails = () => {
  return (
    <div className='w-full absolute bottom-0 bg-white p-6'>
            <div>
              <div className='w-full flex justify-between'>
              <div className='flex items-center gap-2'>
                <img className='w-16 rounded-full' src="https://i.pinimg.com/736x/14/ea/70/14ea703845497d3a1dad42dee45bfe6e.jpg" alt="" />
                <h1>Driver ABC</h1>
              </div>
              <div className='flex flex-col justify-around p-2'>
                <h2>Rs 1782</h2>
                <p>earned</p>
              </div>
              </div>
              <div className='mt-6 w-full flex justify-between items-center py-4 px-2 bg-[#D8DDDE] rounded-xl'>
                <div className='flex flex-col items-center'>
                  <img src={time} alt="" />
                  <h3>10.5</h3>
                  <p className='text-sm'>hours Online</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src={time} alt="" />
                  <h3>10.5</h3>
                  <p className='text-sm'>hours Online</p>
                </div>
                <div className='flex flex-col items-center'>
                  <img src={time} alt="" />
                  <h3>10.5</h3>
                  <p className='text-sm'>hours Online</p>
                </div>
                
              </div>
            </div>
          </div>
  )
}

export default DriverDetails