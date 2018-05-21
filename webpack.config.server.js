const path = require('path');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const json = require('./package');

const filename = 'server.js';

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', './marko'],
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    node: {
        __dirname: false,
        __filename: true,
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            // {
            //     test: /\.marko/,
            //     loader: 'marko-loader'
            // }
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

