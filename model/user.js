const { Schema, model } = require('mongoose')
const Joi = require('joi')
const nameRegexp = /[a-zA-Z'-'\s]*/
const emailRegexp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    // email: {
    //     type: String,
    //     required: [true, 'Email is required'],
    // },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
})

const User = model('user', userSchema)

const joiRegisterSchema = Joi.object({
    name: Joi.string().min(2).pattern(nameRegexp).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const joiLoginSchema = Joi.object({
    name: Joi.string().min(2).pattern(nameRegexp).required(),

    password: Joi.string().min(6).required(),
})
module.exports = { User, joiRegisterSchema, joiLoginSchema }
