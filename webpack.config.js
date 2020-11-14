const { join } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: join(__dirname, 'dist'),
        filename: 'index.js'
    },
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'src/index.html',
            inject: 'body'
        })
    ]
};