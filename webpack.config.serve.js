const path = require('path');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { host } = require('./src/config');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'eval-cheap-module-source-map',
    entry: './src/client.jsx',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};


module.exports.serve = {
    content: [__dirname],
    open: true,
    port: 5001,
    // app, middleware, options
    add: app => app.use(convert(proxy('/api', { target: host })))
};
