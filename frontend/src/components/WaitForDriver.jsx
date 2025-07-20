import React from 'react'
import arrow_down from '../assets/images/arrow-down-line.png'
import pin from '../assets/images/location.png'
import money from '../assets/images/money.png'
const WaitForDriver = (props) => {
  return (
    <div>
                <h3 className='text-2xl font-semibold mb-5 text-center w-full' >Ride Found</h3>
                <div className='flex flex-col justify-between items-center gap-3'>
                    <div className='flex justify-between items-center w-full'>
                      <div>
                        <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                      </div>
                      <div>
                        <div><h2>{props.rideInfo?.driverId.fullname.firstname + " " + props.rideInfo?.driverId.fullname.lastname}</h2></div>
                        <div><h4>{props.rideInfo?.driverId.carInfo.numberPlate}</h4></div>
                        <div><p>{props.rideInfo?.driverId.carInfo.transportType + " " + props.rideInfo?.driverId.carInfo.numberOfSeats}</p></div>
                      </div>
                    </div>
                    <div className='flex w-full gap-4 items-center border-b-2 border-[#DDE2E3] p-2'>
                        <img src={pin} alt="" />
                        <div>
                            <h3>562/110-3</h3>
                            <p>{props.rideInfo?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex w-full gap-4 items-center  border-b-2 border-[#DDE2E3] p-2'>
                        <img src={pin} alt="" />
                        <div>
                            <h3>562/110-A</h3>
                            <p>{props.rideInfo?.destination}</p>
                        </div>
                    </div>
                    <div className='flex w-full gap-4 items-center border-b-2 border-[#DDE2E3] p-2'>
                        <img src={money} alt="" />
                        <div>
                            <h3>{props.rideInfo?.fare}</h3>
                            <p>Cash</p>
                        </div>
                    </div>
                    <div className='flex w-full gap-4 items-center px-2'>
                        <img src={money} alt="" />
                        <div>
                            <h3>OTP</h3>
                            <p>{props.rideInfo?.otp}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-around mt-2'>
            <button onClick={()=>{props.setwaitForDriver(false)}} className='w-[75%] h-10 bg-red-500 text-white font-semibold rounded-2xl text-xl'>Cancel Ride</button>
        </div>
    </div>
  )
}

export default WaitForDriver