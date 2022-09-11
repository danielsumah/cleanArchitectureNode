const mongoose = require('mongoose');
const schemas= require('./schemas');

module.exports= {
    connect : () => {
        const uri = `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONDOOSE_PASSWORD}@nodetests.bnntgff.mongodb.net/?retryWrites=true&w=majority`;
        const db = mongoose.connect(uri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        .then(res => console.log("Database connection successful"))
        .catch(error => console.log("Connection to mongo db failed"))

        

    },
    schemas
}