const express = require('express');
const createError = require('http-errors');
const route = express.Router();
const Product = require('../Models/Product.model');
const { default: mongoose } = require('mongoose');

route.get('/',async(req,res)=>{
    try{
        const result = await Product.find({},{__v:0});
        //const result = await Product.find({},{name:1,price:1,_id:0});
        res.send(result);
    }catch(err){
        res.send(err);
    }
});

route.post('/',async(req,res,next)=>{
     try{
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
     }catch(error){
        console.log("This is error"+error);
        console.log(error);
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return
        }
        next(error);
     }   
    // const product = new Product({
    //     name:req.body.name,
    //     price:req.body.price
    // });
    // product.save().then((result)=>{
    //     res.send(result);
    // }).catch(error =>console.log(error));

});

route.get('/:id',async(req,res,next)=>{
    try{
    const id = req.params.id;
    const result = await Product.findById(id);
    if(!result){
        throw createError(404,"Product does not exist");
    }
    res.send(result);
    }catch(err){
        console.log(err);
        if(err instanceof mongoose.CastError){
            next(createError(400,"Invalid product Id"));
            return
        }
        next(err);
    }
});

route.patch('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = {new:true};
        const result = await Product.findByIdAndUpdate(id,updates,options);
        res.send(result);
    }catch(err){
        if(error.name === 'ValidationError'){
            next(createError(422,error.message));
            return
        }
        next(error);
    }
});

route.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);
        res.send(result);
    }catch(err){
        next(createError(400, 'Invalid Product id'));
        return;
    } 
    next(error);
});
module.exports=route;