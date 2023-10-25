const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../Models/User.model');
const {authSchema} = require('../validation.schema');
const {signAccessToken} = require('../helpers/jwt_helpers');
const route = express.Router();

route.post('/register',async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        // if(!email || !password){
        //     throw createError.BadRequest();
        // }
        const result = await authSchema.validateAsync(req.body);
        const doesExist = await User.findOne({email:result.email});
        if(doesExist){
            throw createError.Conflict(`${result.email} is already registered`);
        }

        const user = new User(result);
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        console.log(accessToken);
        res.send(accessToken);

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);
    }
});
route.post('/login',async(req,res,next)=>{
    try{
        const result = await authSchema.validateAsync(req.body);
        const  user = await User.findOne({email:result.email})
        if(!user){
            throw createError.NotFound("User not registered");
        }
        const isMatch = await user.isValidPassword(result.password);
        if(!isMatch){
            throw createError.Unauthorized("Username/password not correct");
        }
        const accessToken = await signAccessToken(user.id);
        res.send(accessToken);

    }catch(err){
        if(err.isJoi){
            err.status = 422;
        }
        next(err);
    }
});
route.post('/refresh-token',(req,res,next)=>{});
route.delete('/logout',(req,res,next)=>{});
module.exports=route;