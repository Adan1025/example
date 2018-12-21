'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
// const SpritesmithPlugin = require('webpack-spritesmith'); // css Sprites
const shell = require('shelljs');

shell.rm('-rf', './dist/');
shell.mkdir('-p', './dist/js/common');
shell.cp('-R', './src/js/common/flexible_v2.js', './dist/js/common');

const root = path.resolve(__dirname, '../'); // 项目的根目录绝对路径
module.exports = {
    watch: true,
    context: root,
    entry: {
        // index: './src/js/index.js'
        index: './src/js/index.js',
        vue: ['vue', 'vue-router', 'vuex', 'axios'],
        common: ['@common/DOM.js', '@common/CommFunc.js'],
        elementui: 'element-ui'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].min.js',
        publicPath: '/',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new VueLoaderPlugin(),
        // 生成html页面的插件
        new HtmlWebpackPlugin({
            //根据模板插入css/js等生成最终HTML
            title: '测试', // 模板参数
            // msg: '这是一个测试参数的测试参数',// 模板参数
            filename: './index.html', //生成的html存放路径，相对于 output -> path
            template: './src/template/index.html', //html模板路径, 相对于 output -> path
            inject: 'body',
            hash: true,
            minify: {
                minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
                minifyJS: true // 压缩 HTML 中出现的 JS 代码
            }
        })
    ],
    // 抽取公共模块的插件
    optimization: {
        // minimize: env === 'production' ? true : false, //是否进行代码压缩
        splitChunks: {
            chunks: 'async',
            minSize: 30000, //模块大于30k会被抽离到公共模块
            minChunks: 1, //模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.css'],
        modules: ['node_modules'],
        alias: {
            vue$: 'vue/dist/vue.common.js',
            '@': path.resolve(root, 'src'),
            '@views': path.resolve(root, 'src/js/views/'),
            '@common': path.resolve(root, 'src/js/common/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                //include: '', //要处理的目录
                exclude: /^node_modules$/, //排除不处理的目录
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
            },
            {
                test: /\.vue$/,
                exclude: /^node_modules$/, //排除不处理的目录
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                // 压缩 jpeg 的配置
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                                enabled: false
                            },
                            pngquant: {
                                // 使用 imagemin-pngquant 压缩 png
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                // 压缩 gif 的配置
                                interlaced: false
                            },
                            webp: {
                                // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css/,
                // include: [path.resolve(root, 'src')],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true // 使用 css 的压缩功能
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['css-loader', 'sass-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'incofont/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    }
};
