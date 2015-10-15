/* jshint node:true */
module.exports = function(config) {
  'use strict';
  config.set({
    basePath: '../../',
    files: [
      'dist/*.js',
      'test/unit/test-*.js',
    ],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['dots']
  });
};
