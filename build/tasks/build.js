const gulp = require('gulp');
const {js} = require('./js');
const {scss} = require('./scss');

const build = gulp.parallel(js, scss);

gulp.task('build', build);
exports.build = build;
