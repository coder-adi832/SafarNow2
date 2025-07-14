import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { DriverDataContext } from '../context/DriverContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const DriverSignup = () => {
      const navigate = useNavigate()

      const [email, setemail] = useState()
      const [password, setpassword] = useState()
      const [firstname, setfirstname] = useState()
      const [lastname, setlastname] = useState()
      const [color, setcolor] = useState()
      const [numberPlate, setnumberPlate] = useState()
      const [numberOfSeats, setnumberOfSeats] = useState()
      const [transportType, settransportType] = useState()


      const {driver, setdriver} = useContext(DriverDataContext)

      const submitHandler = async (e) => {
        e.preventDefault();
        const driverData = ({
          fullname:{
            firstname: firstname,
            lastname: lastname,
          },
          email: email,
          password: password,
          carInfo:{
              color: color,
              numberPlate: numberPlate,
              numberOfSeats: numberOfSeats,
              transportType: transportType
          }
        })
        
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/drivers/register`, driverData)
        

        if(response.status === 201){
            const data = response.data
            setdriver(data.driver)
            localStorage.setItem('token', data.token)
            navigate('/driver-mainPage')
        }
        setfirstname('')
        setlastname('')
        setemail('')
        setpassword('')
        setnumberOfSeats('')
        setnumberPlate('')
        setcolor('')
        settransportType('')
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
          <h3>Vehicle Info</h3>
          <input type="text" required value = {color} onChange={(e) => {setcolor(e.target.value)}} placeholder='vehicle color' />
          <input type="text" required value = {numberPlate} onChange={(e) => {setnumberPlate(e.target.value)}} placeholder='number plate' />
          <input type="text" required value = {transportType} onChange={(e) => {settransportType(e.target.value)}} placeholder='vehicle type' />
          <input type="number" required value = {numberOfSeats} onChange={(e) => {setnumberOfSeats(e.target.value)}} placeholder='vehicle capacity' />
          <button>Create Account</button>
          <p>Already have account created? <Link to='/driverLogin'>login here</Link></p>
        </form>
      </div>
      <p className='terms'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, quisquam perspiciatis labore rerum reiciendis dolore eaque quibusdam quae animi? Quidem dolores tenetur nobis temporibus modi omnis fugiat, hic voluptas ea.</p>
    </div>
  )
}

export default DriverSignup