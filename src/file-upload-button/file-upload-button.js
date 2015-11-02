//
// Button that activates the file upload dialog. Based on the article:
// http://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
//
angular.module('app').directive('fileUploadButton', function() {
  'use strict';
  var counter = 0;
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'partials/file-upload-button.html',
    scope: {
      onUpload: '&'
    },
    link: function(scope, element, attrs) {
      // Generate a pseudo-random ID.
      scope.id = 'file-upload-' + counter;
      counter++;

      // Handle the file upload.
      element.on('change', function(e) {
        scope.onUpload({ files: e.target.files, event: e });
      });
    }
  };
});
