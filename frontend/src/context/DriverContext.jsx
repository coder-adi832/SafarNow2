import React, { createContext, useState } from 'react'

export const DriverDataContext = createContext()

const DriverContext = ({children}) => {

    const [driver, setdriver] = useState({
        email:'',
        fullname:{
            firstname:'',
            lastname:'',
        },
        password:'',
        carInfo:{
              color: '',
              numberPlate: '',
              numberOfSeats: '',
              transportType: ''
          }

    })


  return (
    <div>
        <DriverDataContext.Provider value={{driver, setdriver}}>
            {children}
        </DriverDataContext.Provider>
    </div>
  )
}

export default DriverContext