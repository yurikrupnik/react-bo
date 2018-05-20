const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx', '.marko']
    },
    devtool: 'source-map',
    entry: './src/client.jsx',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: '/'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                query: {
                    variable: 'data',
                    interpolate: /\{\{(.+?)\}\}/g,
                    evaluate: /\[\[(.+?)\]\]/g
                }
            },
            {
                test: /\.marko/,
                loader: 'marko-loader',
            }
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' // Specify the common bundle's name.
        // }),
        // new webpack.ProvidePlugin({
        //     _: 'underscore'
        // }),
        // new HtmlWebpackPlugin({
        //     template: 'src/index.marko',
        //     filename: 'index.marko',
        //     title: 'omg',
        //     meta: {
        //         charset: 'UTF-8',
        //         viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        //     },
        //     // minify: {
        //     //     removeComments: true,
        //     //     collapseWhitespace: true,
        //     //     conservativeCollapse: true
        //     // }
        // }),
        // new HtmlWebpackPlugin({
        //     template: 'src/index.ejs',
        //     filename: 'index.ejs',
        //     title: 'omg',
        //     meta: {
        //         charset: 'UTF-8',
        //         viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        //     },
        //     templateParameters: {
        //         data: { name: 'yuri' }
        //     }
        //     // minify: {
        //     //     removeComments: true,
        //     //     collapseWhitespace: true,
        //     //     conservativeCollapse: true
        //     // }
        // }),
        // new CopyWebpackPlugin([
        //     { from: 'src/index.marko' },
        //     // { from: '**/*', to: '/absolute/path/to/dest/' }
        // ]),
        // new HtmlWebpackPlugin({
        //     template: 'src/index.html',
        //     // filename: 'index.ejs',
        //     title: 'html title',
        //     meta: {
        //         charset: 'UTF-8',
        //         viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        //     },
        //     // templateParameters: {
        //     //     data: { name: 'yuri' }
        //     // }
        //     // minify: {
        //     //     removeComments: true,
        //     //     collapseWhitespace: true,
        //     //     conservativeCollapse: true
        //     // }
        // }),
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};
