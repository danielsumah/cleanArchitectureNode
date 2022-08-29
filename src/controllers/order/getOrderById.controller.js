const { Response } = require("../../frameworks/common");

module.exports = dependencies => {
    const {
        useCases :{
            order : {
                getOrderByIdUseCase
            }
        }
    } = dependencies;

    const getOrderByIdOrder= async (req, res, next) =>{
        try {
            const { params = {}} = req
            const { id } = params;
            const orderById = getOrderByIdUseCase(dependencies)
            const response = await orderById.execute({id});
            res.json(new Response({status: true, error: null, content: response}))
            next();
        } catch (error) {
            next(error);
        }
    }

    return getOrderByIdOrder
}