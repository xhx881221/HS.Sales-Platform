const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');

const configs = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        port: "3000",
        overlay: true,
        clientLogLevel: "silent"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseWebpackConfig, configs);