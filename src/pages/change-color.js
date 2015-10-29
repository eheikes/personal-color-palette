angular.module('app').controller('changeColorController', function(
  $scope,
  $rootScope,
  $location,
  $routeParams,
  $filter,
  profileService
) {
  'use strict';
  $scope.photoType = $filter('lowercase')($routeParams.type);
  $rootScope.title = 'Add ' + $filter('capitalize')($scope.photoType) + ' Color';

  // TODO -- what if no profile?
  // TODO -- what if photoType is not a valid value?

  var profile = profileService.get();
  $scope.photoUrl = profile.photos[$scope.photoType].photoUrl;
  $scope.color = null;

  $scope.cancel = function() {
    profileService.savePhoto($scope.photoType, null);
    $location.path('photos');
  };
  $scope.saveAndContinue = function() {
    if (!$scope.photoUrl) { return; }
    profileService.saveColor($scope.photoType, $scope.color);
    $location.path('photos');
  };
});
