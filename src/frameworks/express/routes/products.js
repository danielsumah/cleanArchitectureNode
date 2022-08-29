const express = require('express');
const {productControllers} = require('../../../controllers') ;

module.exports = dependencies => {
    const router = express.Router();
    const {
        addProductController,
        getProductByIdController,
        updatedProductController,
        deletedProductController
    } = productControllers(dependencies);

    router.route('/')
        .post(addProductController)
        .put(updatedProductController)
        .delete(deletedProductController);

    router.route('/:id')
        .get(getProductByIdController);

    return router
}
