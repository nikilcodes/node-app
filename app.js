const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get('/',(req,res,next)=>{
    res.send("This is the default response");
});

app.listen(PORT,()=>{
    console.log(`Listening on server ${PORT}`);
});