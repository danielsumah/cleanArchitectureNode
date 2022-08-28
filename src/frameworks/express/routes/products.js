const express = require('express');
const {productControllers} = require('../../../controllers') ;

module.exports = dependencies => {
    const router = express.Router();
    const {
        addProductController,
        getProductByIdController
    } = productControllers(dependencies);

    router.route('/')
        .post(addProductController);
    router.route('/:id')
        .get(getProductByIdController);

    return router
}
