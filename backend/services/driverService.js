const userModel = require('../models/driverModel')


module.exports.createDriver = async ({
    firstname, lastname, email, password, color, numberPlate, numberOfSeats, transportType
}) =>{
    if(!firstname || !email || !password || !color || !numberOfSeats || !numberPlate || !transportType){
        throw new Error('All fields are required')
    }
    const driver = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        carInfo: {
            color,
            numberPlate,
            numberOfSeats,
            transportType
        }
    })

    return driver;
}