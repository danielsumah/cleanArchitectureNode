const { Product } = require("../../entities/Product");

module.exports = dependencies => {
    const {productRepository} = dependencies;
    if(!productRepository) {
        throw new Error('Product repository must exist in dependencies');
    }

    const execute = ({id, name, description, images, price, color, meta}) => {
        const product = new Product({id, name, description, images, price, color, meta})
        return productRepository.add(product)
    }

    return {
        execute
    }
}