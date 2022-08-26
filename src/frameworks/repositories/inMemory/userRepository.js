const { v4 : uuidv4 } = require('uuid');
const {
    inMemory : inMemoryDB, inMemory
} = require('../../../../src/frameworks/database/index')
module.exports = {
    add : async user => {
        if (!user.id) {
            user.id = uuidv4();
        }
        inMemoryDB.users.push(user);
        return user
    },

    getById : async id => {
        return inMemoryDB.users.find(item => item.id === id);
    },

    delete : async user => {
        const index = inMemoryDB.users.findIndex(item => item.id === user.id);
        if (index >= 0) {
            inMemoryDB.users.splice(index,1);
            return user
        }
        return null
    },

    update : async user => {
        const index = inMemoryDB.users.findIndex(item => item.id === user.id);
        if (index >= 0) {
            inMemoryDB.users[index] = user;
            return user;
        }
        return null;
    }
}