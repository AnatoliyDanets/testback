const { Schema, model } = require('mongoose')
const Joi = require("joi")


const productSchema = Schema({
    category: String,
    model: String,
    cards: String,
    cardImg: [
        String
    ],
    brand: String,
    price: Number,
    totalPrice: Number,
    size: Number,
    height: Number,
    count: Number,
    discount: Number,
    discription: String,
    characteristics: {}


})


const joiSchema = Joi.object({
    category: Joi.string().min(3).max(30),
    model: Joi.string().min(3).max(60),
    cards: Joi.string(),
    cardImg: Joi.array(),
    brand: Joi.string().min(2).max(30),
    price: Joi.number(),
    totalPrice: Joi.number(),
    size: Joi.number(),
    height: Joi.number(),
    count: Joi.number(),
    discount: Joi.number(),
    discription: Joi.string().min(2).max(2000),
    characteristics: Joi.object(),
})


const Product = model("product", productSchema)

module.exports = { Product, joiSchema }