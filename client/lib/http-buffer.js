'use strict';

angular.module('lib.http-buffer', [
    'lib.logger'
])
.factory('HttpBuffer',
    // ## HttpBuffer
    // Service that allows HTTP calls to be buffered, and rerun at a later time. It
    // essentially captures the `$http` config, and wraps them in new promises that
    // can be resolved after something else occurs (such as a token refresh)
    function HttpBuffer($injector, logger) {
        var log = logger.get('HttpBuffer');
        var buffer = [];
        var $http;

        function retryRequest(config, deferred) {
            log.debug('retrying request', config);
            $http = $http || $injector.get('$http');
            $http(config)
            .then(function success(response) {
                deferred.resolve(response);
            }, function error(response) {
                deferred.reject(response);
            });
        }

        return {
            append: function (config, deferred) {
                log.debug('appending to buffer', config);
                buffer.push({
                    config: config,
                    deferred: deferred
                });
            },
            rejectAll: function (reason) {
                log.debug('rejecting all buffered requests', reason);
                if (reason) {
                    buffer.forEach(function (req) {
                        req.deferred.reject(reason);
                    });
                }
                buffer = [];
            },
            retryAll: function (updater) {
                log.debug('retrying all requests');
                updater = updater || function (config) { return config; };
                buffer.forEach(function (req) {
                    retryRequest(updater(req.config), req.deferred);
                });

                buffer = [];
            }
        };
    }
);
