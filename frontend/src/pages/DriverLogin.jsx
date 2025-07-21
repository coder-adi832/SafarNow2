import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DriverDataContext } from '../context/DriverContext'
import axios from 'axios'

const DriverLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { driver, setdriver } = useContext(DriverDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const driverData = {
        email: email,
        password: password,
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/drivers/login`,
        driverData
      )

      if (response.status === 200) {
        const data = response.data
        setdriver(data.driver)
        localStorage.setItem('token', data.token)
        navigate('/driver-mainPage')
      }

      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Login failed:', error)
      // Optional: show an error message to user
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={submitHandler} className="flex flex-col">
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
            className="mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center">
            Join as driver?{' '}
            <Link to="/driverSignup" className="text-blue-600 hover:underline">
              Create account
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/userLogin"
        className="mt-6 text-blue-600 hover:underline text-sm"
      >
        Login as User
      </Link>
    </div>
  )
}

export default DriverLogin
