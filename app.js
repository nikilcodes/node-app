const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const moduleRoute = require('./Routes/Module.route');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();
const PORT = process.env.PORT || 3500;
connection().catch(err => console.log(err));

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