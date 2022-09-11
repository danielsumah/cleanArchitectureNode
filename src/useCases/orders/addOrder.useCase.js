const { isEmpty } = require("lodash");
const { Order } = require("../../entities/Order");
const { Response,ResponseError, ValidationError} = require('../../frameworks/common')

module.exports = dependencies => {
    const {
        orderRepository,
        useCases : {
            user : {
                getUserByIdUseCase,
            },
            product :{
                getProductByIdUseCase
            }
        }
    } = dependencies;

    if(!orderRepository) throw new Error('Order repository must exist in dependencies');
    if(!getUserByIdUseCase) throw new Error('getUserByIdUseCase must be provided');
    if(!getProductByIdUseCase) throw new Error('getProductByIdUseCase must be provided');

    const getUserById = getUserByIdUseCase(dependencies).execute;
    const getProductById = getProductByIdUseCase(dependencies).execute;

    const getValidationErrors = async ({order ={}}) => {
        const returnable = []

        const {
            productIds = [],
            userId
        } = order;

        const products= await Promise.all(productIds.map(id => getProductById({id})));
        const notFoundIds = products.reduce((accumulator, product, index) => {
            if (!product) {
                accumulator.push(productIds[index]);
            }
            return accumulator
        },[]);

        if (!isEmpty(notFoundIds)) {
            returnable.push(new ValidationError({field: "productsIds", msg: `No products with ids ${notFoundIds.join(", ")}`}));
        }

        const user =await getUserById({id : userId});
        if (!user) {
            returnable.push(new ValidationError({field: 'userId', msg: `No user with id ${userId}`}));
        }
        return returnable
    }

    const execute = async({id, userId, productIds, date, isPayed, meta}) => {

        const order = new Order({id, userId, productIds, date, isPayed, meta});

        const validationErrors = await getValidationErrors({order});

        if(!isEmpty(validationErrors)){
            return Promise.reject(new ResponseError({
                status : 403,
                msg : 'User validation Error',
                reason : 'Bad data received',
                validationErrors
            }))
        }
        return orderRepository.add(order)
    }

    return {
        execute
    }
}