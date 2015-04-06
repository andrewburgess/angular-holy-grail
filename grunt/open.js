'use strict';
var path = require('path');

var config = {
    open: {
        server: {
            url: 'http://<%= settings.config.server.host %>:<%= settings.config.server.port %>'
        },
        doc: {
            url: path.join(__dirname, '../', 'doc', 'index.html')
        }
    }
};

module.exports = config;
