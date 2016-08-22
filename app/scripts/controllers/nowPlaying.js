'use strict';

/**
 * @ngdoc function
 * @name elementumMoviesApp.controller:NowPlayingCtrl
 * @description
 * # NowPlayingCtrl
 * Controller of the elementumMoviesApp
 */
angular.module('elementumMoviesApp').controller('NowPlayingCtrl', [
  '$scope',
  'movieFactory',
  function ($scope, movieFactory) {
    $scope.movies = [];
    $scope.movie = null;
    $scope.actor = null;
    
    $scope.imgBase = movieFactory.imgBase;
    $scope.imgLargeBase = movieFactory.imgLargeBase;
    movieFactory.scopeMethods($scope, [
      'selectMovie', 'selectActor', 'getNowPlaying'
    ]);
    
    $scope.getNowPlaying();
}]);
