const addProductController = require('./addProduct.controller');
const getProductByIdController =  require('./getProductById.controller');
const updatedProductController = require('./updateProduct.controller');
const deletedProductController = require('./deleteProduct.controller');

module.exports = dependencies => {
    return {
        addProductController : addProductController(dependencies),
        getProductByIdController : getProductByIdController(dependencies),
        updatedProductController : updatedProductController(dependencies),
        deletedProductController : deletedProductController(dependencies)
    }
}