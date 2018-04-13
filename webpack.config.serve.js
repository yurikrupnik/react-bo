const path = require('path');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { host } = require('./src/config');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
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
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader', // compiles Sass to CSS
                    options: {
                        // includePaths: ["absolute/path/a", "absolute/path/b"]
                    }
                }]
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
