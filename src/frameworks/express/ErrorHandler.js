const {
    Response,
    ResponseError
} = require('../common');

module.exports = (err, req, res, next) => {
    const error = new ResponseError({
        status : err.status || 500,
        msg : err.msg || err.message || 'No message for this',
        reason : err.reason || "No reason is provided for this error",
        url : req.originalUrl,
        ip : req.ip
    });

    res.status(error.status);
    res.json(new Response({
        status : false,  
        error : error,
        // content
    }))
};