// # Server
//
// Creates an `express` instance and binds up middleware and `Routers`

'use strict';

var bodyParser  = require('body-parser');
var compression = require('compression');
var express     = require('express');
var favicon     = require('serve-favicon');
var http        = require('http');
var path        = require('path');
var q           = require('q');

var config = require('../config');
var httpLog = require('./lib/middleware/http-log');
var logger = require('./lib/logger');
var router = require('./router');

var app = express();

var faviconPath = path.join(config.client.root, 'assets', 'favicon.ico');

// Once the server has been fully configured, this will start the instance
// listening on the configured `host:port`
//
// @method startServer
// @returns {Promise} Promise resolves once the server starts listening, or
//                    rejects if the server start up fails
function startServer() {
    var deferred = q.defer();
    var server = http.createServer(app);

    server.on('listening', function onListening() {
        console.log('server online');
        deferred.resolve(app);
    });

    server.on('error', function onError(err) {
        deferred.reject(err);
    });

    server.listen(config.server.port, config.server.host);

    return deferred.promise;
}

// Apply any of the settings from the configuration file to the express instance
for (var setting in config.server.settings) {
    app.set(setting, config.server.settings[setting]);
}

// Explicitly set some of the settings for the server
app.set('port', config.server.port);
app.set('views', path.join(config.client.root));
app.set('view engine', 'jade');

// Set up middleware that needs to execute before any routing
app.use(httpLog());
app.use(bodyParser.json());
app.use(compression());
app.use(favicon(faviconPath));

// If the server is configured for livereloading, then include the livereload
// middleware.
if (config.server.livereload) {
    try {
        var livereload = require('connect-livereload');
        app.use(livereload({
            port: config.server.livereloadPort || 35729
        }));
    } catch (err) {
        logger.warn('livereload module not loaded');
    }
}

// Bind all of the application routes
router.bindRoutes(app);

// ## Export
// Object exposing the `startServer` function from above
module.exports = {
    start: startServer
};
