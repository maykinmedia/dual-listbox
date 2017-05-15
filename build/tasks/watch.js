var gulp = require('gulp');
var webpack = require('webpack-stream');
var autoprefixer = require('gulp-autoprefixer');
var purge = require('gulp-css-purge');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var paths = require('../paths');
var webpackConfig = require('../../webpack.config.js');


/**
 * Watch task
 * Run using "gulp watch"
 * Runs the build-js and build-sass
 */
gulp.task('watch-sass', function() {
    gulp.watch(paths.sassSource, ['build-sass']);
});

gulp.task('watch-js', function() {
    gulp.watch(paths.source, ['build-js']);
});

gulp.task('watch', ['build', 'watch-sass', 'watch-js']);
