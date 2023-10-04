const express = require('express');
const route = express.Router();

const Product = require('./Products.route');


route.get('/',(req,res)=>{
    res.send('this is the main route');    
})

route.use('/products',Product);

route.use((req,res,next)=>{
    const error = new Error();
    error.message ="Not Found";
    error.status = 404;
    next(error);
})

route.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.send({
        error:{
            status:error.status || 500,
            message: error.message
        }
    })
})

module.exports =route;