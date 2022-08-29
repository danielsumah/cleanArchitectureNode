const addOrderController = require('./addOrder.controller');
const getOrderByIdController =  require('./getOrderById.controller');
const updatedOrderController = require('./updateOrder.controller');
const deletedOrderController = require('./deleteOrder.controller');

module.exports = dependencies => {
    return {
        addOrderController : addOrderController(dependencies),
        getOrderByIdController : getOrderByIdController(dependencies),
        updatedOrderController : updatedOrderController(dependencies),
        deletedOrderController : deletedOrderController(dependencies)
    }
}