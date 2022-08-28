module.exports = dependencies => {
    const {productRepository} = dependencies;
    if(!productRepository) {
        throw new Error('Product repository must exist in dependencies');
    }

    const execute = (product = {}) => {
        return productRepository.delete(product)
    }

    return {
        execute
    }
}