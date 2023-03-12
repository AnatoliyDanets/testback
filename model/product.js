const { Schema, model } = require('mongoose');
const Joi = require('joi');

const productSchema = Schema({
    category: {},
    model: {},
    cards: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    cardImg: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        },
    ],
    brand: String,
    price: Number,
    totalPrice: Number,
    size: Number,
    height: Number,
    count: Number,
    discount: Number,
    discount_time: Number,
    discription: {},
    characteristics: {},
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user',
    // }
});

const joiSchema = Joi.object({
    category: Joi.object(),
    model: Joi.object(),
    cards: Joi.object(),
    cardImg: Joi.array(),
    brand: Joi.string().min(2).max(30),
    price: Joi.number(),
    totalPrice: Joi.number(),
    size: Joi.number(),
    height: Joi.number(),
    count: Joi.number(),
    discount: Joi.number(),
    discount_time: Joi.number(),
    discription: Joi.object(),
    characteristics: Joi.object(),
});

const Product = model('product', productSchema);

module.exports = { Product, joiSchema };
