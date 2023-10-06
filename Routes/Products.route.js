const express = require('express');
const route = express.Router();
const Product = require('../Models/Product.model');

route.get('/',async(req,res)=>{
    try{
        const result = await Product.find({},{__v:0});
        //const result = await Product.find({},{name:1,price:1,_id:0});
        res.send(result);
    }catch(err){
        console.log(err.message);
    }
});

route.post('/',async(req,res)=>{
     try{
        const product = new Product(req.body);
        const result = await product.save().then(result => res.send(result)).catch(err=>console.log(err));
     }catch(error){
        console.log(error.message);
     }   
    // const product = new Product({
    //     name:req.body.name,
    //     price:req.body.price
    // });
    // product.save().then((result)=>{
    //     res.send(result);
    // }).catch(error =>console.log(error));

});

route.get('/:id',(req,res)=>{

    res.send(req.params);
});

route.patch('/:id',(req,res)=>{
    res.send('These are products by id updated');
});

route.delete('/:id',(req,res)=>{
    res.send('These are all products deleted');
});
module.exports=route;