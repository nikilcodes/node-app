import mongoose  from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;