import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DriverDataContext } from '../context/DriverContext'
import axios from 'axios'

const DriverLogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
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
        // console.log(data.token)
        navigate('/driver-mainPage')
      }

      setemail('')
      setpassword('')
    } catch (error) {
      console.error('Login failed:', error)
      // Optional: show an error message
    }
  }

  return (
    <div className='login'>
      <div className='login-user'>
        <form onSubmit={submitHandler}>
          <h3>Whats Your Email</h3>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder='example@gmail.com'
          />
          <h3>Password</h3>
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder='password'
          />
          <button>Login</button>
          <p>
            Join as driver? <Link to='/driverSignup'>Create account</Link>
          </p>
        </form>
      </div>
      <Link to='/userLogin' className='login-driver'>
        Login as User
      </Link>
    </div>
  )
}

export default DriverLogin
