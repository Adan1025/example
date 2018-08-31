const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css单独打包
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
    optimization:{
        minimize: true,
    },
    module: {
    }
})

config.plugins.push(
    new MiniCssExtractPlugin('../css/[name].css'))

module.exports = config