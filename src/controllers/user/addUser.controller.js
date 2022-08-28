const {Response} = require('../../frameworks/common/index')

module.exports = dependencies => {
    const {
        useCases : {
            user :{
                addUserUseCase
            }
        }
    } = dependencies;

    const addUser  = async (req, res, next) => {
        try {
            const { body = {}} = req;

            const {id, firstName, lastName, gender, meta} = body;

            const addUser = addUserUseCase(dependencies);

            const response = await addUser.execute({firstName, lastName, gender, meta})
            
            res.json(new Response({status : true, content: response}));

            next();

        } catch (err) {
            next(err)
        }
    };
    return addUser;
}