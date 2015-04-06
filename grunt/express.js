// # Express
//
// Task for starting an express server and enabling live reloading of the server
// application itself
//
// * Grunt: <https://github.com/ericclemmons/grunt-express-server>

'use strict';

var config = {
    express: {
        options: {
            port: '<%= settings.config.server.port %>'
        },

        dev: {
            options: {
                script: 'index.js'
            }
        }
    }
};

module.exports = config;
