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
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
        process.exit(1)
    }

    var customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7',
            version: '35'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '30'
        },
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        }
    }

    config.set({
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
        colors: true,
        recordScreenshots: false,
        reporters: (process.env.TRAVIS) ? ['spec', 'coverage', 'coveralls'] : ['spec', 'coverage'],

        sauceLabs: {
            testName: 'Dual listbox browser testing',
            public: 'public'
        },
        customLaunchers: customLaunchers,
        captureTimeout: 120000,
        browsers: Object.keys(customLaunchers),
        singleRun: true
    });
}
