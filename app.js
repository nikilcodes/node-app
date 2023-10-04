const express = require('express');
const dotenv = require('dotenv');
const moduleRoute = require('./Routes/Module.route');


const app = express();

dotenv.config();
const PORT = process.env.PORT || 3500;

app.use('/',moduleRoute);



app.listen(PORT,()=>{
    console.log(`Listening on server ${PORT}`);
});