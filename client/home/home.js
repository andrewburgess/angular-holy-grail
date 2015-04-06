'use strict';

angular.module('home', [
    'lib.logger'
])
.controller(
    'HomeController',

    function HomeController($scope, logger) {
        var log = logger.get('HomeController');

        this.construct = function () {
            log.debug('initialized');

            $scope.text = 'Holla from HomeController';
        };

        this.construct();
    }
);
