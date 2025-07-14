const express = require('express')
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controller/userController')
const middleware = require('../middleware/authMiddleware')



router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be 3 character long'),
    body('password').isLength({min:6}).withMessage('Password must be 6 character long')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid mail'),
    body('password').isLength({min:6}).withMessage('Password must be 6 character long'),
],
    userController.loginUser
)

router.get('/profile', middleware.authUser, userController.getUserProfile)

router.get('/logout', middleware.authUser, userController.logoutUser)


module.exports = router;