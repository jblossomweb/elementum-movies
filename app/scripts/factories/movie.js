'use strict';

/**
 * @ngdoc function
 * @name elementumMoviesApp.factory:movieFactory
 * @description
 * # movieFactory
 * Factory of the elementumMoviesApp
 */
angular.module('elementumMoviesApp').factory('movieFactory', [
  '$filter',
  'tmdbService', 
  function ($filter, tmdbService) {

    var Factory = {};

    Factory.imgBase = 'https://image.tmdb.org/t/p/w150_and_h225_bestv2';
    Factory.imgLargeBase = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

    var fillMovies = function($scope) {
      angular.forEach($scope.movies, fillMovie);
    };

    var fillMovie = function(movie){
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
    };

    Factory.selectMovie = function($scope) {
      return function(id) {
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
    };

    Factory.selectActor = function($scope) {
      return function(id) {
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
    };

    Factory.getCollection = function($scope) {
      return function(id) {
        tmdbService.getCollection(id).then(function(collection){
          $scope.movies = collection.parts || [];
          fillMovies($scope);
        });
      };
    };

    Factory.getList = function($scope) {
      return function(id) {
        tmdbService.getList(id).then(function(list){
          $scope.movies = list.items || [];
          fillMovies($scope);
        });
      };
    };

    Factory.scopeMethods = function($scope, methods) {
      angular.forEach(methods, function(method) {
        $scope[method] = Factory[method]($scope);
      });
    };

    return Factory;

}]);