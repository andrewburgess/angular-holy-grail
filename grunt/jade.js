'use strict';

var config = {
    jade: {
        compile: {
            files: [{
                expand: true,
                cwd: 'client',
                src: ['./!(global)/**/*.jade'],
                dest: '.tmp/templates',
                ext: '.jade'
            }]
        }
    }
};

module.exports = config;
