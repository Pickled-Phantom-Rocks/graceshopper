const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const { productsRouter } = require('./products')
apiRouter.use('/products', productsRouter)

//const moduleRouter = require('./name');
//apiRouter.use('/name', moduleRouter);

apiRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err)
})


module.exports = apiRouter;