const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const rideController = require('../controller/rideController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup Address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination Address'),
    body('transportType').isString().isIn(['auto', 'car','bike']).withMessage('Invalid type of transport'),
    rideController.createRide
)


module.exports  = router;
