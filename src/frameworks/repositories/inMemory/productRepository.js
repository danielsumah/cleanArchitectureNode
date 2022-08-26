const {
    inMemory : inMemoryDB
} = require('../../database/index');

const {v4 : uuidv4} = require('uuid');

module.exports = {

    add : async product => {
        if(!product.id){
            product.id = uuidv4();
        }
        inMemoryDB.products.push(product);
        return product;
    },

    update : async product => {
        const index = inMemoryDB.products.findIndex(item =>item.id == product.id);
        if (index >= 0) {
            inMemoryDB.products[index] = product;
            return inMemoryDB.products[index];
        }
        return null;
    },

    delete : async product => {
        const index = inMemoryDB.products.findIndex(item =>item.id == product.id);
        if (index >= 0) {
            inMemoryDB.products.splice(index, 1);
            return product;
        }
        return null;
    },
    
    getById : async id => {
        return inMemoryDB.products.find(item => item.id === id)
    },
}