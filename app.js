const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const moduleRoute = require('./Routes/Module.route');
const cors = require('cors');
dotenv.config();
const app = express();
const corsOptions  ={
    origin:process.env.SOURCE
}
console.log(corsOptions);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

const PORT = process.env.PORT || 3500;

connection().catch(err => console.log(err));
require("./initDB")();


app.use('/',moduleRoute);

async function connection(){
    await mongoose.connect(`mongodb://127.0.0.1:27017/restapi`).then(()=>{    
            console.log('Mongodb connected');
    }).then(()=>{
        app.listen(PORT,()=>{
            console.log(`Listening on server ${PORT}`);
        });
    })
}
