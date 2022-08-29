const { Response } = require("../../frameworks/common");

module.exports = dependencies => {
    const {
        useCases :{
            order : {
                deleteOrderUseCase
            }
        }
    } = dependencies;

    const deleteOrder= async (req, res, next) =>{
        try {
            const { body = {}} = req
            const {id, userId, productIds,date, isPayed, meta } = body;
            const deletedOrder = deleteOrderUseCase(dependencies)
            const response = await deletedOrder.execute({id, userId, productIds,date, isPayed, meta });
            res.json(new Response({status: true, error: null, content: response}))
            next();
        } catch (error) {
            next(error);
        }
    }

    return deleteOrder
}
