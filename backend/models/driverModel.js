const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const driverModel = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength : [3, 'First name must be at least 3 character long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 character long'],
        }
    },
    email: {
        type: String,
        required: true,
        minlength: [5, 'Email must be 5 character long'],
    },
    password: {
        type: String,
        required: true,
        select: false,      
    },
    socketId:{
        type: String,
    },
    availability: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    carInfo: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 character long'],
            
        },
        numberPlate: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 character long'],
            
        },
        numberOfSeats: {
            type: Number,
            required: true,
            min: [1, 'Seat capacity cant be less that one'],
            
        },
        transportType: {
            type: String,
            required: true,
            enum: ['car','auto','bike'],
        }
    },

    location: {
        latitude:{
            type: Number,
        },
        longitude:{
            type: Number,
        }
    }
})

driverModel.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
}

driverModel.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

driverModel.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

module.exports = mongoose.model('driver', driverModel)


/* 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODU5NGM3NDk5ZjJmODA3OGRmYzE4ZjQiLCJpYXQiOjE3NTA2ODI3NDAsImV4cCI6MTc1MDc2OTE0MH0.1Iw6cE6VBIEAdVeQxmd4y_OlPRYBllh9v9pn0x-Ktss",
  "driver": {
    "fullname": {
      "firstname": "testFirstName",
      "lastname": "testLastName"
    },
    "email": "testDriver@test.com",
    "password": "$2b$10$nt2WMqNf5Hnov2bxQYl/Z.gs0EmarWoUxciQnrzPSrG5G.EO.mr9.",
    "availability": "inactive",
    "carInfo": {
      "color": "white",
      "numberPlate": "GJ 23FDSG",
      "numberOfSeats": 4,
      "transportType": "car"
    },
    "_id": "68594c7499f2f8078dfc18f4",
    "__v": 0
  }
}
*/