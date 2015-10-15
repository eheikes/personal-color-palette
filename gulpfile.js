/* jshint node:true */
'use strict';

// var concat      = require('gulp-concat');
// var config      = require('config');
var connect     = require('gulp-connect');
var del         = require('del');
// var extend      = require('extend');
var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
// var minifyCss   = require('gulp-minify-css');
// var mkdirp      = require('mkdirp');
var modRewrite = require('connect-modrewrite');
// var ngtemplates = require('gulp-angular-templatecache');
// var parseArgs   = require('minimist')
// var rename      = require('gulp-rename');
var rev         = require('gulp-rev');
var runSequence = require('run-sequence');
// var template    = require('gulp-template');
// var touch       = require('touch');
var usemin      = require('gulp-usemin');

// var args = parseArgs(process.argv.slice(2));

gulp.task('clean', function(done) {
  return del('dist');
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8080,
    livereload: false,
    middleware: function(connect) {
      return [
        modRewrite(['!(\\.) /index.html [L]'])
      ];
    }
  });
});

// gulp.task('copy:mocks', function() {
//   if (args.mocks) {
//     return gulp.src([
//       'bower_components/angular-mocks/angular-mocks.js',
//       'bower_components/Faker/build/build/faker.js',
//       'app/mockApiService.js'
//     ])
//       .pipe(concat('mocks.js'))
//       .pipe(gulp.dest('.tmp'));
//   } else {
//     mkdirp.sync('.tmp');
//     touch.sync('.tmp/mocks.js');
//     return;
//   }
// });

// gulp.task('ngtemplates', function() {
//   gulp.src('app/views/*.html')
//     .pipe(ngtemplates({
//       module: 'jarvis',
//       filename: 'templates.js'
//     }))
//     .pipe(gulp.dest('.tmp'));
// });

gulp.task('build', ['clean'], function(done) {
  return runSequence(['copy:fonts', 'copy:partials', 'usemin'], done);
});

gulp.task('copy:fonts', function() {
  return gulp.src('bower_components/lumx/dist/fonts/**')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy:partials', function() {
  return gulp.src('src/partials/**')
    .pipe(gulp.dest('dist/partials'));
});

gulp.task('lint', function() {
  return gulp.src([
    'src/**/*.js',
    'gulpfile.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('serve', function() {
  return runSequence(
    ['lint', 'build'],
    ['connect', 'watch']
  );
});

gulp.task('usemin', function () {
  return gulp.src('src/index.html')
    .pipe(usemin({
      css: [rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['gulpfile.js', 'src/**'], ['lint', 'build']);
});

gulp.task('default', ['lint', 'build']);
