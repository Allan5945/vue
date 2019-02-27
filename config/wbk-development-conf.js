const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: path.resolve(".", "src/entry-client.js"),
    devtool: '#eval-source-map',
    output: {
        path: path.resolve(".", "dist/"),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: true }
                    },
                    'sass-loader'
                ]
            },
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
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ],
    },
    devServer: {
        inline: true,
        hot: true,
        port:80,
        open: true,
        // proxy: {
        //     '**': {
        //         target: 'http://localhost',
        //         changeOrigin: true,
        //         secure: false,
        //
        //     }
        // }
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
