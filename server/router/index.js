// # Router
//
// Handles binding all routes for the server to the respective handlers,
// including any static assets that need to be served

'use strict';

var _ = require('lodash');
var express = require('express');
var path    = require('path');

var config = require('../../config');
var logger = require('../lib/logger');

var appRouter = express.Router();
var configClone = _.clone(config);

// Prep the client side configuration object by removing properties that are
// either unnecessary or potentially revealing
delete configClone.logger;
delete configClone.server;
delete configClone.client;

appRouter.get('/auth/token/refresh', function (req, res) {
    res.render('token-refresh.jade');
});

// Handles all routes that are not already taken care of by a different
// middleware
//
// It will just render the root `index.jade` page.
appRouter.get('*', function (req, res) {
    logger.info('Path: ' + req.url);
    req.__logLevel = 'info';

    config.__json = JSON.stringify(configClone);

    res.render('index.jade', config);
});

// Bind all of the server routes, including static assets
//
// @method bindRoutes
// @param {ExpressApplication} app
var bindRoutes = function (app) {
    logger.debug('binding routes for server');

    // Serve static files from the client/assets directory
    app.use('/assets', express.static(path.join(config.client.root, 'assets'), { redirect: false }));

    // Use view rendering engine for *.jade requests
    app.use('/', require('./views'));

    // Serve static files from client directory
    app.use(express.static(config.client.root, { redirect: false }));

    // Finally, respond to any other routes with the default app
    // serving, so that Angular can figure things out on the client
    // side
    app.use('/', appRouter);

    logger.debug('completed binding routes for server');
};

// ## Exports
// Returns an object with a `bindRoutes` function
module.exports = {
    bindRoutes: bindRoutes
};
