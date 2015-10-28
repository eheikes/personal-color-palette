/* global Webcam */
angular.module('app').directive('webcam', function($rootScope) {
  'use strict';
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="webcam-preview"></div>',
    scope: {
      onCapture: '&',
      onError: '&',
      onStream: '&'
    },
    link: function(scope, element, attrs) {
      /* jshint camelcase:false */
      Webcam.set({
        dest_width: 640,
        dest_height: 480
      });
      /* jshint camelcase:true */

      Webcam.attach(element[0]);

      var cancelListener = scope.$on('capture', function() {
        Webcam.snap(function(dataUrl) {
          if (!scope.onCapture) { return; }
          scope.onCapture({ dataUrl: dataUrl });
        });
      });

      Webcam.on('error', function(err) {
        if (!scope.onError) { return; }
        scope.onError({ err: err });
      });

      Webcam.on('live', function() {
        if (!scope.onStream) { return; }
        scope.onStream();
      });

      scope.$on('$destroy', function() {
        Webcam.off('error');
        Webcam.off('live');
        Webcam.reset();
        cancelListener();
      });
    }
  };
});
