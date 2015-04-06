'use strict';

var bunyan = require('bunyan');

var config = {
    client: {
        debug: true
    },

    env: 'test',

    logger: {
        name: 'app',
        serializers: bunyan.stdSerializers,
        streams: [{
            name: 'console',
            stream: process.stdout,
            level: 'warn'
        }]
    },

    server: {
        cluster: false,
        host: 'localhost',
        livereload: false,
        port: 8080
    }
};

module.exports = config;
