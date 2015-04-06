'use strict';

angular.module('app', [
    'ngAnimate',
    'ngMessages',
    'ngSanitize',
    'ngTouch',

    'restangular',
    'ui.router',

    'lib.logger',

    'config',

    'application',
    'global.head',
    'home.states'
])
.config(function configureDebugging($compileProvider) {
    $compileProvider.debugInfoEnabled(window.__DEBUG || false);
})
.config(function configureLogger(loggerProvider) {
    loggerProvider.setLoggingLevel(loggerProvider.levels.error);
    if (window.__DEBUG) {
        loggerProvider.setLoggingLevel(loggerProvider.levels.debug);
    }
})
.config(function configureRouter($locationProvider) {
    $locationProvider.html5Mode(true);
})
.run(function (logger) {
    var log = logger.get('Global');
    log.debug('Application bootstrapped');
});
