'use strict';

const webpack = require("webpack");
const path = require("path");
const shell = require('shelljs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const root = path.resolve(__dirname, './') // 项目的根目录绝对路径
const OUTPUT_DIR = 'dist';

shell.rm('-rf', './dist/')
shell.mkdir('-p', './dist/js/common')
shell.cp('-R', './static/js/common/flexible_v2.js', './dist/js/common');
shell.cp('-R', './static/sw.js', './dist');
shell.cp('-R', './static/manifest.json', './dist');

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname + "/static/js/"),
    entry: {
        index: "./index.js",
        vue: ['vue', 'vue-router', 'axios'],
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "[name].min.js",
        publicPath: '/js/' // 设置引用路径 如ttf等文件
    },
    plugins: [
        // 抽取公共方法
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vue'],
            filename: '[name].js'
        }),
        new webpack.DefinePlugin({
            // 开发环境是不是生产
            'process.NODE_ENV': process.env.NODE_ENV || 'develop',
            // VERSION: JSON.stringify("5fa3b9"),
            // BROWSER_SUPPORTS_HTML5: true,
            // TWO: "1+1",
            // "typeof window": JSON.stringify("object")
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                console.log('###########')
                console.log(getPath('../css/[name].css'))
                console.log(getPath('../css/[name].css').replace('js/../css', 'css'))
                return getPath('../css/[name].css').replace('js/../css', 'css');
            },
            allChunks: true
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            title: '天冰博客',// 模板参数
            // msg: '这是一个测试参数的测试参数',// 模板参数
            filename: '../index.html', //生成的html存放路径，相对于 output -> path
            template: '../template/index.html', //html模板路径, 相对于 output -> path
            inject: 'body',
            // hash: true
        }),
        // new SWPrecacheWebpackPlugin({
        //     cacheId: 'TBBlog',
        //     filename: '../sw.js',
        //     // filepath: '', //webpack.output +filename,会覆盖filename
        //     // 设置预缓存列表中文件的最大允许大小。
        //     maximumFileSizeToCacheInBytes: 4194304,
        //     // minify: true,
        //     // handleFetch: false, //默认true， 开发的时候设置false确保实时重新加载等功能有效，以免内容始终从缓存中读取
        //     stripPrefix: OUTPUT_DIR,
        //     // 配置缓存静态文件文件
        //     staticFileGlobs:[
        //         `${OUTPUT_DIR}/images/**.*`,
        //         `${OUTPUT_DIR}/css/**.css`,
        //         `${OUTPUT_DIR}/js/**/*.js`
        //     ],
        //     // 使用sw-toolbox 指定的缓存策略配置
        //     runtimeCaching: [{
        //         handler: 'cacheFirst', //先请求缓存，不行再请求网络
        //         urlPattern: /\/restapi\/users\/.*/,
        //         options:{
        //             cache: {
        //                 name: 'users-all-cacle',
        //                 maxEntries: 10,
        //                 maxAgeSeconds:  60 * 60 * 24//1天后过期
        //             }
        //         }
        //     },
        //     // {
        //     //     handler: 'networkFirst',// 先请求网络，不行再请求缓存
        //     //     urlPattern: /\/restapi\/article\/info\/.*/
        //     // },
        //     {
        //         handler: 'networkFirst',// 先请求网络，不行再请求缓存
        //         urlPattern: /\/restapi\/article\/.*/,
        //         options:{
        //             // debug: true,
        //             cache: {
        //                 name: 'article-all-cacle',
        //                 maxEntries: 10,
        //                 maxAgeSeconds:  60 * 60 //1小时候过期
        //             }
        //         }
        //         // handler: {
        //         //  --- 属于sw-toolbox的Handlers， 共五项
        //         //      cacheOnly   只请求缓存，此选项适用于需要确保不会发出网络请求的情况
        //         //      networkOnly 只请求网络，
        //         //      fastest     并行请求缓存和网络中的资源。先回应哪个回报
        //         //      cacheFirst   //先请求缓存，不行再请求网络
        //         //      networkFirst 先请求网络，不行再请求缓存
        //         // }
        //     }],
        //   }
        // )
    ],
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                //include: '', //要处理的目录
                exclude: /^node_modules$/,//排除不处理的目录
                loader: 'babel-loader',
                query: {
                    // .babelrc 存在是   优先.babelrc
                    presets: ['env'],
                    // 解决编译打包后 $export is not a function  异常
                    plugins: [
                        [
                            'transform-runtime',
                            {
                                helpers: false,
                                polyfill: false,
                                regenerator: true
                            }
                        ]
                    ]
                }
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