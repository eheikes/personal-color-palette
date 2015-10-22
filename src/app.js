(function(){
  'use strict';
  var app = angular.module('app', ['ngRoute', 'lumx'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/profiles', {
      templateUrl: 'partials/profiles.html',
      controller: 'profilesController',
    })
    .when('/photos', {
      templateUrl: 'partials/photos.html',
      controller: 'photosController',
    })
    .when('/photos/:type/photo', {
      templateUrl: 'partials/change-photo.html',
      controller: 'changePhotoController',
    })
    .otherwise({ redirectTo: '/profiles' });
  });
})();
