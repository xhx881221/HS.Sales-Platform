const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const configs = {
    devtool: 'source-map',
    plugins: [
        new OptimizeCssPlugin()
    ]
}

module.exports = merge(baseWebpackConfig, configs);