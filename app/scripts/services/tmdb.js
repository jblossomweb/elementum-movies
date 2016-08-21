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

  var apiGet = function(endpoint, querystring) {
    if(querystring) {
      return $http.get(apiBase+endpoint+'?'+querystring+'&api_key='+apiKey);
    }
    return $http.get(apiBase+endpoint+'?api_key='+apiKey);
  };

  this.getGenres = function() {
    return apiGet('genre/movie/list/').then(function(result){
      if(result.data) {
        return result.data;
      }
    });
  };

  this.getGenrePage = function(id, page) {
    page = page ? page : 1;
    return apiGet('genre/'+id+'/movies','page='+page).then(function(result){
      if(result.data && Number(result.data.id) === Number(id)) {
        return result.data;
      }
    });
  };

  this.getCollection = function(id) {
    return apiGet('collection/'+id).then(function(result){
      if(result.data && Number(result.data.id) === Number(id)) {
        return result.data;
      }
    });
  };

  this.getList = function(id) {
    return apiGet('list/'+id).then(function(result){
      if(result.data && Number(result.data.id) === Number(id)) {
        return result.data;
      }
    });
  };

  this.getMovie = function(id) {
    return apiGet('movie/'+id).then(function(result){
      if(result.data && Number(result.data.id) === Number(id)) {
        return result.data;
      }
    });
  };

  this.getCredits = function(id) {
    return apiGet('movie/'+id+'/credits').then(function(result){
      if(result.data && Number(result.data.id) === Number(id)) {
        return result.data;
      }
    });
  };

}]);