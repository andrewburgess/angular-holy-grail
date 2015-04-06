'use strict';

var _       = require('lodash');
var cluster = require('cluster');

var base    = require('./config.base');

var env     = process.env.NODE_ENV || 'development';
var config  = {};

// Try to load up the environment specific config.
try {
    config = require('./config.' + env);
    if (env !== 'test' && !cluster.isWorker) {
        console.log('config.' + env + ' loaded');
    }
} catch (err) {
    if (env !== 'test') {
        console.warn('no configuration specified for env ' + env);
    }
}

// Merge the loaded config through the base config, overriding any
// values that have already been specified
config = _.merge({}, base, config, function(a, b) {
    return _.isArray(a) ? b : undefined;
});

module.exports = config;
