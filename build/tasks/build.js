var gulp = require('gulp');
var webpack = require('webpack-stream');
var autoprefixer = require('gulp-autoprefixer');
var purge = require('gulp-css-purge');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var paths = require('../paths');
var webpackConfig = require('../../webpack.config.js');


/**
 * Build task
 * Run using "gulp build-js"
 * Runs webpack to compile javascript
 */
gulp.task('build-js', function() {
    gulp.src('')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(webpackConfig.output.path));
});


/**
 * Build task
 * Run using "gulp build-sass"
 * Runs gulp-sass to compile sass to css
 */
gulp.task('build-sass', function() {
    gulp.src(paths.sassSource)
        // Compiles sass to css
        .pipe(sass({
            // Allow importing from node_modules in .scss files
            includePaths: 'node_modules/'
        }).on('error', sass.logError))

        // Auto prefixes css
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

        // Remove duplicated code
        .pipe(purge())

        // Minify CSS
        .pipe(minify())

        // Writes css to paths.cssDir
        .pipe(gulp.dest(paths.output));
});


/**
 * Build task
 * Run using "gulp build"
 * Runs build-js and build-sass
 */
gulp.task('build', ['build-js', 'build-sass', 'jsdoc']);
