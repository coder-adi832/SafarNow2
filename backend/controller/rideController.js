const rideService = require('../services/rideService')

const { validationResult } = require('express-validator')


module.exports.createRide = async (request,response,next) => {
    const err = validationResult(request)

    if(!err.isEmpty()){
        return response.status(400).json({error: err.array()})
    }

    const {pickup, destination, transportType} = request.body

    try{
        const ride = await rideService.createRide({userId: request.user._id,pickup,destination,transportType})
        response.status(200).json(ride)
    }catch (err){
        console.log(err)
        throw new err
    }

}

module.exports.getFare = async (request, response, next) => {
    const err = validationResult(request)

    if(!err.isEmpty()){
        return response.status(400).json({error: err.array()})
    }

    const {pickup, destination} = request.query // <-- use query

    try{
        const fare = await rideService.getFare(pickup,destination)
        response.status(200).json(fare)
    }catch (err){
        console.log(err)
        throw err
    }
}