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
    'ui.bootstrap',
    'sticky'
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
      .when('/now-playing', {
        templateUrl: 'views/collection.html',
        controller: 'NowPlayingCtrl',
        controllerAs: 'now-playing'
      })
      .otherwise({
        redirectTo: '/collection/528'
      });
  });
