const express = require('express');

const route = express.Router();

const ProductController = require("../Controllers/Product.controllers");

route.get('/',ProductController.getAllProducts);

route.post('/',ProductController.createNewProduct);

route.get('/:id',ProductController.findProductById);

route.patch('/:id',ProductController.updateProduct);

route.delete('/:id',ProductController.deleteProduct);
module.exports=route;