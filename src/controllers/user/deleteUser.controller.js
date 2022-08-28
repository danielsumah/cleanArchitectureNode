const {Response} = require('../../frameworks/common/index')

module.exports = dependencies => {
    const {
        useCases : {
            user :{
                deleteUserUseCase
            }
        }
    } = dependencies;

    const addUser  = async (req, res, next) => {
        try {
            const { body = {}} = req;

            const {id, firstName, lastName, gender, meta} = body;

            const deleteUser = deleteUserUseCase(dependencies);

            const response = await deleteUser.execute({user : {id, firstName, lastName, gender, meta}})
            
            res.json(new Response({status : true, content: response}));

            next();

        } catch (err) {
            next(err)
        }
    };
    return addUser;
}