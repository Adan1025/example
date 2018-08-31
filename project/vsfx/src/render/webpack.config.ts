'use strict';

const webpack = require("webpack");
const path = require("path");
// const shell = require('shelljs')
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const root = path.resolve(__dirname, './') // 项目的根目录绝对路径
// const OUTPUT_DIR = 'dist';

module.exports = {
    context: path.resolve(__dirname + "/"),
    entry: {
        index: "./build.js",
        vue: ['vue', 'vue-router', 'axios'],
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "index.min.js",
        publicPath: '/js/' // 设置引用路径 如ttf等文件
    },
    plugins: [
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            title: '天冰博客',// 模板参数
            // msg: '这是一个测试参数的测试参数',// 模板参数
            filename: '../a.html', //生成的html存放路径，相对于 output -> path
            template: './test.html',
            inject: 'body'
            // hash: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
            }
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                //include: '', //要处理的目录
                exclude: /^node_modules$/,//排除不处理的目录
                loader: 'babel-loader',
            }, {
                test: /\.vue$/,
                exclude: /^node_modules$/,//排除不处理的目录
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" }),
                            scss: ExtractTextPlugin.extract({ fallback: "style-loader", use: ["css-loader", "sass-loader"] })
                        }
                    }
                }]
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
                // use: ExtractTextPlugin.extract({fallback:"style-loader",use:["css-loader"]})
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: ["css-loader", "sass-loader"] })
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '../incofont/[name].[hash:8].[ext]'
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 8192,
                    // name: '../images/[name].[hash:8].[ext]'
                    name: '../images/[name].[ext]'
                }
            }
        ]
    }
};