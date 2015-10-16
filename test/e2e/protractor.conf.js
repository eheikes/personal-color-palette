/* jshint node:true */
exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:' + (process.env.HTTP_PORT || '8080') + '/',
  // specs: ['e2e/*Spec.js'],
  multiCapabilities: [{
    'browserName' : 'chrome'
  }],
  onPrepare: function() {
    'use strict';
    browser.driver.manage().window().setSize(1600, 800);

    browser.addMockModule('disableNgAnimate', function() {
      angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
        $animate.enabled(false);
      }]);
    });
  }
};
