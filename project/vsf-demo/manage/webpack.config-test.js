'use strict';

const webpack = require('webpack');
const path = require('path');
const shell = require('shelljs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
const CompressionPlugin = require('compression-webpack-plugin');//资源文件压缩为.gz文件
const root = path.resolve(__dirname, './') // 项目的根目录绝对路径


shell.rm('-rf', './dist/')
shell.mkdir('-p', './dist/js/common')
shell.cp('-R', './static/js/common/flexible_v2.js', './dist/js/common');


module.exports = {
    watch: true,
    context: path.resolve(__dirname + '/static/js/'),
    entry: {
        index: './index.js',
        vue:['vue', 'vue-router', 'vuex','axios'],
        elementui:'element-ui'
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].min.js',
        publicPath: '/js/' // 设置引用路径 如ttf等文件
    },
    plugins: [

        // 该插件能够将资源文件压缩为.gz文件，并且根据客户端的需求按需加载。
        // compression-webpack-plugin
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0
        }),

        /*new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                // drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),*/
        // 抽取公共方法
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: '[name].[hash].js',
        //     chunks: ['index', 'common']    // extract commonChunk  from index & common
        // }),
        new webpack.optimize.CommonsChunkPlugin({name:['vue','elementui'],filename: '[name].[hash].js'}),
        new webpack.DefinePlugin({
         //    // 开发环境是不是生产
            PRODUCTION: JSON.stringify(true),
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            title: '测试',// 模板参数
            // msg: '这是一个测试参数的测试参数',// 模板参数
            filename: '../index.html', //生成的html存放路径，相对于 output -> path
            template: '../template/index.html', //html模板路径, 相对于 output -> path
            inject: 'body'
            // ,hash: true
        }),
        new ExtractTextPlugin('../css/[name].css'),
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
                exclude: /node_modules/,//排除不处理的目录
                loader: 'babel-loader',
                query:{
                    // .babelrc 存在是   优先.babelrc
                    presets:['es2015'/*['es2015', {
                        "modules": false  //消除unused code
                      }]*/],
                    // 解决编译打包后 $export is not a function  异常
                    plugins: [['transform-runtime', {
                              helpers: false,
                              polyfill: false,
                              regenerator: true, }],
                              /*[// 如果你的项目中用到了UI组件库，只加载用到的组件
                               "import", {  //babel-plugin-import
                                    "libraryName": "element-ui",
                                    "style": true
                               }],*/
                    ]
                }
            },{
                test: /\.vue$/,
                exclude: /^node_modules$/,//排除不处理的目录
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'})
                // use: ExtractTextPlugin.extract({fallback:'style-loader',use:['css-loader']})
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallback:'style-loader',use:['css-loader', 'sass-loader']})
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