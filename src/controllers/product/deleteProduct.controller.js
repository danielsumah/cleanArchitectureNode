const { Response } = require("../../frameworks/common");

module.exports = dependencies => {
    const {
        useCases :{
            product : {
                deleteProductUseCase
            }
        }
    } = dependencies;

    const deleteProduct= async (req, res, next) =>{
        try {
            const { body = {}} = req
            const { id, name, description,images, price, color, meta } = body;
            const deletedProduct = deleteProductUseCase(dependencies)
            const response = await deletedProduct.execute({ id, name, description,images, price, color, meta });
            res.json(new Response({status: true, error: null, content: response}))
            next();
        } catch (error) {
            next(error);
        }
    }

    return deleteProduct
}
