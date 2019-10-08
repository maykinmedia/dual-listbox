
var gulp = require('gulp');
var HubRegistry = require('gulp-hub');


var hub = new HubRegistry(['./build/tasks/*.js']);

gulp.registry(hub);
