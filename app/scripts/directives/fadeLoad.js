'use strict';

/**
 * @ngdoc function
 * @name elementumMoviesApp.directive:fadeLoad
 * @description
 * # fadeLoad
 * Directive of the elementumMoviesApp
 */
angular.module('elementumMoviesApp').directive('fadeLoad', [
  '$window',
  function($window) {
  return {
    restrict: 'A',
    link: function(scope, el, attr) {
      el.bind('load', function() {
        el.parent().addClass('loaded');
      });
      el.bind('error', function() {
        $window.console.warn(attr.src + ' did not load');
      });
    }
  };
}]);