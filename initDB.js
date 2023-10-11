const mongoose = require('mongoose');

module.exports=()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Mongoose Connected to DB");
    });

    mongoose.connection.on('error',(err)=>{
        console.log(error.message);
    });

    mongoose.connection.on('disconnected',()=>{
        console.log("Mongoose connection is disconnected");
    });

    process.on('SIGNIT',()=>{
        mongoose.connection.close(()=>{
            console.log("Mongoose connection is disconnected due to app termination...");
        });
        console.log("123");
        process.exit(0);
    });

}