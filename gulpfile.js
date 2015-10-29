/* jshint node:true */
'use strict';

var connect     = require('gulp-connect');
var del         = require('del');
var flatten     = require('gulp-flatten');
var ghPages     = require('gulp-gh-pages');
var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var Karma       = require('karma').Server;
var protractor  = require('gulp-protractor').protractor;
var rev         = require('gulp-rev');
var runSequence = require('run-sequence');
var usemin      = require('gulp-usemin');

gulp.task('all', function(done) {
  return runSequence(['lint', 'build'], 'test:unit', done);
});

gulp.task('clean', function(done) {
  return del('dist');
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8080,
    livereload: false
  });
});

gulp.task('build', ['clean'], function(done) {
  return runSequence(['copy:fonts', 'copy:images', 'copy:partials', 'usemin'], done);
});

gulp.task('copy:fonts', function() {
  return gulp.src('bower_components/lumx/dist/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy:images', function() {
  return gulp.src('src/img/**')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy:partials', function() {
  return gulp.src('src/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('dist/partials'));
});

gulp.task('lint', function() {
  return gulp.src([
    'src/**/*.js',
    'test/**/*.js',
    'gulpfile.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('publish', function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages({ message: 'Publish to gh-pages on [timestamp]' }));
});

gulp.task('serve', function() {
  return runSequence(
    ['all'],
    ['connect', 'watch']
  );
});

gulp.task('test', function(done) {
  return runSequence('test:unit', 'test:e2e', done);
});

gulp.task('test:e2e', ['update-webdriver'], function(done) {
  gulp.src(['test/e2e/test-*.js'])
    .pipe(protractor({
        configFile: 'test/e2e/protractor.conf.js'
    }))
    .on('error', function(e) { throw e; })
    .on('end', done);
});

gulp.task('test:unit', function(done) {
  new Karma({
    configFile: __dirname + '/test/unit/karma.conf.js',
    singleRun: true
  }, function() { done(); }).start();
});

/* jshint camelcase:false */
gulp.task('update-webdriver', require('gulp-protractor').webdriver_update);
/* jshint camelcase:true */

gulp.task('usemin', function () {
  return gulp.src('src/index.html')
    .pipe(usemin({
      css: [rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['gulpfile.js', 'src/**'], ['all']);
});

gulp.task('default', ['all']);
