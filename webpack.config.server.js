const path = require('path');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const json = require('./package');

const filename = 'server.js';

module.exports = {
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
    entry: './src/server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new GenerateJsonPlugin('package.json', Object.assign({}, json, {
            main: '',
            scripts: {
                start: `node ${filename}`
            },
            devDependencies: {}
        }))
    ]
};

