const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const categoriesRouter = require('./categories');
apiRouter.use('/name', categoriesRouter);

const categoryProductsRouter = require('./category_products');
apiRouter.use('/name', categoryProductsRouter);




apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = apiRouter;