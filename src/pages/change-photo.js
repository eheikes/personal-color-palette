angular.module('app').controller('changePhotoController', function(
  $scope,
  $rootScope,
  $location,
  $routeParams,
  $filter,
  LxDialogService,
  LxNotificationService,
  profileService
) {
  'use strict';
  $scope.photoType = $filter('lowercase')($routeParams.type);
  $rootScope.title = 'Add ' + $filter('capitalize')($scope.photoType) + ' Photo';

  // TODO -- what if no profile?
  // TODO -- what if photoType is not a valid value?

  $scope.photoUrl = null;
  $scope.saveAndContinue = function() {
    if (!$scope.photoUrl) { return; }
    profileService.savePhoto($scope.photoType, $scope.photoUrl);
    $location.path('photos/' + $scope.photoType + '/color');
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
  $scope.webcamEnabled = false;

  $scope.openWebcamDialog = function() {
    LxDialogService.open('webcamDialog');
  };

  $scope.onWebcamCapture = function(dataUrl) {
    $scope.photoUrl = dataUrl;
  };

  $scope.onWebcamError = function(err) {
    $scope.webcamEnabled = false;
    LxNotificationService.error('Please enable your webcam to take a photo.');
  };

  $scope.onWebcamStream = function() {
    $scope.webcamEnabled = true;
  };

  $scope.takeWebcamPhoto = function() {
    $scope.$broadcast('capture');
    LxDialogService.close('webcamDialog');
  };
});
