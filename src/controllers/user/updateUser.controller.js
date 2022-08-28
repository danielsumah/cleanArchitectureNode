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

            const {firstName, lastName, gender, meta} = body;

            const deleteUser = updateUserUseCase(dependencies);

            const response = await deleteUser.execute(user = {firstName, lastName, gender, meta})
            
            res.json(new Response({status : true, content: response}));

            next();

        } catch (err) {
            next(err)
        }
    };
    return addUser;
}