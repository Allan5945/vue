const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const lessLoader = require('./plugins/less-loader');
const sassLoader = require('./plugins/sass-loader');
const cssLoader = require('./plugins/css-loader');





module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(".", "src/entry-client.js")
    },
    output: {
        path: path.resolve(".", "dist/"),
        filename: 'index.js',
    },
    module: {
        rules: [
            lessLoader,
            sassLoader,
            cssLoader,
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // hotReload: true // 关闭热重载
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        inline: true,
        hot: true,
        port:8080,
        open: true,
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template:  path.resolve(".", "src/index.template.html")
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}


