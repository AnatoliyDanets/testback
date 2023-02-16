const { Schema, model } = require('mongoose')
const Joi = require('joi')

const orderSchema = Schema({

    name: String,
    phone: String,
    order: [
        {
            model: String,
            size: String,
            count: Number,
            discount: Number,
            price: String,
            totalPrice: Number,
        }
    ],
    totalPrice: Number
})

const joiOrderSchema = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    order: Joi.array(),
    totalPrice: Joi.number()
})
const Order = model('order', orderSchema)

module.exports = { Order, joiOrderSchema }