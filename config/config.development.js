'use strict';

var bunyan = require('bunyan');

var config = {
    client: {
        debug: true
    },

    env: 'development',

    logger: {
        name: 'app',
        serializers: bunyan.stdSerializers,
        streams: [{
            name: 'console',
            stream: process.stdout,
            level: 'info'
        }]
    },

    server: {
        cluster: false,
        host: 'localhost',
        livereload: true,
        livereloadPort: 32449,
        port: 8080
    }
};

module.exports = config;
