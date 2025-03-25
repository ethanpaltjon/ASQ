const common = require('./common.js');
const logger = require('../../logger.js');

function errorHandler (err, req, res, next) {
    // logger.error(`Error: ${err.name}`, {
    //     stack: err.stack,
    //     url: req.originalUrl,
    //     method: req.method
    // });
    logger.http(req.method);
    console.log(req.url);
    
    if (req.body) {
        console.log(req.body);
    }

    console.log(err.name);
    console.log(err.statusCode);
    // console.log(err.response.status);

    if (err.name === 'NotFound') {
        console.log("Not Found");
    }
    else if (err.name === "ValidationError") {
        common.invalidParams(req, res, err);
    }
    else if (err.name === "SyntaxError") {
        common.invalidJSON(req, res, err);
    }
    else if (err.name === "BSONError") {
        common.notFound(req, res, err);
    }
}

module.exports = {
    errorHandler
};