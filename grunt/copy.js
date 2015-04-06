// # Copy
//
// Copies files from one location to another. This task is configured to move
// necessary files into the production build folder that would not otherwise be
// moved there (such as files that do not go through a compilation step).
//
// * Grunt: <https://github.com/gruntjs/grunt-contrib-copy>

'use strict';

var config = {
    copy: {
        dist: {
            files: [
            // Server files
            {
                expand: true,
                dest: 'dist',
                src: ['index.js', 'package.json', 'config/**/*', 'server/**/*']
            },
            // Static assets such as images and views
            {
                expand: true,
                dest: 'dist',
                src: [
                    'client/assets/**/*.{ico,png,txt,svg,jpg,jpeg}',
                    'client/**/*.jade',
                    '!client/bower_components/**/*'
                ]
            },
            // Font files that were excluded from the static asset step
            {
                expand: true,
                cwd: 'client/bower_components/font-awesome/fonts',
                dest: 'dist/client/assets/fonts',
                dot: 'true',
                src: '**/*'
            }]
        },

        // Copy styles into the `.tmp` directory for concatenation/minification
        styles: {
            expand: true,
            cwd: 'client/assets/css',
            dest: '.tmp/concat/assets/css',
            src: '**/*.css'
        }
    }
};

module.exports = config;
