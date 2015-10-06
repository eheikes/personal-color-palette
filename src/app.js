(function(){
  'use strict';
  var app = angular.module('app', ['ngRoute', 'ngMaterial'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/profiles', {
      templateUrl: 'partials/profiles.html',
      controller: 'profilesController',
    })
    .otherwise({ redirectTo: '/profiles' });
  });
})();
