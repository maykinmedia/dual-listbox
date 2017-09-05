var gulp = require('gulp');
var Server = require('karma').Server;
var paths = require('../paths');


/**
 * Default task
 * Run using "gulp"
 * Runs all tasks
 */
gulp.task('default', ['clean', 'build', 'lint', 'test']);
