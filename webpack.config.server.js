const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const json = require('./package');

const filename = 'server.js';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    optimization: {
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: "vendors",
        //             chunks: "all"
        //         }
        //     }
        // }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    node: {
        __dirname: false,
        __filename: true,
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: 'source-map',
    entry: './server.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].js',
        filename
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'], // 'eslint-loader'
                // exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'css-loader', 'sass-loader'
                ],
            }
        ]
    },
    plugins: [
        new GenerateJsonPlugin('package.json', Object.assign({}, json, {
            main: filename,
            scripts: {
                start: `node ${filename}`
            },
            devDependencies: {}
        })),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
        // new BundleAnalyzerPlugin({})
    ]
};

