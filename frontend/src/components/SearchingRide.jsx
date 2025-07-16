import React from 'react'
import arrow_down from '../assets/images/arrow-down-line.png'
import pin from '../assets/images/location.png'
import money from '../assets/images/money.png'
const SearchingRide = (props) => {
  return (
    <div>
                <h3 className='text-2xl font-semibold mb-5 text-center w-full' >Searching your Ride</h3>
                <div className='flex flex-col justify-between items-center gap-3'>
                    <img className='h-36' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
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
                <div className='w-full flex justify-around mt-2'>
            <button onClick={()=>{props.setsearchingRide(false)}} className='w-[75%] h-10 bg-red-500 text-white font-semibold rounded-2xl text-xl'>Cancel Ride</button>
            <button onClick={()=>{props.setsearchingRide(false); props.setwaitForDriver(true)}} className='w-[75%] h-10 bg-red-500 text-white font-semibold rounded-2xl text-xl'>dummy</button>
        </div>
    </div>
  )
}

export default SearchingRide