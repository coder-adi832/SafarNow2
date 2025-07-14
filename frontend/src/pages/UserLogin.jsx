import React, { useContext, useState } from 'react'
import '../CSS/UserLogin.css'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [userData, setuserData] = useState()

  const navigate = useNavigate()

  const {user, setuser} = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newUser = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser)

    if(response.status === 200){
      
      const data = response.data

      setuser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/mainPage')
    }
    // console.log(userData)
    setemail('')
    setpassword('')
  }

  return (
    <div className='login'>
      <div className="login-user">
        <form onSubmit={(e) => { submitHandler(e)}}>
          <h3>Whats Your Email</h3>
          <input type="email" required value={email} onChange={(e) => {setemail(e.target.value)}} placeholder='example@gamil.com' />
          <h3>Password</h3>
          <input type="password" required value = {password} onChange={(e) => {setpassword(e.target.value)}} placeholder='password' />
          <button>Login</button>
          <p>new here? <Link to='/userSignup'>create account</Link></p>
        </form>
      </div>
      <Link to= '/driverLogin' className='login-driver'>Login as Driver</Link>
    </div>
  )
}

export default UserLogin