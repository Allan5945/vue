const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const uglify = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const indexCss = new ExtractTextPlugin("index/[name].css");
const postcss = require('./plugins/postcss');
const lessLoader = require('./plugins/less-loader');
const sassLoader = require('./plugins/sass-loader');
const cssLoader = require('./plugins/css-loader');

module.exports = {
    // 将 entry 指向应用程序的 server entry 文件
    entry: path.resolve(".", "src/entry-client.js"),

    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',

    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',

    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(".", "dist/"),
    },
    module: {
        rules: [
            lessLoader,
            sassLoader,
            cssLoader,
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
    optimization: { // 拆分代码大小
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
        new VueSSRClientPlugin(),
        new VueLoaderPlugin(),
        indexCss,
    ]
}