import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DriverDataContext } from '../context/DriverContext'
import axios from 'axios'
const DriverProtectedWrapper = ({children}) => {
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    

    
        useEffect(()=>{
            if(!token){
                navigate('/userLogin')
            }
        }, [token] )


    return (
        <>
            {children}
        </>
    )
}

export default DriverProtectedWrapper