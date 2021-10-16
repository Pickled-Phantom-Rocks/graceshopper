const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const ordersRouter = express.Router();


module.exports = ordersRouter;