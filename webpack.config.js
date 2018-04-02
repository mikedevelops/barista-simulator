const path = require('path');
const Html = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new Html({
            template: path.resolve(__dirname, 'src/index.html'),
            inject: 'body'
        })
    ],
    devtool: 'source-map'
}
