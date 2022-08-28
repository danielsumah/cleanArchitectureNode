const { Response } = require("../../frameworks/common");

module.exports = dependencies => {
    const {
        useCases :{
            product : {
                getProductByIdUseCase
            }
        }
    } = dependencies;

    const addProduct= async (req, res, next) =>{
        try {
            const { params = {}} = req
            const { id } = params;
            const productById = getProductByIdUseCase(dependencies)
            const response = await productById.execute({ id });
            res.json(new Response({status: true, error: null, content: response}))
            next();
        } catch (error) {
            next(error);
        }
    }

    return addProduct
}
