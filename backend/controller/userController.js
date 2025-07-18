const userModel = require('../models/user.model')
const userService = require('../services/userService')
const { validationResult } = require('express-validator')
const deletedTokens = require('../models/deletedTokensModel')

module.exports.registerUser = async (req, res , next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array() })
    }

    const {fullname, email, password} = req.body

    const userAlreadyExists = await userModel.findOne({email})
    
    if(userAlreadyExists){            
        return res.status(400).json({message: 'Already user exists'})
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({token, user})
}


module.exports.loginUser = async (request,response,next) => {

    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({error:errors.array()});
    }

    const { email, password } = request.body;

    const user = await userModel.findOne({ email }).select('+password');

    if(!user){
        return response.status(401).json({message: 'User Not Found'})
    }

    const matched = await user.comparePassword (password);

    if(!matched){
        return response.status(401).json({message: 'Invalid password'});
    }
    const token = user.generateAuthToken();
    response.cookie('token', token)
    response.status(200).json({token, user});
}


module.exports.getUserProfile = async (request,response,next) => {
    response.status(200).json(request.user);
}


module.exports.logoutUser = async ( request, response, next) =>{
    const token = request.cookies.token || request.headers.authorization.split(' ')[1];
    response.clearCookie('token');
    try {
        await deletedTokens.create({ token });
    } catch (err) {
        if (err.code !== 11000) {
            throw err;
        }
    }
    response.status(200).json({message: 'Successfully logged out'})
}