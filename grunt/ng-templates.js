'use strict';

var config = {
    ngtemplates: {
        app: {
            cwd: '.tmp/templates',
            src: '**/*.jade',
            dest: '.tmp/assets/js/templates.js',
            options: {
                usemin: 'assets/js/app.js'
            }
        }
    }
};

module.exports = config;
