angular.module('app').controller('profilesController', function(
  $scope,
  $rootScope,
  $location,
  profileService
) {
  'use strict';
  $rootScope.title = 'Profiles';

  $scope.profiles = profileService.getAll();
  $scope.createAndContinue = function() {
    profileService.add();
    profileService.selectNewest();
    $location.path('photos');
  };
});
