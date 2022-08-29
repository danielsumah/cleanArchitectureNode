const { Response } = require("../../frameworks/common");

module.exports = dependencies => {
    const {
        useCases :{
            order : {
                updateOrderUseCase
            }
        }
    } = dependencies;

    const updateOrder= async (req, res, next) =>{
        try {
            const { body = {}} = req
            const { id, userId, productIds,date, isPayed, meta } = body;
            const updateOrder = updateOrderUseCase(dependencies)
            const response = await updateOrder.execute({ id, userId, productIds,date, isPayed, meta });
            res.json(new Response({status: true, error: null, content: response}))
            next();
        } catch (error) {
            next(error);
        }
    }

    return updateOrder
}
