// # Fileblocks
//
// Automatically updates specified files with includes to enable more rapid
// development of modules.
//
// **Example**: Creating a new Javascript file in the `client` directory will
// add the relevant `jade` include statement in the `index.jade` root file, so
// you don't have to remember to do that
//
// This task is configured to work for client/admin Javascript files, adding to
// the `index.jade` root template, as well as updating the Stylus root files
// `index.styl` and `admin/index.styl`
//
// * Grunt: <https://github.com/rrharvey/grunt-file-blocks>

'use strict';

var config = {
    fileblocks: {
        scripts: {
            options: {
                removeFiles: true,
                templates: {
                    js: 'script(src="${file}")'
                }
            },

            src: 'client/index.jade',

            blocks: {
                app: {
                    cwd: 'client',
                    src: [
                        '**/*.js',
                        '!admin/**/*.js',
                        '!assets/**/*.js',
                        '!bower_components/**/*.js',
                        '!vendor/**/*.js'
                    ]
                },

                vendor: {
                    cwd: 'client',
                    src: [
                        'vendor/**/*.js'
                    ]
                }
            }
        },

        styles: {
            options: {
                removeFiles: true,
                templates: {
                    styl: '@import "${file}"'
                }
            },

            src: 'client/index.styl',

            blocks: {
                app: {
                    cwd: 'client',
                    src: [
                        '**/*.styl',
                        '!global/styles/**/*.styl',
                        'global/styles/index.styl',
                        '!admin/**/*.styl',
                        '!vendor/**/*.styl',
                        '!index.styl'
                    ]
                }
            }
        },

        test: {
            options: {
                removeFiles: true,
                templates: {
                    js: '\'${file}\','
                }
            },

            src: 'karma.conf.js',

            blocks: {
                test: {
                    src: [
                        'client/**/*.js',
                        '!client/bower_components/**/*.js'
                    ]
                }
            }
        },

        vendorstyles: {
            options: {
                removeFiles: true,
                templates: {
                    styl: '@import "${file}"'
                }
            },

            src: 'client/vendor/index.styl',

            blocks: {
                vendor: {
                    cwd: 'client/vendor',
                    src: [
                        '**/*.styl',
                        '!index.styl'
                    ]
                }
            }
        }
    }
};

module.exports = config;
