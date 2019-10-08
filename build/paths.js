var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var distDir = 'dist/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
    packageName: pkg.name,
    doc: 'doc/',
    jsSpecEntry: 'test/index.js',
    jsSrcDir: appRoot,
    coverageDir: 'build/reports/coverage',
    source: appRoot + '**/*.js',
    sassSource: appRoot + '**/*.scss',
    tests: 'test/**/*.spec.js',
    output: distDir
};
