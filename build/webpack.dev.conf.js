const merge = require('webpack-merge');
const webpack = require('webpack');
const mockerAPI = require('mocker-api');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');

const configs = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        open: true,
        hot: true,
        port: "3000",
        overlay: true,
        clientLogLevel: "silent",
        before(app) {
            mockerAPI(app, path.resolve(__dirname, '../mock/mocker.js'))
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseWebpackConfig, configs);