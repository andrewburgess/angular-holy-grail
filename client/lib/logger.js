// # Logger
//
// Better log handling on the client side, with configurable levels

'use strict';

/* global _:true */

angular.module('lib.logger', [])
.provider('logger', function () {
    var loggerProvider = this;

    // Don't perform any logging unless the level is explicitly set via the API
    var _level = 999;       // Max logging level
    var _instances = {};    // Store all instances of the logger's

    loggerProvider.levels = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    };

    loggerProvider.setLoggingLevel = function (level) {
        _level = level;
    };

    this.$get = ['$window', function ($window) {
        return {
            get: function (instance) {
                if (!_instances[instance]) {
                    _instances[instance] = new Logger(instance, $window);
                }

                return _instances[instance];
            }
        };
    }];

    // Generate a random color based on a hash of the name of the logger
    function getRandomLoggerColor(loggerName) {
        function getHashCode(str) {
            return _.reduce(_.range(0, str.length), function (total, num) {
                return str.charCodeAt(num) + ((total << 5) - total);
            }, 0);
        }

        function computeColor(value) {
            return ((value >> 24) & 0xFF).toString(16) +
                   ((value >> 16) & 0xFF).toString(16) +
                   ((value >> 8) & 0xFF).toString(16);
        }

        return '#' + computeColor(getHashCode(loggerName));
    }

    // ## Logger Constructor
    //
    // _new_ `Logger`(*string* `instance`, [*Object* `window`])
    //
    // Creates a new `Logger` object representing a specific component or module
    // defined using the `instance` parameter.
    //
    // `instance` in this case is a string representing the name of the
    // object creating the logger
    //
    // **Example**: `var log = new Logger("ApplicationController")`
    function Logger(instance, window) {
        var self = this;
        this.instance = instance;
        this.color = getRandomLoggerColor(instance);
        this.window = window;

        this.useColors = (function useColors(window) {
                   // is webkit? http://stackoverflow.com/a/16459606/376773
            return ('WebkitAppearance' in window.document.documentElement.style) ||
                   // is firebug? http://stackoverflow.com/a/398120/376773
                   (window.console && (console.firebug || (console.exception && console.table))) ||
                   // is firefox >= v31? https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
                   (window.navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
        })(this.window);

        _.each(loggerProvider.levels, function (value, key) {
            self[key] = self.bindLog(key);
        });
    }

    Logger.prototype.bindLog = function (method) {
        var self = this;
        var console = this.window.console || {};
        var logFn = console[method] || console.log || angular.noop;
        var hasApply = false;

        if (loggerProvider.levels[method] < _level) {
            return angular.noop;
        }

        try { hasApply = !!logFn.apply; } catch (e) { }

        if (!hasApply) {
            return function log(arg1, arg2) {
                logFn(arg1, arg2 === null ? '' : arg2);
            };
        }

        return function log() {
            var args = [];
            var date = self.window.moment();
            var prefix = self.useColors ? '%c' : '';
            var skip = 1;

            if (window.__DEBUG) {
                prefix += date.format('HH:mm:ss.SSS');
                prefix += ' - ' + self.instance + ' ::';
            }

            if (angular.isString(arguments[0])) {
                prefix += ' ' + (arguments[0] || '');
            } else {
                skip = 0;
            }

            args.push(prefix);
            if (self.useColors) {
                args.push('color: ' + self.color);
            }

            angular.forEach(Array.prototype.slice.call(arguments, skip), function (arg) {
                args.push(self.formatError(arg));
            });

            if (window.__DEBUG) {
                var err = new Error();
                if (err.stack) {
                    args.push(err.stack.split('\n')[2]);
                }
            }

            return logFn.apply(console, args);
        };
    };

    Logger.prototype.formatError = function (arg) {
        if (arg instanceof Error) {
            if (arg.stack) {
                arg = (arg.message && arg.stack.indexOf(arg.message) === -1) ?
                            'Error: ' + arg.message + '\n' + arg.stack :
                            arg.stack;
                arg += '\n';
            } else if (arg.sourceURL) {
                arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
        }

        return arg;
    };
});
