const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');
const config = merge.smart(baseConfig, {
    devServer: {
        port: '7777',
        publicPath: '/', //'http://localhost:7777',
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        open: true,
        // contentBase: path.resolve(__dirname, '../dist'),
        // 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。
        // before(app) {
        //     app.get('/api/test.json', function (req, res) {
        //         res.json({ code: 200, message: 'hello world' })
        //     })
        // },
        // 静态资源中间件处理之后，比较少用到，可以用于打印日志或者做一些额外处理。
        // after(app) {

        // },
        proxy: {
            '/restapi/': {
                changeOrigin: true,
                secure: false,
                // target: 'http://127.0.0.1:7779/'
                target: 'http://blog.qualc.cn/', // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
                // pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
            }
        },
        hot: true // 开启热更新
    },
    devtool: 'source-map',
    optimization: {
        minimize: false
    },
    plugins: [
        new webpack.DefinePlugin({
            // 开发环境是不是生产
            // PRODUCTION: JSON.stringify(false),
            'process.argv.NODE_ENV': process.env.NODE_ENV || '"develop"'
            // VERSION: JSON.stringify('5fa3b9'),
            // BROWSER_SUPPORTS_HTML5: true,
            // TWO: '1+1',
            // 'typeof window': JSON.stringify('object')
        }),
        new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
        new webpack.HotModuleReplacementPlugin() // Hot Module Replacement 的插件
    ]
});

module.exports = config;
