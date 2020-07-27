const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            { test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {presets: ['env', 'react', 'stage-0']}
                }]
            },
            { test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {presets: ['react']}
                }]
            },
            {test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                },]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {from: __dirname + '/src/assets/meshes/', to: __dirname + '/dist/assets/meshes/'},
            {from: __dirname + '/src/assets/images/', to: __dirname + '/dist/assets/images/'},
            //{from: __dirname + '/src/assets/materials/', to: __dirname + '/dist/assets/materials'}
        ])
    ]
};