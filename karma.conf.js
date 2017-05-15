var clone= require('clone');
var paths = require('./build/paths');
var webpackConfig = clone(require('./webpack.config.js'));


// Add istanbul-instrumenter to webpack configuration
webpackConfig.module.loaders.push(
    {
        test: /\.js$/,
        exclude: /(node_modules|test)/,
        loader: 'babel-istanbul-loader'
    }
);

webpackConfig.output.filename += '.test';
webpackConfig.plugins = [];
webpackConfig.externals = [];


// The main configuration
module.exports = function(config) {
    config.set({
        browserStack: {
            username: '',
            accessKey: ''
        },

        frameworks: [
            'jasmine-jquery',
            'jasmine-ajax',
            'jasmine'
        ],

        files: [
            'test/*.spec.js'
        ],

        preprocessors: {
            'test/*.spec.js': [
                'webpack'
            ]
        },

        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: paths.coverageDir },
                { type: 'text' }
            ]
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        reporters: (process.env.TRAVIS) ? ['spec', 'coverage', 'coveralls'] : ['spec', 'coverage'],

        customLaunchers: {
            edge14: {
                base: 'BrowserStack',
                browser: 'edge',
                browser_version: '14',
                os: 'Windows',
                os_version: '10'
            },

            edge15: {
                base: 'BrowserStack',
                browser: 'edge',
                browser_version: '15',
                os: 'Windows',
                os_version: '10'
            },

            ie11: {
                base: 'BrowserStack',
                browser: 'ie',
                browser_version: '11',
                os: 'Windows',
                os_version: '7'
            }
        },

        browsers: ['Chrome', 'Firefox', 'edge14', 'edge15', 'ie11']
//        browsers: ['Chrome', 'Firefox']
    });
}
