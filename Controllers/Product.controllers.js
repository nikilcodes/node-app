const { default: mongoose } = require("mongoose");
const createError = require("http-errors");

const Product = require("../Models/Product.model");
const {productSchema} = require('../validation.schema'); 

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const result = await Product.find({}, { __v: 0 });
      //const result = await Product.find({},{name:1,price:1,_id:0});
      res.send(result);
    } catch (err) {
        next(err);
    }
  },
  findProductById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Product.findById(id);
      if (!result) {
        throw createError(404, "Product does not exist");
      }
      res.send(result);
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.CastError)
        next(createError(400, "Invalid product Id"));

      next(err);
    }
  },
  createNewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      await productSchema.validateAsync(req.body)
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log("This is error" + error);
      console.log(error);
      if(error.isJoi === true){
        error.status = 422;
      }
      if (error.name === "ValidationError") 
        next(createError(422, error.message));
      next(error);
    }
    // const product = new Product({
    //     name:req.body.name,
    //     price:req.body.price
    // });
    // product.save().then((result)=>{
    //     res.send(result);
    // }).catch(error =>console.log(error));
  },
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      await productSchema.validateAsync(req.body);
      const updates = req.body;
      const options = { new: true };
      const result = await Product.findByIdAndUpdate(id, updates, options);
      res.send(result);
    } catch (err) {
      if(err.isJoi === true){
        err.status = 422;
      }
      if (err.name === "ValidationError") {
        next(createError(422, err.message));
      }
      next(err);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Product.findByIdAndDelete(id);
      res.send(result);
    } catch (err) {
      next(createError(400, "Invalid Product id"));
    }
  },
};
