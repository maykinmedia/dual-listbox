var gulp = require('gulp');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown')
var rename = require('gulp-rename')
var paths = require('../paths');


/**
 * doc task
 * Run using "gulp jsdoc"
 * Generates documentation files
 */
gulp.task('jsdoc', function() {
    return gulp.src([paths.source])
        .pipe(gulpJsdoc2md())

        // Add .md extension
        .pipe(rename(function (path) {
            path.extname = '.md';
        }))

        .pipe(gulp.dest(paths.doc))
});
