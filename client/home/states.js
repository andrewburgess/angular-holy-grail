'use strict';

angular.module('home.states', [
    'ui.router',

    'home'
])
.config(function ($stateProvider) {
    $stateProvider
    .state('home', {
        controller: 'HomeController',
        controllerAs: 'ctrl',
        templateUrl: 'home/home.jade',
        url: '/'
    });
});
