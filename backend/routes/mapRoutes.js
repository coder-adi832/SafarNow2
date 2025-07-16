const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const mapController = require('../controller/mapController') // ✔️ corrected typo
const { query } = require('express-validator')

router.get(
  '/get-coordinates',
  query('address').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates 
)


router.get(
  '/get-distance-time',
  query('pickup').isString().isLength({ min: 3 }),
  query('destination').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceTime 
)


router.get(
  '/get-suggestion',
  query('input').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getSuggestion 
)



module.exports = router
