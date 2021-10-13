const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


//const moduleRouter = require('./name');
//apiRouter.use('/name', moduleRouter);

module.exports = apiRouter;