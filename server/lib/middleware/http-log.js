// # HTTP Log Middleware

'use strict';

var logger = require('../logger');
var bunyan = require('bunyan');

// Creates a log message based on the request and response objects passed into
// the method. Uses the `bunyan` standard formatters
//
// @method createLogMessage
// @param {ClientRequest} req The HTTP request object
// @param {ServerResponse} res The HTTP response object
var createLogMessage = function (req, res) {
    var status = res.statusCode;
    var method = req.__logLevel || 'debug';

    if (status >= 400 && status <= 499) {
        method = 'warn';
    } else if (status >= 500 && status <= 599) {
        method = 'error';
    }

    logger[method]({
        req: bunyan.stdSerializers.req(req),
        res: bunyan.stdSerializers.res(res)
    });
};

// Middleware function to bind listeners to the response object for when it
// finishes so that the log message can be created.
//
// @method httpLog
// @param {ClientRequest} req The HTTP request object
// @param {ServerResponse} res The HTTP response object
// @param {Function} next Used to call the next method in the middleware chain
var httpLog = function (req, res, next) {
    req.__startTime = new Date();

    // Handles logging the request when the `ServerResponse` fires either `close`
    // or `finish`
    //
    // @method logRequest
    // @private
    function logRequest() {
        res.removeListener('close', logRequest);
        res.removeListener('finish', logRequest);

        createLogMessage(req, res);
    }

    res.on('close', logRequest);
    res.on('finish', logRequest);

    next();
};

// ## Exports
// Returns a function that in turn returns the `httpLog` function
module.exports = function () {
    return httpLog;
};
