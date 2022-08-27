const {User} = require('../../entities');

module.exports = dependencies => {
    const {userRepository} = dependencies;

    if(!userRepository){
        throw new Error('A user repository must exist in the dependendies');
    };

    const execute = ({firstName, lastName, gender, meta}) => {
        const user = new User({firstName, lastName, gender, meta});

        return userRepository.add(user);
    }

    return {
        execute
    }
}
