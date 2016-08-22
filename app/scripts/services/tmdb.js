'use strict';

/**
 * @ngdoc function
 * @name elementumMoviesApp.service:tmdbService
 * @description
 * # tmdbService
 * Service of the elementumMoviesApp
 */
angular.module('elementumMoviesApp').service('tmdbService', [
  '$http', 
  '$timeout',
  '$q',
  function ($http, $timeout, $q) {
  var apiBase = 'https://api.themoviedb.org/3/';
  var apiKey = 'da811d0ef4d0b95aaf27b22623b94a38';

  var requestLimit = 10;
  var urlRequests = {};

  var apiGet = function(endpoint, querystring) {
    var url;
    if(querystring) {
      url = apiBase+endpoint+'?'+querystring+'&api_key='+apiKey;
    } else {
      url = apiBase+endpoint+'?api_key='+apiKey;
    }

    // return $http.get(url);

    return $q(function(resolve, reject) {
      $http.get(url).then(function(result) {
        urlRequests[url] = 0;
        resolve(result);
      }, function(error) {
        if(Number(error.status) === 429) { // too many requests
          $timeout(function() {
            urlRequests[url] = urlRequests[url] || 0;
            urlRequests[url]++;
            if(urlRequests[url] <= requestLimit) {
              apiGet(endpoint, querystring).then(function(result) {
                resolve(result);
              });
            } else {
              reject(error);
            }
          }, 7000); // result.headers('Retry-After') was unavailable
        }
      });
    });
  };

  this.getNowPlaying = function() {
    return apiGet('movie/now_playing').then(function(result){
      if(result.data) {
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
      if(result.data && String(result.data.id) === String(id)) {
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