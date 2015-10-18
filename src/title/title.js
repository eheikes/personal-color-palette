angular.module('app').directive('title', function($rootScope) {
  'use strict';
  return {
    restrict: 'E',
    template: '{{title}} :: Personal Color Palette',
    link: function(scope, element, attrs) {
      scope.title = $rootScope.title;
    }
  };
});
