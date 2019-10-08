'use strict';
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const paths = require('../paths');


/**
 * Lint task
 * Run using "gulp lint"
 * Runs jshint
 */
function lint() {
    return gulp.src(paths.source)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('gulp-jshint-jslint-file-reporter', {
            filename: paths.coverageDir + '/jshint-output.xml'
        }));
};

gulp.task('lint', lint);
exports.lint = lint;
