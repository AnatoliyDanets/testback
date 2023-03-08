const { Product, joiSchema } = require("./product")
const { Order, joiOrderSchema } = require('./order')
const { User } = require("./user")
module.exports = { Product, Order, User, joiSchema, joiOrderSchema }



