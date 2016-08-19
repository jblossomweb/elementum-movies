'use strict';

/**
 * @ngdoc overview
 * @name elementumMoviesApp
 * @description
 * # elementumMoviesApp
 *
 * Main module of the application.
 */
angular.module('elementumMoviesApp', [
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
