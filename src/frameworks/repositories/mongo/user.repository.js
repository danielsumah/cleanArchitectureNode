const mongoose = require("./databaseConnection");
require('dotenv').config();

const {
    schemas:{
        user : userSchema
    }
} = require('../../database/mongo');


const repository = () => {
    
    const User = mongoose.model("User", userSchema);

    return{
        add : async user => {
            const mongoObject = new User(user)
            return mongoObject.save()
        },
    
        getById : async id => {
            return User.findOne({
                _id : id,
                deletedAt : {
                    $exists : false
                }
            })
        },
    
        delete : async user => {
            const {id}= user;
            delete user.id;
            return User.findByIdAndUpdate(id, {
                ...user,
                updatedAt : new Date()
            },{
                new : true
            }).lean();
        },
    
        update : async user => {
            const {id}= user;
            delete user.id;
            return User.findByIdAndUpdate(id, {
                ...user,
                updatedAt : new Date()
            },{
                new : true
            }).lean();
        }
    }
}

module.exports  = repository();