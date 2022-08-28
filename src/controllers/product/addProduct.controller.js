const { Response } = require("../../frameworks/common");

module.exports = dependencies => {
    const {
        useCases :{
            product : {
                addProductUseCase
            }
        }
    } = dependencies;

    const addProduct= async (req, res, next) =>{
        try {
            const { body = {}} = req
            const { id, name, description,images, price, color, meta } = body;
            const addedProduct = addProductUseCase(dependencies)
            const response = await addedProduct.execute({ id, name, description,images, price, color, meta });
            res.json(new Response({status: true, error: null, content: response}))
            next();
        } catch (error) {
            next(error);
        }
    }

    return addProduct
}
