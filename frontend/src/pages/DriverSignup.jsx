import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DriverDataContext } from '../context/DriverContext'
import axios from 'axios'

const DriverSignup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [color, setColor] = useState('')
  const [numberPlate, setNumberPlate] = useState('')
  const [numberOfSeats, setNumberOfSeats] = useState('')
  const [transportType, setTransportType] = useState('')

  const { driver, setdriver } = useContext(DriverDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const driverData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      carInfo: {
        color: color,
        numberPlate: numberPlate,
        numberOfSeats: numberOfSeats,
        transportType: transportType,
      },
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/drivers/register`,
      driverData
    )

    if (response.status === 201) {
      const data = response.data
      setdriver(data.driver)
      localStorage.setItem('token', data.token)
      navigate('/driver-mainPage')
    }

    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    setNumberOfSeats('')
    setNumberPlate('')
    setColor('')
    setTransportType('')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={submitHandler} className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2">What's Your Name</h3>
          <div className="flex gap-4 mb-4 flex-col">
            <input
              type="text"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h3 className="text-xl font-semibold mb-2">What's Your Email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <h3 className="text-xl font-semibold mb-2">Password</h3>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <h3 className="text-xl font-semibold mb-2">Vehicle Info</h3>
<div className="grid grid-cols-2 gap-4 mb-6">
  <input
    type="text"
    required
    value={color}
    onChange={(e) => setColor(e.target.value)}
    placeholder="Vehicle color"
    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    required
    value={numberPlate}
    onChange={(e) => setNumberPlate(e.target.value)}
    placeholder="Number plate"
    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <select
    required
    value={transportType}
    onChange={(e) => setTransportType(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="" disabled>Select vehicle type</option>
    <option value="car">car</option>
    <option value="auto">auto</option>
    <option value="bike">bike</option>
  </select>
  <input
    type="number"
    required
    value={numberOfSeats}
    onChange={(e) => setNumberOfSeats(e.target.value)}
    placeholder="Vehicle capacity"
    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link to="/driverLogin" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <p className="mt-6 max-w-xl text-xs text-center text-gray-500 px-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
        quisquam perspiciatis labore rerum reiciendis dolore eaque quibusdam
        quae animi? Quidem dolores tenetur nobis temporibus modi omnis fugiat,
        hic voluptas ea.
      </p>
    </div>
  )
}

export default DriverSignup
