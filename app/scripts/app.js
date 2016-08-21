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
      .when('/collection/:id', {
        templateUrl: 'views/collection.html',
        controller: 'CollectionCtrl',
        controllerAs: 'collection'
      })
      .when('/list/:id', {
        templateUrl: 'views/collection.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/collection/528'
      });
  });
