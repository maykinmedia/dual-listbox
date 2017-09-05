var paths = require('./build/paths');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './src/' + paths.packageName,
    externals: [nodeExternals()],
    target: 'node',

    output: {
        filename: paths.packageName + '.js',
        libraryTarget: 'umd',
        path: __dirname + '/' + paths.output
    },

    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
