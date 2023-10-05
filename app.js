const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const moduleRoute = require('./Routes/Module.route');


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3500;
mongoose.connect(`mongodb://127.0.0.1:27017/restapi`).then(()=>{    

    console.log('Mongodb connected');
}).catch(err => console.log(err));

app.use('/',moduleRoute);



app.listen(PORT,()=>{
    console.log(`Listening on server ${PORT}`);
});