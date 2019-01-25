const postcss = require('./postcss');

module.exports =    {
    test: /\.less$/,
    use: [{
        loader: "style-loader" // 将 JS 字符串生成为 style 节点
    }, {
        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
    }, {
        loader: "less-loader" // 将 Sass 编译成 CSS
    },
        postcss
    ]
};