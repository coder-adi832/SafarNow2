import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { user, setuser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const newUser = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser)

    if (response.status === 200) {
      const data = response.data
      setuser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/mainPage')
    }

    setEmail('')
    setPassword('')
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
            placeholder="password"
            className="mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center">
            New here?{' '}
            <Link to="/userSignup" className="text-blue-600 hover:underline">
              Create account
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/driverLogin"
        className="mt-6 text-blue-600 hover:underline text-sm"
      >
        Login as Driver
      </Link>
    </div>
  )
}

export default UserLogin
