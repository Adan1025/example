'use strict';

const webpack = require("webpack");
const path = require("path");
const shell = require('shelljs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
const root = path.resolve(__dirname, './') // 项目的根目录绝对路径


shell.rm('-rf', './dist/')
shell.mkdir('-p', './dist/js/common')
shell.cp('-R', './static/js/common/flexible_v2.js', './dist/js/common');


module.exports = {
    context: path.resolve(__dirname + "/static/js/"),
    entry: {
        index: "./index.js"
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "[name].min.js",
        publicPath: '/js/' // 设置引用路径 如ttf等文件
    },
    plugins: [
        // 抽取公共方法
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "commons",
        //     filename: "commons.min.js",
        //     minChunks: 2,
        // }),
        new webpack.DefinePlugin({
            // 开发环境是不是生产
            PRODUCTION: JSON.stringify(false),
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            title: '测试',// 模板参数
            // msg: '这是一个测试参数的测试参数',// 模板参数
            filename: '../index.html', //生成的html存放路径，相对于 output -> path
            template: '../template/index.html', //html模板路径, 相对于 output -> path
            inject: 'body',
            hash: true
        }),
        new ExtractTextPlugin('../css/[name].css'),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                //include: '', //要处理的目录
                exclude: /^node_modules$/,//排除不处理的目录
                loader: 'babel-loader',
                query:{
                    // .babelrc 存在是   优先.babelrc
                    presets:['es2015'],
                    // 解决编译打包后 $export is not a function  异常
                    plugins: [['transform-runtime', {
                              helpers: false,
                              polyfill: false,
                              regenerator: true, }],
                    ]
                }
            },{
                test: /\.vue$/,
                exclude: /^node_modules$/,//排除不处理的目录
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback:"style-loader",use:"css-loader"})
                // use: ExtractTextPlugin.extract({fallback:"style-loader",use:["css-loader"]})
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '../incofont/[name].[hash:8].[ext]'
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    limit: 8192,
                    name: '../images/[name].[hash:8].[ext]'
                }
            }
        ]
    }
};