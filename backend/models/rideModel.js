const mongoose = require('mongoose')


const rideScehma = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    driverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver',
    },
    pickup:{
        type: String,
        required: true,
    },
    destination:{
        type: String,
        required: true,
    },
    fare:{
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration:{
        type: Number
    },
    distance:{
        type: Number
    },
    paymentId:{
        type: String
    },
    orderId:{
        type: String
    },
    signature:{
        type: String
    },
    otp:{
        type:String,
        selected: false,
        required: true,
    }
})
const ride = mongoose.model('ride', rideScehma)

module.exports = ride;