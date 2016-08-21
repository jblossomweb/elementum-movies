'use strict';

/**
 * @ngdoc function
 * @name elementumMoviesApp.service:tmdbService
 * @description
 * # tmdbService
 * Service of the elementumMoviesApp
 */
angular.module('elementumMoviesApp').service('tmdbService', ['$http', function ($http) {

  var apiBase = 'https://api.themoviedb.org/3/';
  var apiKey = 'da811d0ef4d0b95aaf27b22623b94a38';

  var apiGet = function(endpoint) {
    return $http.get(apiBase+endpoint+'?api_key='+apiKey);
  };

  this.getCollection = function(id) {
    return apiGet('collection/'+id).then(function(collection){
      if(collection.data && collection.data.id === id) {
        return collection.data;
      }
    });
  };

  this.getMovie = function(id) {
    return apiGet('movie/'+id).then(function(movie){
      if(movie.data && movie.data.id === id) {
        return movie.data;
      }
    });
  };

  this.getCredits = function(id) {
    return apiGet('movie/'+id+'/credits').then(function(movie){
      if(movie.data && movie.data.id === id) {
        return movie.data;
      }
    });
  };

}]);