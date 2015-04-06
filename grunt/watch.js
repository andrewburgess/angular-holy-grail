'use strict';

var config = {
    watch: {
        bower: {
            files: ['bower.json'],
            tasks: ['wiredep']
        },

        express: {
            files: [
                'index.js',
                'config/**/*.js',
                'server/**/*.js'
            ],
            tasks: [
                'jshint:server',
                'express:dev',
                'wait'
            ],
            options: {
                livereload: '<%= settings.config.server.livereloadPort %>',
                nospawn: true
            }
        },

        fileblocks: {
            files: [
                'client/**/*.js',
                '!client/assets/**/*.js'
            ],
            tasks: ['fileblocks'],
            options: {
                event: ['added', 'deleted']
            }
        },

        js: {
            files: [
                'client/**/*.js'
            ],

            tasks: [
                'jshint:client'
            ]
        },

        stylus: {
            files: [
                'client/**/*.styl'
            ],

            tasks: [
                'fileblocks:styles',
                'stylus',
                'autoprefixer'
            ]
        },

        livereload: {
            files: [
                'client/**/*.jade',
                'client/**/*.js',
                'client/assets/**/*.css'
            ],

            options: {
                livereload: '<%= settings.config.server.livereloadPort %>'
            }
        }
    }
};

module.exports = config;
