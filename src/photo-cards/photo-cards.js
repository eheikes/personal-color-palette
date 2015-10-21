angular.module('app').directive('photoCards', function() {
  'use strict';
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'partials/photo-cards.html',
    scope: {
      profile: '='
    },
    link: function(scope, element, attrs) {
    }
  };
});
