'use strict';

var _      = require('lodash');
var path  = require('path');

var config = require('../config');
config = _.cloneDeep(config);

// Delete the cached module so that it can be reloaded in other scripts
// without being stuck with the development config
delete require.cache[path.join(__dirname, '..', 'config', 'index.js')];

module.exports = {
    settings: {
        config: {
            client: config.client,
            server: config.server
        }
    }
};
