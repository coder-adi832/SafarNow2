const express = require('express')
const router = express.Router()
const { body, query } = require('express-validator')
const rideController = require('../controller/rideController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup Address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination Address'),
    body('transportType').isString().isIn(['auto', 'car','bike']).withMessage('Invalid type of transport'),
    rideController.createRide
)

router.get('/getFare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup Address'),
    query('destination').isString().isLength({min: 3}).withMessage('Invalid destination Address'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authDriver,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.confirmRide
)

router.post('/confirm-otp', rideController.confirmOtp);


module.exports  = router;
