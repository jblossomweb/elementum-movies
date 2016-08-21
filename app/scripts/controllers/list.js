'use strict';

/**
 * @ngdoc function
 * @name elementumMoviesApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the elementumMoviesApp
 */
angular.module('elementumMoviesApp').controller('ListCtrl', [
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
      'selectMovie', 'selectActor', 'getList'
    ]);
    
    $scope.getList($routeParams.id);
}]);
