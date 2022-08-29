const express = require('express');
const {orderControllers} = require('../../../controllers') ;

module.exports = dependencies => {
    const router = express.Router();
    const {
        addOrderController,
        getOrderByIdController,
        updatedOrderController,
        deletedOrderController
    } = orderControllers(dependencies);

    router.route('/')
        .post(addOrderController)
        .put(updatedOrderController)
        .delete(deletedOrderController);

    router.route('/:id')
        .get(getOrderByIdController);

    return router
}
