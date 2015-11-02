/* jshint node:true */
module.exports = function(config) {
  'use strict';
  config.set({
    basePath: '../../',
    files: [
      'dist/*.js',
      'src/**/*.html',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/blob-polyfill/Blob.js',
      'test/unit/*.spec.js',
    ],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['dots'],
    preprocessors: {
      '**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      moduleName: 'app',
      cacheIdFromPath: function(filepath) {
        return 'partials/' + filepath.replace(/^.*\//, '');
      }
    }
  });
};
