var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var distDir = 'dist/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
    coverageDir: 'build/reports/coverage',
    source: appRoot + '**/*.js',
    sassSource: appRoot + '**/*.scss',
    tests: 'test/**/*.spec.js',
    packageName: pkg.name,
    doc: 'doc/',
    output: distDir
};
