const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const routes= require('../src/frameworks/express/routes');

const API_URL = process.env.API_URL || '/api/v1';

const dependencies= require('./config/dependencies');

const ErrorHandler = require('./frameworks/express/ErrorHandler')


module.exports = {
    start: () => {
        //Middlewares
        app.use(express.json());
        app.use(express.urlencoded({extended:true}));


        //Routes
        app.use(API_URL, routes(dependencies))


        //Common error handlers
        app.use(ErrorHandler);

        app.listen(PORT, ()=>{
            console.log("Server running on port", PORT);
        })
    }
};