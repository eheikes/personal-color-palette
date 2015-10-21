angular.module('app').controller('photosController', function(
  $scope,
  $rootScope,
  profileService
) {
  'use strict';
  $rootScope.title = 'Your Photos';
  profileService.requireProfile();

  $scope.currentProfile = profileService.get();

  $scope.continue = function() {
    // TODO
  };

  $scope.hasAllPhotos = function() {
    return Object.keys($scope.currentProfile.photos).every(function(key) {
      return $scope.currentProfile.photos[key].photoUrl !== null;
    });
  };
});
