const express = require('express');
const route = express.Router();

route.get('/',(req,res)=>{
    res.send('These are all products');
});

route.post('/',(req,res)=>{
    res.send('Product updated');
});

route.get('/:id',(req,res)=>{
    res.send('These products by id');
});

route.patch('/:id',(req,res)=>{
    res.send('These are products by id updated');
});

route.delete('/:id',(req,res)=>{
    res.send('These are all products deleted');
});
module.exports=route;