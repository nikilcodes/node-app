const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../Models/User.model');
const {authSchema} = require('../validation.schema');

const route = express.Router();

route.post('/register',async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        // if(!email || !password){
        //     throw createError.BadRequest();
        // }
        const result = await authSchema.validateAsync(req.body);
        console.log(result);
        const doesExist = await User.findOne({email:result.email});
        if(doesExist){
            throw createError.Conflict(`${result.email} is already registered`);
        }

        const user = new User(result);
        const savedUser = await user.save();
        res.send(savedUser);

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        next(error);
    }
});
route.post('/login',(req,res,next)=>{});
route.post('/refresh-token',(req,res,next)=>{});
route.delete('/logout',(req,res,next)=>{});
module.exports=route;