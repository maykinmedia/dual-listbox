var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');


/**
 * Clean task
 * Run using "gulp clean"
 * Cleans output directory
 */
gulp.task('clean', function() {
    gulp.src([paths.output])
        .pipe(vinylPaths(del));
});
