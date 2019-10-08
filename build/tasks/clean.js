const gulp = require('gulp');
const del = require('del');
const paths = require('../paths');


/**
 * Clean task
 * Run using "gulp clean"
 * Cleans output directory
 */
function clean(cb) {
    del([paths.coverageDir, paths.doc, paths.output]);
    cb();
}

gulp.task('clean', clean);
exports.clean = clean;
