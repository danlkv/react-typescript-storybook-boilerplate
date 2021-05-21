var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: process.env.NODE_ENV || "development",
    devServer: {
        disableHostCheck: true,
        writeToDisk: true
    },
    entry: {
        index: path.join(__dirname, "src", "index.tsx"),
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.(css|less)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                exclude: /node_modules/
            }, {
                test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
                loader: "file-loader",
                options: {
                    name: '[path][name].[ext]'
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[id].css'
        }), new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            filename: "index.html",
            chunks: ["index"]
        })
    ]
};

