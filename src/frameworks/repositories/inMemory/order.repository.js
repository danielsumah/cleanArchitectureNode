const { v4 : uuidv4 } = require('uuid');
const {
    inMemory : inMemoryDB, inMemory
} = require('../../database/index')
module.exports = {
    add : async order => {
        if (!order.id) {
            order.id = uuidv4();
        }
        inMemoryDB.orders.push(order);
        return order
    },

    getById : async id => {
        return inMemoryDB.orders.find(item => item.id === id);
    },

    delete : async order => {
        const index = inMemoryDB.orders.findIndex(item => item.id === order.id);
        if (index >= 0) {
            inMemoryDB.orders.splice(index,1);
            return order
        }
        return null
    },

    update : async order => {
        const index = inMemoryDB.orders.findIndex(item => item.id === order.id);
        if (index >= 0) {
            inMemoryDB.orders[index] = order;
            return order;
        }
        return null;
    }
}