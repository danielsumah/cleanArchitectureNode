const { Order } = require("../../entities/Order");

module.exports = dependencies => {
    const {orderRepository} = dependencies;
    if(!orderRepository) {
        throw new Error('Order repository must exist in dependencies');
    }

    const execute = ({id, userId, productIds, date, isPayed, meta}) => {
        const order = new Order({id, userId, productIds, date, isPayed, meta})
        return orderRepository.add(order)
    }

    return {
        execute
    }
}