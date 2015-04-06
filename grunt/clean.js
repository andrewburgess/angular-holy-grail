// # Clean
//
// Task to clear out files and directories. Used currently to remove the `dist`
// directory before making a new production build, as well as clearing out the
// temporary/compiled output of Stylus and Uglify. Also clears the doc directory
// to ensure recreation of documentation files.
//
// * Grunt: <https://github.com/gruntjs/grunt-contrib-clean>

'use strict';

var config = {
    clean: {
        server: [
            '.tmp',
            'doc'
        ],
        client: [
            'client/assets/css',
            'client/assets/js'
        ],
        dist: 'dist'
    }
};

module.exports = config;
