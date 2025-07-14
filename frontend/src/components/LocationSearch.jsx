import React from 'react'
import pin from '../assets/images/location.png'
const LocationSearch = () => {

    const locations = [
        "Air Force Station Vadsar",
        "Air Force Station Patiala",
        "Air Force Station Jodhpur",
    ]
  return (
    <div className='m-5'>
        {
            locations.map((e)=>{
                return <div className=' flex gap-3 my-4 items-center border-2  border-[#eee]  active:border-black  rounded-2xl'>
            <h2 className='bg-[#eee] h-12 w-12 flex items-center justify-center rounded-full'>
                <img src={pin} className="w-8" alt="" />
            </h2>
            <h3>
                {e}
            </h3>
        </div>
            })
        }
    </div>
  )
}

export default LocationSearch