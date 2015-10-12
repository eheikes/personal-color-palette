angular.module('app').controller('addPhotosController', function($rootScope, profileService) {
  'use strict';
  $rootScope.title = 'Add Photo';
  profileService.requireProfile();
});
