var gulp = require('gulp');
var jshint = require('gulp-jshint');
var paths = require('../paths');


/**
 * Lint task
 * Run using "gulp lint"
 * Lints javascript code
 */
gulp.task('lint', function() {
    return gulp.src([paths.source, paths.tests])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});
