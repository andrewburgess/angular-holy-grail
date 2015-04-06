'use strict';

angular.module('global.head', [
    'lib.logger'
])
.controller(
    'HeadController',

    function HeadController(logger) {
        var log = logger.get('HeadController');

        this.construct = function () {
            // Bind up needed things for the <head> section of your page
            // (i.e. manage meta information or whatever which is good if you
            // use a server side rendering solution for SEO purposes)

            log.debug('initialized');
        };

        this.construct();
    }
);
