const path = require('path');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const json = require('./package');

const filename = 'server.js';

module.exports = {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    node: {
        __dirname: false,
        __filename: true,
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: 'source-map',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
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

