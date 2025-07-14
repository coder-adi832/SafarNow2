const driverModel = require('../models/driverModel')
const driverService = require('../services/driverService')
const { validationResult } = require('express-validator')
const deletedTokens = require('../models/deletedTokensModel')
const deletedTokensModel = require('../models/deletedTokensModel')

module.exports.registerDriver = async (request, response, next ) => {

    const err = validationResult(request);

    if(!err.isEmpty()){
        return response.status(400).json({error: err.array()})
    }

    const {fullname, email, password, carInfo} = request.body

    const driverAlreadyExists = await driverModel.findOne({email})

    if(driverAlreadyExists){
        
        return response.status(400).json({message: 'Already user exists'})
    }
    const hashedPassword = await driverModel.hashPassword(password);

    const driver = await driverService.createDriver({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: carInfo.color,
        numberPlate: carInfo.numberPlate,
        numberOfSeats: carInfo.numberOfSeats,
        transportType: carInfo.transportType
    })

    const token = driver.generateAuthToken();

    response.status(201).json({token, driver})
    // console.log(token,driver)

}


module.exports.loginDriver = async (request, response, next) => {

    const err = validationResult(request);

    if(!err.isEmpty()){
        return response.status(400).json({error: err.array()})
    }
    const {email, password} = request.body;

    const driver = await driverModel.findOne({email}).select('+password')

    if(!driver){
        return response.status(401).json({message : 'User Not found'})

    }

    const matched = await driver.comparePassword(password)

    if(!matched){
        return response.status(401).json({message: 'wrong password'});
    }

    const token = driver.generateAuthToken()

    response.cookie('token',token)

    response.status(200).json({message: 'Login successfully', token : token, driver: driver})
}

module.exports.getDriverProfile = async (request,response,next) => {
    response.status(200).json(request.driver);
}

module.exports.logoutDriver = async ( request, response, next) =>{
    
    const token = request.cookies.token || request.headers.authorization.split(' ')[1];
    
    response.clearCookie('token')
    await deletedTokens.create({ token })

    response.status(200).json({message: 'Successfully logged out'})
}