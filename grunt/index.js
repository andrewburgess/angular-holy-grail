'use strict';

var _    = require('lodash');
var fs   = require('fs');
var path = require('path');

var config = {};

fs.readdirSync(__dirname).forEach(function (file) {
    // Skip the index file, since that is what is currently running.
    if (file === 'index.js') {
        return;
    }

    // Merge in the config object from the specified file
    config = _.merge(config, require(path.join(__dirname, file)));
});

module.exports = config;
