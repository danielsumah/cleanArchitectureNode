const express = require('express');
const {productControllers} = require('../../../controllers') ;

module.exports = dependencies => {
    const router = express.Router();
    const {
        addProductController,
        getProductByIdController,
        updatedProductController
    } = productControllers(dependencies);

    router.route('/')
        .post(addProductController)
        .put(updatedProductController);
        
    router.route('/:id')
        .get(getProductByIdController);

    return router
}
