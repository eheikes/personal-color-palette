angular.module('app').controller('addPhotosController', function(
  $scope,
  $rootScope,
  LxDialogService,
  LxNotificationService,
  profileService
) {
  'use strict';
  $rootScope.title = 'Add Photo';
  profileService.requireProfile();

  $scope.defaultUrl = 'http://placehold.it/300x300?text=Take+or+upload+a+photo';
  $scope.photoUrl = $scope.defaultUrl;
  $scope.hasPhoto = function() {
    return $scope.photoUrl !== $scope.defaultUrl;
  };

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
