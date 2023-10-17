const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password:Joi.string().min(6).required()
});

const productSchema = Joi.object({
    name:Joi.string().lowercase().required(),
    price:Joi.number().min(0).required()

})

module.exports = {
    authSchema:authSchema,
    productSchema:productSchema
}