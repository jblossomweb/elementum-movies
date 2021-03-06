'use strict';

/**
 * @ngdoc function
 * @name elementumMoviesApp.controller:CollectionCtrl
 * @description
 * # CollectionCtrl
 * Controller of the elementumMoviesApp
 */
angular.module('elementumMoviesApp').controller('CollectionCtrl', [
  '$scope',
  '$routeParams',
  'movieFactory',
  function ($scope, $routeParams, movieFactory) {
    $scope.movies = [];
    $scope.movie = null;
    $scope.actor = null;
    
    $scope.imgBase = movieFactory.imgBase;
    $scope.imgLargeBase = movieFactory.imgLargeBase;
    movieFactory.scopeMethods($scope, [
      'selectMovie', 'selectActor', 'getCollection'
    ]);
    
    $scope.getCollection($routeParams.id);
}]);
