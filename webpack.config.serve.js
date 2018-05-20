// const { renderToString } = require('react-dom/server');

const statics = require('koa-static');
const path = require('path');
// const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const history = require('connect-history-api-fallback');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { host, port } = require('./src/config');
const serverConfig = require('./webpack.config.server');
// const html = require('./src/middlewares/html');
// const state = require('./src/middlewares/state');
// const App = require('./src/components/App/index.jsx');


module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
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
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin({}),
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
    open: false,
    port: port + 1,
    // app, middleware, options
    add: (app, middleware, options) => {
        // middleware.webpack();
        // middleware.content();
        // console.log('middleware', middleware);
        // console.log('options', options);
        app.use(statics(path.resolve(__dirname, 'dist/assets')));
        app.use(convert(proxy('/', { target: host })));
        app.use(convert(proxy('/api', { target: host })));
        // app.use(async (ctx, next) => {
        //     console.log('ctx.url', ctx.url);
        //     await next();
        // });
        // app.use(state());
        // app.use(html());
    }
};
