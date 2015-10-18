angular.module('app').directive('appToolbar', function($rootScope) {
  'use strict';
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/app-toolbar.html',
    link: function(scope, element, attrs) {
      scope.title = $rootScope.title;
    }
  };
});
