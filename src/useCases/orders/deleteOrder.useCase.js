module.exports = dependencies => {
    const {orderRepository} = dependencies;
    if(!orderRepository) {
        throw new Error('Order repository must exist in dependencies');
    }

    const execute = (order) => {
        return orderRepository.delete(order)
    }

    return {
        execute
    }
}