const express = require('express');
const ordersRouter = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;
const {

} = require('../db');

ordersRouter.use((req, res, next) => {
    console.log("A request is being made to /orders");
    next();
});

ordersRouter.get('/:username/pastorders', (req, res, next) => {
 try {
    
 } catch (error) {
     console.log(error);
     next(error);
 }
});

module.exports = ordersRouter;