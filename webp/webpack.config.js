const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



/**
 * - enry-points
 * - output
 * - loaders
 * - plugins
 * - code-split
 */
module.exports = {
    entry: {
        main: resolve(__dirname, 'src', 'index-react.js'),
    },
    output: {
        path: resolve(__dirname, './dist'),
        filename: `[name].bundle.js`
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '-',
            template: resolve(__dirname, 'src', 'template.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, './dista'),
    },
}