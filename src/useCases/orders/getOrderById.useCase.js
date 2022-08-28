module.exports = dependencies => {
    const {orderRepository} = dependencies;
    if(!orderRepository) {
        throw new Error('Order repository must exist in dependencies');
    }

    const execute = ({id}) => {
        return orderRepository.getById(id)
    }

    return {
        execute
    }
}