const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const { host } = require('./src/config');
module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader',
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
    add: (app, middleware, options) => {
        app.use(convert(proxy('/api', { target: host })));
    }
};
