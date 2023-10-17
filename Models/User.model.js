const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

UserSchema.pre('save',async function(next){
    try{
        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(this.password,salt);
        this.password = hashPassword;
        next();    
    }catch(err){
        next(err)
    }
})


const User = mongoose.model('user',UserSchema);

module.exports = User;