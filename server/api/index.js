const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const categoriesRouter = require('./categories');
apiRouter.use('/categories', categoriesRouter);

const categoryProductsRouter = require('./category_products');
apiRouter.use('/category_products', categoryProductsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);




apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = apiRouter;