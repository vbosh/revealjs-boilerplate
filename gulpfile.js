var gulp = require('gulp');
var browserify = require('gulp-browserify');
var open = require('gulp-open');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

var BUNDLE_FILE_NAME = 'bundle.js';
var CSS_FILE_NAME = 'styles.css'
var HTML_FILE_NAME = 'index.html';
var DIST_PATH = './dist';

gulp.task('build', function () {
    runSequence('clean', 'css', 'theme', 'font', 'js', 'uglify', 'templates', 'open');
});

gulp.task('open', function(){
    gulp.src(DIST_PATH + '/' + HTML_FILE_NAME)
        .pipe(open());
});

gulp.task('clean', function () {
    return gulp.src([DIST_PATH], { read: false })
        .pipe(clean());
});

gulp.task('css', function(){
    return gulp.src('./src/styles/index.css')
        .pipe(rename(CSS_FILE_NAME))
        .pipe(gulp.dest(DIST_PATH));
});

gulp.task('theme', function(){
    return gulp.src('./src/styles/theme/**')
        .pipe(gulp.dest(DIST_PATH + '/theme/'));
});

gulp.task('font', function(){
    return gulp.src('./src/styles/font/**')
        .pipe(gulp.dest(DIST_PATH + '/font/'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/main.js')
        .pipe(browserify())
        .pipe(rename(BUNDLE_FILE_NAME))
        .pipe(gulp.dest(DIST_PATH));
});

gulp.task('uglify', function () {
    return gulp.src(DIST_PATH + '/' + BUNDLE_FILE_NAME)
        .pipe(uglify())
        .pipe(gulp.dest(DIST_PATH));
});

gulp.task('templates', function () {
    return gulp.src('./src/templates/index.jade')
        .pipe(jade({
            pretty: '    '
        }))
        .pipe(gulp.dest(DIST_PATH));
});
