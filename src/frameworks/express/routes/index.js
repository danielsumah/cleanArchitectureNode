const express = require('express');
const usersRouter = require('./users');
const productRouter = require('./products');
const orderRouter = require('./orders');

module.exports = dependencies => {

    const routes = express.Router();
    routes.use('/users', usersRouter(dependencies));
    routes.use('/products', productRouter(dependencies));
    routes.use('/orders', orderRouter(dependencies));

    return routes;
}