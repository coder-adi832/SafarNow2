const rideService = require('../services/rideService')
const mapService = require('../services/map.service')
const rideModel = require('../models/rideModel')
const { validationResult } = require('express-validator')
const { sendMessageToSocket } = require('../socket')

module.exports.createRide = async (request,response,next) => {
    const err = validationResult(request)

    if(!err.isEmpty()){
        return response.status(400).json({error: err.array()})
    }

    const {pickup, destination, transportType} = request.body

    try{
        const ride = await rideService.createRide({userId: request.user._id,pickup,destination,transportType})
        response.status(200).json(ride)

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup)
        // console.log(pickupCoordinates)

        const driverNearUser = await mapService.getDriverNearUser(pickupCoordinates.ltd, pickupCoordinates.lng,2000)
        // console.log(driverNearUser);
        ride.otp = ""
        // console.log(ride)
        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('userId')
        driverNearUser.map(driver => {
            sendMessageToSocket(driver.socketId,{
                event : 'new-ride',
                data : rideWithUser
            })
        })
    }catch (err){
        console.log(err)
        throw err
    }

}

module.exports.confirmRide = async (request, response, next) => {
    const err = validationResult(request)

    if(!err.isEmpty()){
        return response.status(400).json({error: err.array()})
    }

    const { rideId , driverId } = request.body
    try{
        const ride = await rideService.confirmRide({rideId, driver: driverId})
        console.log('Attempting to emit to:', ride.userId.socketId);
        sendMessageToSocket(ride.userId.socketId, {
            event: 'confirm-ride',
            data: ride
        })
        console.log(ride)
        response.status(200).json(ride)
    }catch (err){
        console.log(err)
        throw err
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


module.exports.confirmOtp = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ error: err.array() });
  }

  const { rideId, otp } = req.body;

  try {
    const ride = await rideService.confirmOtp({ rideId, otp });

    const userSocketId = ride.userId?.socketId;
    if (userSocketId) {
      sendMessageToSocket(userSocketId, {
        event: 'otp-confirmed',
        data: { ride: ride }
      });
    } else {
      console.log("User socket ID not found");
    }

    return res.status(200).json({ message: "OTP confirmed and user notified.", ride : ride });

  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports.finishRide = async (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ error: err.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.finishRide({ rideId });

    const userSocketId = ride.userId?.socketId;
    if (userSocketId) {
      sendMessageToSocket(userSocketId, {
        event: 'ride-finished',
        data: { ride: ride }
      });
    } else {
      console.log("User socket ID not found");
    }

    return res.status(200).json({
      message: "Ride finished and user notified.",
      ride: ride
    });

  } catch (err) {
    console.error(err);
    next(err);
  }
};