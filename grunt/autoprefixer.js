// # Autoprefixer
//
// Automatically prefixes CSS properties as needed based on http://caniuse.com
// information. This task will take the compiled Stylus output, and apply any
// needed prefixes to ensure correct cross-browser rendering of some of the
// newer features of CSS3.
//
// * Main: <https://github.com/postcss/autoprefixer>
// * Grunt: <https://github.com/nDmitry/grunt-autoprefixer>

'use strict';

var config = {
    autoprefixer: {
        options: {
            browsers: ['last 2 versions']
        },
        dist: {
            files: [{
                cwd: 'client/assets/css',
                dest: 'client/assets/css',
                expand: true,
                src: '**/*.css'
            }]
        }
    }
};

module.exports = config;
