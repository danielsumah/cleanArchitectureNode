const addUserController = require('./addUser.controller');
const getUserByIdController = require('./getUserById.controller');
const updateUserController = require('./updateUser.controller');
const deleteUserController = require('./deleteUser.controller');

module.exports= dependencies => {
    return {
        addUserController : addUserController(dependencies),
        updateUserController : updateUserController(dependencies),
        getUserByIdController: getUserByIdController(dependencies),
        deleteUserController : deleteUserController(dependencies),
    }
}