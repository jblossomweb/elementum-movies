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
  '$filter',
  '$routeParams',
  'tmdbService',
  function ($scope, $filter, $routeParams, tmdbService) {

    $scope.imgBase = 'https://image.tmdb.org/t/p/w150_and_h225_bestv2/';
    $scope.imgLargeBase = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';
    
    $scope.movies = [];
    $scope.movie = null;
    $scope.actor = null;

    var fillMovies = function() {
      angular.forEach($scope.movies, function(movie){
        if(movie.id) {
          tmdbService.getMovie(movie.id).then(function(details){
            angular.extend(movie,details);
          });
          tmdbService.getCredits(movie.id).then(function(credits){
            angular.extend(movie,credits);
            var foundDirectors = $filter('filter')(credits.crew || [], { job: 'Director'}, true);
            if(foundDirectors.length) {
              movie.director = foundDirectors[0].name;
            }
            var foundWriters = $filter('filter')(credits.crew || [], { job: 'Writer'}, true);
            if(foundWriters.length) {
              angular.forEach(foundWriters,function(writer){
                if(!movie.writers) {
                  movie.writers = writer.name;
                } else {
                  movie.writers += ', '+writer.name;
                }
              });
            }
            if(credits.cast && credits.cast.length) {
              movie.stars = credits.cast[0].name;
              for (var i = 1; i < 3; i++) {
                if(credits.cast[i]) {
                  movie.stars += ', '+credits.cast[i].name;
                }
              }
            }
          });
        }
      });
    };

    $scope.selectMovie = function(id) {
      if($scope.movie && $scope.movie.selected) {
        delete $scope.movie.selected;
      }
      $scope.actor = null;
      var foundMovies = $filter('filter')($scope.movies || [], { id: id}, true);
      if(foundMovies.length) {
        $scope.movie = foundMovies[0];
      }
      $scope.movie.selected = true;
    };

    $scope.selectActor = function(id) {
      if($scope.actor && $scope.actor.selected) {
        delete $scope.actor.selected;
      }
      if($scope.movie && $scope.movie.cast) {
        var foundActor = $filter('filter')($scope.movie.cast || [], { id: id}, true);
        if(foundActor.length) {
          $scope.actor = foundActor[0];
        }
        $scope.actor.selected = true;
      }
    };

    $scope.getCollection = function(id) {
      tmdbService.getCollection(id).then(function(collection){
        $scope.movies = collection.parts || [];
        fillMovies();
      });
    };
    $scope.getCollection($routeParams.id);

    
}]);
