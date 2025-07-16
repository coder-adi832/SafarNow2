import React from 'react'
import pin from '../assets/images/location.png'

const LocationSearch = ({ suggestions = [], onSuggestionClick }) => {
  return (
    <div className='m-5'>
      {suggestions.map((e, idx) => (
        <div
          key={idx}
          onClick={() => onSuggestionClick(e)}
          className='flex gap-3 my-4 items-center border-2 overflow-hidden border-[#eee] active:border-black rounded-2xl cursor-pointer'
        >
          <h2 className='bg-[#eee] h-12 w-12 flex items-center justify-center rounded-full'>
            <img src={pin} className="w-8" alt="" />
          </h2>
          <h3>{e.description}</h3>
        </div>
      ))}
    </div>
  )
}

export default LocationSearch