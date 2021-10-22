const express = require('express');
const { deleteOrder } = require('../db');
const orderProductsRouter = express.Router();

const {    
    createOrder_Product,
    getOrder_ProductById,
    getOrder_ProductsByOrderId,
    updateOrder_Product,
    deleteOrder_Product } = require('../order_products')

orderProductsRouter.use((req, res, next) => {
    try {
        console.log("A request has been made to the /cart_products route!")

        next()
    } catch (error) {
        throw error
    }
})

orderProductsRouter.get('/', async (req, res, next) => {
    try {

    } catch (e) {
        throw e;
    }
})



orderProductsRouter.get('/:userId', async (req, res, next) => {

    const userId = req.params

    try {


    } catch (error) {
        throw error
    }
})

orderProductsRouter.post('/:orderProductsId', async (req, res, next) => {

    const orderProductsId = req.params
    const { orderId, productId, cartProductsId, quantityOrdered, priceWhenOrdered } = req.body;
    try {//adds product to the order

        console.log("OrderId passed into orderProductsPost: ", orderProductsId)
        console.log("Req Body from orderProductsPost: ", req.body)
        res.send(orderProduct);
    } catch (error) {
        throw error
    }
})

orderProductsRouter.delete('/:orderProductsId', async (req, res, next) => {
    const orderProductsId = req.params;

    try {
        const destroyedOrderProduct = await deleteOrder_Product(orderProductsId);
        res.send(destroyedOrderProduct);
    } catch (error) {
        throw error;
    }
})

module.exports = {
    orderProductsRouter
}