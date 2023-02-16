const { Product, joiSchema } = require("./product")
const { Order, joiOrderSchema } = require('./order')
module.exports = { Product, Order, joiSchema, joiOrderSchema }

// const fs = require('fs/promises')
// const { nanoid } = require('nanoid')
// const path = require('path')
// const productsPath = path.join(__dirname, './products.json')
// const ordersPath = path.join(__dirname, "./orders.json")



// // products

// async function listProducts() {
//   const data = await fs.readFile(productsPath)
//   const res = JSON.parse(data)
//   return res
// }

// async function getProductById(productId) {
//   const data = await listProducts()
//   try {
//     const result = data.find(({ id }) => id === productId)
//     if (!result) {
//       return null
//     }
//     return result
//   } catch (error) {
//     console.error(error)
//   }
// }

// async function removeProduct(productId) {
//   const data = await listProducts()
//   try {
//     const idx = data.findIndex(item => item.id === productId)
//     if (idx === -1) {
//       return null
//     }
//     const result = data.filter((_, index) => index !== idx)
//     await fs.writeFile(productsPath, JSON.stringify(result, null, 2))
//     return result
//   } catch (error) {
//     console.error(error)
//   }
// }

// async function addProduct(body) {
//   const data = await listProducts()
//   try {
//     const newProduct = { id: nanoid(), ...body }
//     data.push(newProduct)
//     await fs.writeFile(productsPath, JSON.stringify(data, null, 2))
//     return newProduct
//   } catch (error) {
//     console.error(error)
//   }
// }

// const updateProduct = async (id, body) => {
//   const data = await listProducts()
//   const idx = data.findIndex(item => +item.id === +id)
//   if (idx === -1) {
//     return null
//   }
//   data[idx] = { id, ...body }
//   await fs.writeFile(productsPath, JSON.stringify(data, null, 2))
//   return data[idx]
// }

// // orders

// async function listOrders() {
//   const data = await fs.readFile(ordersPath)
//   const res = JSON.parse(data)
//   return res
// }

// async function getOrderById(orderId) {
//   const data = await listProducts()
//   try {
//     const result = data.find(({ id }) => id === orderId)
//     if (!result) {
//       return null
//     }
//     return result
//   } catch (error) {
//     console.error(error)
//   }
// }

// async function removeOrder(orderId) {
//   const data = await listOrders()
//   try {
//     const idx = data.findIndex(item => item.id === orderId)
//     if (idx === -1) {
//       return null
//     }
//     const result = data.filter((_, index) => index !== idx)
//     await fs.writeFile(ordersPath, JSON.stringify(result, null, 2))
//     return result
//   } catch (error) {
//     console.error(error)
//   }
// }

// async function addOrder(body) {
//   const data = await listOrders()
//   try {
//     const newOrder = { id: nanoid(), ...body }
//     data.push(newOrder)
//     await fs.writeFile(ordersPath, JSON.stringify(data, null, 2))
//     return newOrder
//   } catch (error) {
//     console.error(error)
//   }
// }

// const updateOrder = async (id, body) => {
//   const data = await listOrders()
//   const idx = data.findIndex(item => +item.id === +id)
//   if (idx === -1) {
//     return null
//   }
//   data[idx] = { id, ...body }
//   await fs.writeFile(productsPath, JSON.stringify(data, null, 2))
//   return data[idx]
// }



// module.exports = {
//   listProducts,
//   getProductById,
//   removeProduct,
//   addProduct,
//   updateProduct,
//   listOrders,
//   getOrderById,
//   removeOrder,
//   addOrder,
//   updateOrder
// }



