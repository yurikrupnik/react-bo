const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({
                analyzerMode: 'disabled',
                statsFilename: 'stats.json',
                generateStatsFile: true
            })
        ]
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    entry: './client.jsx',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: '/'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'], // 'eslint-loader'
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?modules=true', 'sass-loader'
                ],
            },
            {
                test: /\.ejs$/,
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            filename: 'index.ejs',
            title: 'omg',
            meta: {
                charset: 'UTF-8',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     conservativeCollapse: true
            // }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
        // isDev ? new BundleAnalyzerPlugin({
        //     // openAnalyzer: false,
        //     // analyzerMode: 'static',
        //     // generateStatsFile: true,
        //     // statsFilename: 'some-stats.json'
        // }) : () => {}
    ]
};
