import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/images/logo.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import arrowDown from '../assets/images/arrow-down-line.png'
import LocationSearch from '../components/LocationSearch'
import VehiclePanel from '../components/VehiclePanel'
import SelectedRide from '../components/SelectedRide'
import WaitForDriver from '../components/WaitForDriver'
import SearchingRide from '../components/SearchingRide'
import axios from 'axios'

const MainPage = () => {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [open, setopen] = useState(false)
  const openRef = useRef(null)
  const [vehiclePanel, setvehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  const [selectedVehicle, setselectedVehicle] = useState(false)
  const selectedVehicleRef = useRef(null)
  const [searchingRide, setsearchingRide] = useState(false)
  const searchingRideRef = useRef(null)
  const [waitForDriver, setwaitForDriver] = useState(false)
  const waitForDriverRef = useRef(null)
  const [searchField, setSearchField] = useState(null); 
  const [suggestions, setSuggestions] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault()
    if(pickup && destination){
      setopen(false)
      setvehiclePanel(true)
    }
  }

  useEffect(() => {
    if (open) {
      gsap.to(openRef.current, {
        height: '70%',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(openRef.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [open])
  
  
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform:'translateY(0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [vehiclePanel])
  
  
  useGSAP(() => {
    if (selectedVehicle) {
      gsap.to(selectedVehicleRef.current, {
        transform:'translateY(0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(selectedVehicleRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [selectedVehicle])


  useGSAP(() => {
    if (searchingRide) {
      gsap.to(searchingRideRef.current, {
        transform:'translateY(0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(searchingRideRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [searchingRide])


  useGSAP(() => {
    if (waitForDriver) {
      gsap.to(waitForDriverRef.current, {
        transform:'translateY(0)',
        duration: 0.5,
        ease: 'power2.out'
      })
    } else {
      gsap.to(waitForDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [waitForDriver])

  const handleInputChange = async (e, field) => {
    const value = e.target.value;
    if (field === 'pickup') setpickup(value);
    else setdestination(value);
    setSearchField(field);

    if (value.length > 2) {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion?input=${encodeURIComponent(value)}`,
      {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
      const data = res.data;
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (searchField === 'pickup') setpickup(suggestion.description);
    else setdestination(suggestion.description);
    setSuggestions([]);
    setSearchField(null);
  };

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <img className='w-16 absolute top-5 left-5' src={logo} alt="" />

      <div className='h-screen w-screen'>
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div
        className='absolute h-screen flex flex-col top-0 w-full justify-end'
      >
        <div
          className='h-[30%] bg-white p-5 relative'
          onClick={(e) => e.stopPropagation()}
        >
          <h5
            className='absolute top-6 right-6 text-xl cursor-pointer'
            onClick={() => { setopen(false) }}
          >
            <img src={arrowDown} alt="" />
          </h5>
          <h4 className='text-3xl font-semibold'>Find a Trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              onClick={() => { setopen(true); setSearchField('pickup'); }}
              type="text"
              value={pickup}
              onChange={(e) => handleInputChange(e, 'pickup')}
              placeholder='Add a pickup location'
              autoComplete="off"
              required
            />
            <input
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              onClick={() => { setopen(true); setSearchField('destination'); }}
              type="text"
              value={destination}
              onChange={(e) => handleInputChange(e, 'destination')}
              placeholder='Add destination'
              autoComplete="off"
              required
            />
            <div className='w-full flex justify-end'>
              <button className='bg-green-500 w-[30%] mt-10 h-10 rounded-xl text-white font-semibold'>GO</button>
            </div>
          </form>
          {open && suggestions.length > 0 && (
            <LocationSearch
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
        <div ref={openRef} className='bg-white h-[0]'>
          <LocationSearch setvehiclePanel = {setvehiclePanel} setopen = {setopen}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full p-3 z-10 bottom-0 bg-white'>
          <VehiclePanel setselectedVehicle = {setselectedVehicle} setvehiclePanel = {setvehiclePanel} setopen = {setopen}/>
      </div>

      <div ref={selectedVehicleRef} className='fixed w-full p-3 z-10 bottom-0 bg-white'>
          <SelectedRide setvehiclePanel = {setvehiclePanel} setselectedVehicle = {setselectedVehicle} setsearchingRide = {setsearchingRide}/>
      </div>
      
      <div ref={searchingRideRef}  className='fixed w-full p-3 z-10 bottom-0 bg-white'>
          <SearchingRide setsearchingRide = {setsearchingRide} setwaitForDriver = {setwaitForDriver}/>
      </div>


      <div ref={waitForDriverRef}  className='fixed w-full p-3 z-10 bottom-0 bg-white'>
          <WaitForDriver/>
      </div>


      

      
    </div>
  )
}

export default MainPage
