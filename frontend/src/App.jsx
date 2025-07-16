import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import DriverLogin from './pages/DriverLogin'
import DriverSignup from './pages/DriverSignup'
import MainPage from './pages/MainPage'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import DriverHome from './pages/DriverHome'
import DriverProtectedWrapper from './pages/DriverProtectedWrapper'
import DriverLogout from './pages/DriverLogout'
import DriverRiding from './pages/DriverRiding'
const App = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/userLogin' element = {<UserLogin/>}/>
      <Route path='/userSignup' element = {<UserSignup/>}/>
      <Route path='/driverLogin' element = {<DriverLogin/>}/>
      <Route path='/driverSignup' element = {<DriverSignup/>}/>
      <Route path='/driver-riding' element = {<DriverRiding/>}/>
      <Route path='/mainPage' element = {
        <UserProtectedWrapper>
          <MainPage/>
        </UserProtectedWrapper>
      }></Route>
      
      <Route path='/user/logout' element = {
        <UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>
      }></Route>
      <Route path = '/driver-mainPage' element = {
        <DriverProtectedWrapper>
          <DriverHome/>
        </DriverProtectedWrapper>
        }/>
        <Route path='/driver/logout' element = {
          <DriverProtectedWrapper>
            <DriverLogout/>
          </DriverProtectedWrapper>  
        }></Route>
        
    </Routes>
  )
}

export default App