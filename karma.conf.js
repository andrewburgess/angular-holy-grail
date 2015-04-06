'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            //bower:js
            'client/bower_components/angular/angular.js',
            'client/bower_components/angular-animate/angular-animate.js',
            'client/bower_components/angular-sanitize/angular-sanitize.js',
            'client/bower_components/angular-touch/angular-touch.js',
            'client/bower_components/angular-ui-router/release/angular-ui-router.js',
            'client/bower_components/angular-messages/angular-messages.js',
            'client/bower_components/moment/moment.js',
            'client/bower_components/angular-moment/angular-moment.js',
            'client/bower_components/lodash/lodash.js',
            'client/bower_components/restangular/dist/restangular.js',
            'client/bower_components/angular-mocks/angular-mocks.js',
            'client/bower_components/sinon/index.js',
            'client/bower_components/sinon-as-promised/release/sinon-as-promised.js',
            'client/bower_components/mocha/mocha.js',
            'client/bower_components/chai/chai.js',
            //endbower

            /* fileblock:js test */
            'client/global/constants.js',
            'client/global/head/head.js',
            'client/index.js',
            'client/application/application.js',
            'client/lib/http-buffer.js',
            'client/lib/logger.js',
            'client/home/home.js',
            'client/home/states.js',
            /* endfileblock */

            'test/client/spec/**/*.js'
        ],

        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: 'test/client/reports',
                subdir: 'coverage'
            }]
        },

        preprocessors: {
            'client/!(bower_components)/**/*.js': ['coverage']
        },

        reporters: ['spec', 'coverage'],

        browsers: ['PhantomJS']
    });
};
