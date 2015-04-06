'use strict';

var config = {
    jshint: {
        options: {
            jshintrc: '.jshintrc'
        },

        server: {
            src: [
                'index.js',
                'config/**/*.js',
                'server/**/*.js'
            ]
        },

        client: {
            src: [
                'client/**/*.js',
                '!client/assets/**/*.js',
                '!client/bower_components/**/*.js',
                '!client/vendor/**/*.js'
            ]
        }
    }
};

module.exports = config;
