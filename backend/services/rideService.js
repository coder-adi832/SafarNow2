const rideModel = require('../models/rideModel')
const mapService = require('../services/map.service')
const crypto = require('crypto');


async function calculateFare(pickup, destination){
    if(!pickup || !destination) throw new Error('pickup and destination are required')

    const distanceTime = await mapService.getDistanceTime(pickup,destination)
    console.log(distanceTime)
    const baseFares = {
        auto: 30,
        bike: 20,
        car: 50
    };

    const perKmRates = {
        auto: 12,
        bike: 8,
        car: 15
    };

    const perMinRates = {
        auto: 2,
        bike: 1,
        car: 3
    };

    const fares = {};

    for (const vehicle in baseFares) {
        fares[vehicle] =
            baseFares[vehicle] +
            (perKmRates[vehicle] * (distanceTime.distance.value/1000)) +
            (perMinRates[vehicle] * (distanceTime.duration.value/60));

        fares[vehicle] = Math.round(fares[vehicle])
    }

    return fares;
} 

module.exports.getFare = calculateFare

function generateOTP(num){
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num) - 1;
    return (crypto.randomInt(min, max + 1)).toString();
}

module.exports.createRide = async ({userId, pickup, destination, transportType}) => {
    if(!userId || !pickup || !destination || !transportType){
        throw new Error('All values are required')
    }

    const fare = await calculateFare(pickup,destination)

    if (
        fare[transportType] === undefined ||
        isNaN(fare[transportType])
    ) {
        throw new Error('Invalid fare calculation')
    }

    const ride = rideModel.create({
        userId,
        pickup,
        destination,
        fare : fare[transportType],
        otp: generateOTP(6)
    })

    return ride
}
