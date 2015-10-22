angular.module('app').filter('capitalize', function() {
  'use strict';
  return function(str) {
    if (typeof str !== 'string' || str === '') {
      return '';
    }
    return str[0].toUpperCase() + str.substr(1);
  };
});
