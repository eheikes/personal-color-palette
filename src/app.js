(function(){
  'use strict';
  var app = angular.module('app', ['ngRoute', 'lumx'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);

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
    .when('/photos/:type/color', {
      templateUrl: 'partials/change-color.html',
      controller: 'changeColorController',
    })
    .otherwise({ redirectTo: '/profiles' });
  });
})();
