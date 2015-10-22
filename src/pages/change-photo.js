angular.module('app').controller('changePhotoController', function(
  $scope,
  $rootScope,
  $routeParams,
  $filter,
  LxDialogService,
  LxNotificationService,
  profileService
) {
  'use strict';
  $scope.photoType = $filter('lowercase')($routeParams.type);
  $rootScope.title = 'Add ' + $filter('uppercase')($scope.photoType) + ' Photo';

  // TODO -- what if no profile?
  // TODO -- what if photoType is not a valid value?

  $scope.photoUrl = null;

  //
  // File upload stuff.
  //
  var reader = new FileReader();
  reader.onload = function(e) {
    $scope.$apply(function(scope) {
      scope.photoUrl = e.target.result;
    });
  };

  var isImage = function(fileObj) {
    return /^image\//.test(fileObj.type);
  };

  $scope.onFileUpload = function(files, event) {
    var file = files[0];
    if (!file) { return; }
    if (isImage(file)) {
      reader.readAsDataURL(file);
    } else {
      LxNotificationService.error('The uploaded file is not an image.');
    }
  };

  //
  // Webcam stuff.
  //
  $scope.webcamChannel = {};

  $scope.openWebcamDialog = function() {
    $scope.webcamImage = null;
    LxDialogService.open('webcamDialog');
  };

  $scope.onWebcamSuccess = function() {
  };

  $scope.onWebcamError = function(err) {
    LxNotificationService.error('Please enable your webcam to take a photo.');
  };

});
