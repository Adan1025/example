'use strict';

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css单独打包
// const SpritesmithPlugin = require('webpack-spritesmith'); // css Sprites

const root = path.resolve(__dirname, '../') // 项目的根目录绝对路径
module.exports = {
    // watch: true,
    // context: path.join(root, "/src/js/"),
    context: root,
    entry: {
        index: './src/index.jsx',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].min.js",
        publicPath: '/',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
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
        }),
        // new SpritesmithPlugin({
        //     src: {
        //         cwd: path.resolve(__dirname, '../src/ico'), //图片所在地，
        //         glob: '*png' // 匹配图片所在的路径
        //     },
        //     target: {
        //         // 生成最终图片的路径
        //         image: path.resolve(__dirname, '../src/spritesmith-generated/sprite.png').replace(/\\/g, '/'),
        //         // 生成所需 SASS/LESS/Stylus mixins 代码，我们使用 Stylus 预处理器做例子
        //         css: path.resolve(__dirname, '../src/spritesmith-generated/sprite.scss').replace(/\\/g, '/'),
        //     },
        //     apiOtions: {
        //         cssImageRef: '~sprite.png'
        //     }
        // }),
    ],
    optimization: {
        // minimize: env === 'production' ? true : false, //是否进行代码压缩
        splitChunks: {
            chunks: "async",
            minSize: 30000, //模块大于30k会被抽离到公共模块
            minChunks: 1, //模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        modules: [
            'node_modules',
            // 'spritesmith-generated', // webpack-spritesmith 生成所需文件的目录
        ],
        alias: {
            Style: path.resolve(__dirname, '../src/scss'),
            Img: path.resolve(__dirname, '../src/images'),
            "@": path.resolve(__dirname, '../src/js/common')
        }
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    module: {
        rules: [
            // {
            //     test: /\.tsx?$/,
            //     loader: "awesome-typescript-loader"
            // }, 
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.jsx?/,
                include: [
                    path.resolve(root, "./src/")
                ],
                use: 'babel-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    },
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: { // 压缩 jpeg 的配置
                            progressive: true,
                            quality: 65
                        },
                        optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                            enabled: false,
                        },
                        pngquant: { // 使用 imagemin-pngquant 压缩 png
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: { // 压缩 gif 的配置
                            interlaced: false,
                        },
                        webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                            quality: 75
                        }
                    }
                }
                ]
            }, {
                test: /\.css/,
                include: [
                    path.resolve(root, 'src'),
                ],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true, // 使用 css 的压缩功能
                        },
                    },
                ],
            }, {
                test: /\.scss/,
                include: [
                    path.resolve(root, 'src'),
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'incofont/[name].[hash:8].[ext]'
                    }
                }]
            }]
    }
}