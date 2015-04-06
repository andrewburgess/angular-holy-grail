'use strict';

angular.module('application', [
    'lib.logger'
])
.controller(
    'ApplicationController',

    function ApplicationController($rootScope, logger) {
        var log = logger.get('ApplicationController');

        this.construct = function () {
            // Do any high level set up here

            $rootScope.$on('$stateChangeStart', function (ev, toState, toParams, fromState, fromParams) {
                log.debug('State Change Start', toState, toParams, fromState, fromParams);
            });

            $rootScope.$on('$stateChangeError', function (ev, toState, toParams, fromState, fromParams, err) {
                log.error('State Change Error', err, toState, toParams, fromState, fromParams);
            });

            $rootScope.$on('$stateChangeSuccess', function (ev, toState, toParams, fromState, fromParams) {
                log.debug('State Change Success', toState, toParams, fromState, fromParams);
            });


            log.debug('initialized');
        };

        this.construct();
    }
);
