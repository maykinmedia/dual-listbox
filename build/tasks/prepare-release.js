const gulp = require('gulp');
const {build} = require('./build');
const {clean} = require('./clean');
const {jsdoc} = require('./jsdoc');
const {lint} = require('./lint');
const {test} = require('./test');

/**
 * Prepare-release task
 * Run using "gulp prepare-release"
 * Runs clean, build, jsdoc, lint and test
 */
gulp.task('prepare-release', gulp.series(clean, build, jsdoc, lint, test));
