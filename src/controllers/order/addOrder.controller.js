const { Response } = require("../../frameworks/common");

module.exports = dependencies => {
    const {
        useCases :{
            order : {
                addOrderUseCase
            }
        }
    } = dependencies;

    
    const addOrder= async (req, res, next) =>{
        try {
            const { body = {}} = req
            const {id, userId, productIds,date, isPayed, meta } = body;
            const addedOrder = addOrderUseCase(dependencies)
            const response = await addedOrder.execute({id, userId, productIds,date, isPayed, meta });
            res.json(new Response({status: true, error: null, content: response}))
            next();
        } catch (error) {
            next(error);
        }
    }

    return addOrder
}
