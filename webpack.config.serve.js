const path = require('path');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { host } = require('./src/config');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
    },
    devtool: 'eval-cheap-module-source-map',
    entry: './src/client.jsx',
    output: {
        path: path.resolve(__dirname, 'dist/assets')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            filename: 'index.ejs',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};


module.exports.serve = {
    content: [__dirname],
    open: true,
    port: 5001,
    dev: { index: 'index.ejs' },
    // app, middleware, options
    add: app => app.use(convert(proxy('/api', { target: host })))
};
