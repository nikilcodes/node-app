const express = require('express');
const createError = require('http-errors');
const route = express.Router();

const Product = require('./Products.route');
const AuthRoute = require('./Auth.route');

route.get('/',(req,res)=>{
    res.send('this is the main route');    
})

route.use('/products',Product);
route.use('/auth',AuthRoute);

// Error handling
route.use((req,res,next)=>{
    // const error = new Error();
    // error.message ="Not Found";
    // error.status = 404;
    // next(error);
    next(createError.NotFound('Page Not Found'));
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