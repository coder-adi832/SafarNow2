const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const driverController = require('../controller/driverContoller')
const middleware = require('../middleware/authMiddleware')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Mail'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must contains 3 character'),
    body('carInfo.color').isLength({min: 3}).withMessage('color must contains 3 character'),
    body('carInfo.numberPlate').isLength({min: 3}).withMessage('Number Plate must contains 3 character'),
    body('carInfo.numberOfSeats').isInt({min: 1}).withMessage('At least contains 1 seat'),
    body('carInfo.transportType').isLength({min: 3}).withMessage('vehicle type  must contains 3 character'),  
],
driverController.registerDriver
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Mail'),
    body('password').isLength({min: 6}).withMessage('Password must contain 6 character'),

],
    driverController.loginDriver
)

router.get('/profile', middleware.authDriver, driverController.getDriverProfile)

router.get('/logout', middleware.authDriver, driverController.logoutDriver)

module.exports = router