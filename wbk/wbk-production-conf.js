const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const indexCss = new ExtractTextPlugin("index/[name].css");
const postcss = require('./plugins/postcss');
const lessLoader = require('./plugins/less-loader');
const sassLoader = require('./plugins/sass-loader');
const cssLoader = require('./plugins/css-loader');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');


module.exports = {
    mode: "production",
    target: "node",
    entry: {
        index: [path.resolve(".", "src/app.js")],
    },
    output: {
        path: path.resolve(".", "dist/"),
        filename: 'index.js',
        libraryTarget: "commonjs2"
        // publicPath: path.resolve(".", "public/assets")
    },
    module: {
        rules: [
            cssLoader,
            lessLoader,
            sassLoader,
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                include:[
                    path.resolve(".", "src/index/"),
                ],
                use: indexCss.extract({
                    fallback: "vue-style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[local]_[hash:base64:8]'
                            }
                        },
                        postcss
                    ],
                })
            }
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    optimization: { // 拆分代码大小
        splitChunks: {
            chunks: 'async',
            minSize: 3000,
            maxSize: 400000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new uglify({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new VueSSRServerPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: "index.html",
        //     template:  path.resolve(".", "src/index/index.html")
        // }),
        indexCss,
        // new webpack.BannerPlugin({
        //     banner: 'hello world'
        // })
    ]
};