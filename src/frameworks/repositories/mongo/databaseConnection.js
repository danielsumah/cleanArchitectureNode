require('dotenv').config();
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONDOOSE_PASSWORD}@nodetests.bnntgff.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
});

module.exports = mongoose;
