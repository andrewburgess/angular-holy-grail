'use strict';

var config = {
    ngAnnotate: {
        dist: {
            files: [{
                expand: true,
                cwd: '.tmp/concat/assets/js',
                src: '*.js',
                dest: '.tmp/concat/assets/js'
            }]
        }
    }
};

module.exports = config;
