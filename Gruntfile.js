// # Gruntfile
//
// Task runner for developing/building the application.
//
// The primary tasks are:
// * `grunt serve` :: used for development purposes. Automatic rerunning of
// tasks and reloading of the page after building
// * `grunt build` :: creates a production ready version of the application in
// the `dist` folder. Minifies and concatenates all of the JS and CSS files into
// `app`, `vendor`, and `admin` files.

'use strict';

function configureGrunt(grunt) {
    // Utility libraries for making grunt task loading easier
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Additional utility for separating out the grunt config into subfiles to
    // make everything much more manageable.
    var gruntConfig = require('./grunt');
    grunt.initConfig(gruntConfig);

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'jshint',
            'clean:server',
            'clean:client',
            'wiredep',
            'fileblocks',
            'stylus',
            'autoprefixer',
            'express:dev',
            'open:server',
            'watch'
        ]);
    });

    // Private task used to delay reloading the server to ensure it has properly
    // spun back up
    grunt.registerTask('wait', function () {
        grunt.log.ok('waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            done();
        }, 500);
    });

    // Main workhorse for building the application. Primary function is to
    // process all relevant source files, then concat and minify them as much
    // as possible, finally adding a hash revision and updating the files that
    // reference those sources.
    grunt.registerTask('build', [
        'jshint',
        'clean:server',
        'clean:client',
        'clean:dist',
        'stylus',
        'autoprefixer',
        'copy:styles',
        'wiredep',
        'jade',
        'useminPrepare',
        'ngtemplates',
        'concat:generated',
        'ngAnnotate',
        'copy:dist',
        'cssmin:generated',
        'uglify:generated',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('test', [
        'wiredep:test',
        'karma:unit'
    ]);
}

module.exports = configureGrunt;
