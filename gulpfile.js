var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

var error = function(message) {
  gutil.beep()
  return gutil.log(message);
}

gulp.task('build', function() {
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./lib/'))
});

gulp.task('build-tests', function() {
  return gulp.src('./test/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./tests-lib/'));
});

gulp.task('run-tests', function () {
  gulp.src('./tests-lib/**/*.js', {read:false})
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}).on('error', gutil.beep));
});

gulp.task('test', ['build-tests'], function () {
  gulp.src('./tests-lib/**/*.js', {read:false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch-src', function() {
  return gulp.src('./src/**/*.coffee', {read:false})
    .pipe(watch(function(files) {
      return files
        .pipe(plumber())
        .pipe(coffee({bare: true}).on('error', error))
        .pipe(gulp.dest('./lib/'))
        .pipe(notify({onLast:true, title:"NJS", message:'Recompiled <%= file.relative %>'}));
    }));
});

gulp.task('watch-test', function() {
  return gulp.src('./test/**/*.coffee', {read:false})
    .pipe(watch(function(files) {
      return files
        .pipe(plumber())
        .pipe(coffee({bare: true}).on('error', error))
        .pipe(gulp.dest('./tests-lib/'))
        .pipe(notify({onLast:true, title:"NJS", message:'Recompiled <%= file.relative %>'}));
    }));
});

gulp.task('watch', ['watch-src', 'watch-test']);

gulp.task('default', ['build', 'test']);
