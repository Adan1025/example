'use strict';

const webpack = require('webpack');
const path = require('path');
const shell = require('shelljs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
const CompressionPlugin = require('compression-webpack-plugin'); //资源文件压缩为.gz文件
const root = path.resolve(__dirname, './') // 项目的根目录绝对路径


shell.rm('-rf', './dist/')
shell.mkdir('-p', './dist/js/common')
shell.cp('-R', './static/js/common/flexible_v2.js', './dist/js/common');

module.exports = {
    devServer: {
        port: '7777',
        publicPath: '/', //'http://localhost:7777',
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        open: true,
        proxy: {
            '/restapi/': {
                changeOrigin: true,
                secure: false,
                target: 'http://127.0.0.1:7779/',
                // target: 'http://blog.qualc.cn/', // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
                // pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
            },
        },
        hot: true// 开启热更新
    },
    target: 'web',
    watch: true,
    context: path.resolve(__dirname + '/static/'),
    entry: {
        index: './js/index.js',
        vue: ['vue', 'vue-router', 'vuex', 'axios'],
        common: ['@common/DOM.js', '@common/CommFunc.js'],
        elementui: 'element-ui'
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].min.js',
        chunkFilename: '[name].chunk.js',
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

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         // 在UglifyJs删除没有用到的代码时不输出警告
        //         warnings: false,
        //     }
        // }),
        // 抽取公共方法
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: '[name].[hash].js',
        //     chunks: ['index', 'common']    // extract commonChunk  from index & common
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vue', 'elementui', 'common'],
            filename: '[name].js'
        }),
        new webpack.DefinePlugin({
            //    // 开发环境是不是生产
            PRODUCTION: JSON.stringify(false),
        }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('develop')
        //     }
        // }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            title: '测试', // 模板参数
            // msg: '这是一个测试参数的测试参数',// 模板参数
            filename: '../index.html', //生成的html存放路径，相对于 output -> path
            template: './template/index.html', //html模板路径, 相对于 output -> path
            inject: 'body'
            // ,hash: true
        }),
        new ExtractTextPlugin('../css/[name].css'),
        // new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            '@views': path.resolve(__dirname, './static/js/views/'),
            '@common': path.resolve(__dirname, './static/js/common/')
            // 'vue$': 'vue/dist/vue.js'
            // 'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        loaders: [{
            test: /\.js$/,
            //include: '', //要处理的目录
            exclude: /node_modules/, //排除不处理的目录
            loader: 'babel-loader',
            query: {
                // .babelrc 存在是   优先.babelrc
                presets: ['es2015'
                    /*['es2015', {
                        "modules": false  //消除unused code
                      }]*/
                ],
                // 解决编译打包后 $export is not a function  异常
                plugins: [
                    ['transform-runtime', {
                        helpers: false,
                        polyfill: false,
                        regenerator: true,
                    }], [
                        "component", {
                            "libraryName": "elementui",
                            "styleLibraryName": "theme-chalk"
                        }
                    ]
                    /*[// 如果你的项目中用到了UI组件库，只加载用到的组件
                               "import", {  //babel-plugin-import
                                    "libraryName": "element-ui",
                                    "style": true
                               }],*/
                ]
            }
        }, {
            test: /\.vue$/,
            exclude: /^node_modules$/, //排除不处理的目录
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
            // use: ExtractTextPlugin.extract({fallback:'style-loader',use:['css-loader']})
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
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
        }]
    }
};


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}