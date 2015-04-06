'use strict';

angular.module('global.constants', [])
.constant('Validation', {
    Path: /^\/([0-9a-z\\-]*)(\/[0-9a-z\\-]+)*$/
});
