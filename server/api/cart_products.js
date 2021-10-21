const express = require('express')
const cartProductsRouter = express.Router()

cartProductsRouter.use((req, res, next) => {
    try {
        console.log("A request has been made to the /cart_products route!")

        next()
    } catch (error) {
        throw error
    }
})

cartProductsRouter.post('/:cartId', async (req, res, next) => {

    const cartId = req.params

    try {//adds product to the cart

        console.log("CartId passed into carProductsPost: ", cartId)
        console.log("Req Body from cartProductsPost: ", req.body)

    } catch (error) {
        throw error
    }
})

cartProductsRouter.get('/:userId', async (req, res, next) => {

    const cartId = req.params

    try {//get cart_products by user

        

    } catch (error) {
        throw error
    }
})



module.exports = {
    cartProductsRouter
}