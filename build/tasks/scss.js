'use strict';
var gulp = require('gulp');
var gulpif = require('gulp-if');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var argv = require('yargs').argv;
var paths = require('../paths');


var sourcemap = argv.sourcemap ? true : false;

/**
 * scss task
 * Run using "gulp scss"
 * Searches for sass files in paths.sassSrc
 * Compiles sass to css
 * Auto prefixes css
 * Optimizes css when used with --production
 * Writes css to paths.cssDir
 */
function scss() {
    return gulp.src(paths.sassSource)
        .pipe(gulpif(sourcemap, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([cssnano(), autoprefixer()]))
        .pipe(gulpif(sourcemap, sourcemaps.write('./')))
        .pipe(gulp.dest(paths.output));
}


gulp.task('sass', scss);
gulp.task('scss', scss);
exports.sass = scss;
exports.scss = scss;
