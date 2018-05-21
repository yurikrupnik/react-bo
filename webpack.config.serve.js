const path = require('path');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { host, port } = require('./src/config');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.marko'],
    },
    devtool: 'eval-cheap-module-source-map',
    entry: './src/client.jsx',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: '/'
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
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({}),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            filename: 'index.ejs',
            title: 'omg',
            meta: {
                charset: 'UTF-8',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true
            }
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
    port: port + 1,
    // dev: { index: 'index.marko' },
    // app, middleware, options
    add: (app) => {
        app.use(convert(proxy('/api', { target: host })));
        app.use(convert(history({
            index: '/index.ejs'
        })));
    }
};
