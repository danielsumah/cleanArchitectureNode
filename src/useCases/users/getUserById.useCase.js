module.exports = dependencies => {
    const {userRepository} = dependencies;

    if(!userRepository){
        throw new Error('A user repository must exist in the dependendies');
    };

    const execute = ({id}) => {
        return userRepository.getById(id);
    }

    return {
        execute
    }
}
