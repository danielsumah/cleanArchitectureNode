const {Response} = require('../../frameworks/common/index')

module.exports = dependencies => {
    const {
        useCases : {
            user :{
                updateUserUseCase
            }
        }
    } = dependencies;

    const addUser  = async (req, res, next) => {
        try {
            const { body = {}} = req;

            const {id,firstName, lastName, gender, meta} = body;

            const updateUser = updateUserUseCase(dependencies);

            const response = await updateUser.execute({user : {id,firstName, lastName, gender, meta}})
            
            res.json(new Response({status : true, content: response}));

            next();

        } catch (err) {
            next(err)
        }
    };
    return addUser;
}