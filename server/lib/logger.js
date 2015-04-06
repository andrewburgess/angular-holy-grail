// # Server Logger

'use strict';

var bunyan  = require('bunyan');
var cluster = require('cluster');

var config = require('../../config');

// On startup, mark configured as false
var configured = false;
var logger;

// Configure the logger based on the configuration object
//
// @method configure
function configure() {
    if (configured) {
        return;
    }

    if (!config) {
        config = {};
    }

    if (!config.logger) {
        config.logger = {};
    }

    logger = bunyan.createLogger(config.logger);

    configured = true;
}

// If the process is the master process, then we use that process to do the main
// logging legwork
if (cluster.isMaster) {
    configure();
    module.exports = logger;
} else {
    // If we're clustered, then we will send log messages via process events to
    // pass them up to the master instance which will then handle all of the
    // logging requirements.
    module.exports = {
        trace: function () {
            process.send({ type: 'log', level: 'trace', message: Array.prototype.slice.call(arguments) });
        },
        debug: function () {
            process.send({ type: 'log', level: 'debug', message: Array.prototype.slice.call(arguments) });
        },
        info: function () {
            process.send({ type: 'log', level: 'info', message: Array.prototype.slice.call(arguments) });
        },
        warn: function () {
            process.send({ type: 'log', level: 'warn', message: Array.prototype.slice.call(arguments) });
        },
        error: function () {
            process.send({ type: 'log', level: 'error', message: Array.prototype.slice.call(arguments) });
        },
        fatal: function () {
            process.send({ type: 'log', level: 'fatal', message: Array.prototype.slice.call(arguments) });
        }
    };
}
