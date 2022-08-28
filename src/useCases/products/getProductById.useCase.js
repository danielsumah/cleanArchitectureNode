module.exports = dependencies => {
    const {productRepository} = dependencies;
    if (!productRepository){
        throw new Error ('Product Repository must exist in dependencies');
    }

    const execute =({id}) => {
        return productRepository.getById(id)
    }

    return {
        execute
    }
}