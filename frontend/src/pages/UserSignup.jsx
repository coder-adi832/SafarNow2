import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/userSignUp.css'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [userData, setuserData] = useState({})
  const [firstname, setfirstname] = useState()
  const [lastname, setlastname] = useState()

  const navigate = useNavigate()
  
  const {user, setuser} = useContext(UserDataContext)
  
   const submitHandler = async (e) => {
        e.preventDefault();
        
        const newUser = {
          fullname: {
            firstname: firstname,
            lastname: lastname
          },
          email: email,
          password: password
        }
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
        
        if(response.status === 201) {

          const data = response.data

          setuser(data.user)
          
          localStorage.setItem('token',data.token)
          navigate('/mainPage')
        }

        console.log(userData)
        setemail('')
        setpassword('')
        setfirstname('')
        setlastname('')
      }
  return (
    <div className='login'>
      <div className="login-user">
        <form onSubmit={(e) => { submitHandler(e)}}>
          <h3>Whats Your Name</h3>
          <div className="fullname">
            <input type="text" required value={firstname} onChange={(e) => {setfirstname(e.target.value)}} placeholder='First Name' />
            <input type="text" required value={lastname} onChange={(e) => {setlastname(e.target.value)}} placeholder='Last Name' />
          </div>
          <h3>Whats Your Email</h3>
          <input type="email" required value={email} onChange={(e) => {setemail(e.target.value)}} placeholder='example@gamil.com' />
          <h3>Password</h3>
          <input type="password" required value = {password} onChange={(e) => {setpassword(e.target.value)}} placeholder='password' />
          <button>Create Account</button>
          <p>Already have account created? <Link to='/userlogin'>login here</Link></p>
        </form>
      </div>
      <p className='terms'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, quisquam perspiciatis labore rerum reiciendis dolore eaque quibusdam quae animi? Quidem dolores tenetur nobis temporibus modi omnis fugiat, hic voluptas ea.</p>
    </div>
  )
}

export default UserSignup