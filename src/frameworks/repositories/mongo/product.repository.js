const mongoose = require("./databaseConnection");
require('dotenv').config();

const {
    schemas:{
        product : productShema
    }
} = require('../../database/mongo');


const repository = () => {
    
    const Product = mongoose.model("Product", productShema);

    return{
        add : async product => {
            const mongoObject = new Product(product)
            return mongoObject.save()
        },
    
        getById : async id => {
            return Product.findOne({
                _id : id,
                deletedAt : {
                    $exists : false
                }
            })
        },
    
        delete : async product => {
            const {id}= product;
            delete product.id;
            return Product.findByIdAndUpdate(id, {
                ...product,
                updatedAt : new Date()
            },{
                new : true
            }).lean();
        },
    
        update : async product => {
            const {id}= product;
            delete product.id;
            return Product.findByIdAndUpdate(id, {
                ...product,
                updatedAt : new Date()
            },{
                new : true
            }).lean();
        }
    }
}

module.exports  = repository();