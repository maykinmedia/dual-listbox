const gulp = require('gulp');
const paths = require('../paths');
const {js} = require('./js');
const {scss} = require('./scss');


/**
 * Watch task
 * Run using "gulp watch"
 * Runs "watch-js" and "watch-sass" tasks
 */
const watch = gulp.parallel(watchJS, watchSCSS);


/**
 * Watch-js task
 * Run using "gulp watch-js"
 * Runs "js" and "lint" tasks instantly and when any file in paths.jsSrc changes
 */
function watchJS() {
    gulp.watch([paths.jsSrcDir, paths.jsSpecEntry], gulp.parallel(js));
}

/**
 * Watch-sass task
 * Run using "gulp watch-scss"
 * Runs "sass" task instantly and when any file in paths.sassSrc changes
 */
function watchSCSS() {
    gulp.watch(paths.sassSource, scss);
}



exports.watch = watch;
gulp.task('watch', watch);


exports.watchJS = watchJS;
gulp.task('watch-js', watchJS);


exports.watchSCSS = watchSCSS;
gulp.task('watch-scss', watchSCSS);
