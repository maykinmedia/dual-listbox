'use strict';
const gulp = require('gulp');
const Server = require('karma').Server;
const {lint} = require('./lint');


/**
 * Test task
 * Run using "gulp test"
 * Runs karma one
 */
function test(done) {
    new Server({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, done).start();
}


/**
 * Test driven development (tdd) task
 * Run using "gulp tdd"
 * Watch for file changes and re-run tests on each change
 */
function tdd(done) {
    new Server({
        configFile: __dirname + '/../../karma.conf.js',
    }, done).start();
}


exports.test = test;
gulp.task('test', gulp.parallel(lint, test));


exports.tdd = tdd;
gulp.task('tdd', gulp.parallel(lint, tdd));
