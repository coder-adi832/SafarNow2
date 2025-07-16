const mapService = require('../services/map.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (request, response, next ) => {
    const err = validationResult(request)
    if(!err.isEmpty()){
        return response.status(400).json({errors: err.array()})
    }
    
    const { address } = request.query

    try {
        const coordinates = await mapService.getAddressCoordinate(address)
        response.status(200).json(coordinates)
    } catch (err) {
        response.status(404).json({message: 'Coordinates not found'})
    }
}

module.exports.getDistanceTime = async (request,response, next) => {

    try{
        const err = validationResult(request)
        if(!err.isEmpty()){
            return response.status(400).json({errors: err.array()})
        }
        const {pickup, destination} = request.query
        const distanceTime = await mapService.getDistanceTime(pickup,destination)

        response.status(200).json(distanceTime)
    }catch (err){
        console.log(err)
        response.status(500).json({message: 'Internal Server Error'})
    }
}


module.exports.getSuggestion = async (request,response, next) => {

    try{
        const err = validationResult(request)
        if(!err.isEmpty()){
            return response.status(400).json({errors: err.array()})
        }
        const { input } = request.query
        const suggestion = await mapService.getSuggestion(input)

        response.status(200).json(suggestion)
    }catch (err){
        console.log(err)
        response.status(500).json({message: 'Internal Server Error'})
    }
}