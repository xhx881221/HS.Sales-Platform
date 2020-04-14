const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const smp = new SpeedMeasurePlugin();

const configs = {
    devtool: 'source-map',
    plugins: [
        new OptimizeCssPlugin(),
        new BundleAnalyzerPlugin()
    ]
}

module.exports = smp.wrap(merge(baseWebpackConfig, configs));