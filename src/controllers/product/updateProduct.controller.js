const { Response } = require("../../frameworks/common");

module.exports = dependencies => {
    const {
        useCases :{
            product : {
                updateProductUseCase
            }
        }
    } = dependencies;

    const updateProduct= async (req, res, next) =>{
        try {
            const { body = {}} = req
            const { id, name, description,images, price, color, meta } = body;
            const updatedProduct = updateProductUseCase(dependencies)
            const response = await updatedProduct.execute({ id, name, description,images, price, color, meta });
            res.json(new Response({status: true, error: null, content: response}))
            next();
        } catch (error) {
            next(error);
        }
    }

    return updateProduct
}
