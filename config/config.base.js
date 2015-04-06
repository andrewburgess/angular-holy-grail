'use strict';

var bunyan = require('bunyan');
var path  = require('path');

var config = {
    client: {
        debug: false,
        root: path.join(__dirname, '/../', 'client')
    },

    env: 'production',

    logger: {
        name: 'app',
        serializers: bunyan.stdSerializers,
        streams: [{
            name: 'file',
            type: 'rotating-file',
            path: '/var/log/app.log',
            period: '1d',
            level: 'info',
            count: 5
        }]
    },

    meta: {
        title: 'Your Awesome Application'
    },

    server: {
        cacheEnabled: true,

        cluster: true,

        host: 'localhost',

        port: 8080,

        livereload: false,

        settings: {
            'x-powered-by': false,
            'trust proxy': true
        }
    }
};

module.exports = config;
