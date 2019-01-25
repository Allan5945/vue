const postcss = require('./postcss');

module.exports =  {
    test: /\.css$/,
    use: [
        {
            loader: 'vue-style-loader'
        },
        {
            loader: 'css-loader',
        },
        postcss
    ]
};