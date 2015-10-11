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
    .when('/photo/add', {
      templateUrl: 'partials/addPhotos.html',
      controller: 'addPhotosController',
    })
    .otherwise({ redirectTo: '/profiles' });
  });
})();
