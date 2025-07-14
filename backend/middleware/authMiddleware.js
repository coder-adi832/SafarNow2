const userModel = require('../models/user.model')
const driverModel = require('../models/driverModel')
const bcrypt = require('bcrypt');
const { request, response } = require('express');
const jwt = require('jsonwebtoken')

module.exports.authUser = async( request,response,next) =>{
    const token = request.cookies.token || request.headers.authorization?.split(' ')[1];
    if(!token) {
        return response.status(401).json({message : 'Unauthorised access'})

    }

    isDeletedToken = await userModel.findOne({token: token})

    if(isDeletedToken){
        return response.status(401).json({message: 'Unauthorized access'})
    }

    try{
        const decrypted = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decrypted._id)

        request.user = user;

        return next();
    } catch(e) {
        return response.status(401).json({message : 'unauthorized access'})
    }
}

module.exports.authDriver = async(request, response, next) => {
    const token = request.cookies.token || request.headers.authorization?.split(' ')[1];

    if(!token) {
        return response.status(401).json({message : 'Unauthorised access'})

    }

    isDeletedToken = await driverModel.findOne({token: token})

    if(isDeletedToken){
        return response.status(401).json({message: 'Unauthorized access'})
    }

    try{
        const decrypted = jwt.verify(token, process.env.JWT_SECRET)
        const driver = await driverModel.findById(decrypted._id)

        request.driver = driver;

        return next();
    } catch(e) {
        return response.status(401).json({message : 'unauthorized access'})
    }
}