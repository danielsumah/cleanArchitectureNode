const express = require('express');
const usersRouter = require('./users');
const productRouter = require('./products')

module.exports = dependencies => {

    const routes = express.Router();
    routes.use('/users', usersRouter(dependencies))
    routes.use('/products', productRouter(dependencies))

    return routes;
}