const express = require('express')
const productsRouter = express.Router()
const { createProducts, getAllProducts } = require('../db')
const { getProductById } = require('../db/products')

productsRouter.use((req, res, next) => {
    try {
        console.log("A request has been made to the /products route!")

        next()
    } catch (error) {
        throw error
    }
})

productsRouter.get('/', (req, res, next) => {
    try {//get all the products

        const products = await getAllProducts()

        res.send(products)

    } catch (error) {
        throw error
    }
})

productsRouter.get('/:productId', (req, res, next) => {
    try {//get product by Id

        const productId = req.params

        const product = await getProductById(productId)

        res.send(product)

    } catch (error) {
        throw error
    }
})

productsRouter.post('/', (req, res, next) => {
    try {//Create a product 

        const isAdmin = true

        if (isAdmin) {
            const product = req.body

            const createdProduct = await createProducts(product)
    
            res.send(createdProduct)
        } else if (!isAdmin) {
            res.status(401)

            next({ name: "Unauthorized!", message: "You must be an admin for this action!"})
        }

    } catch (error) {
        throw error
    }
})

productsRouter.patch('/:productId', (req, res, next) => {
    try {//edit product info

    } catch (error) {
        throw error
    }
})

productsRouter.delete('/:productId', (req, res, next) => {
    try {//Delete the product matching the productId

    } catch (error) {
        throw error
    }
})


module.exports = {
    productsRouter
}