const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

const configs = {
    mode: isDev ? 'development' : 'production',
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: '[name].[hash:6].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isDev ? 
                    {
                        loader: 'vue-style-loader',
                        options: {
                            publicPath: '../'
                        }
                    } : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, '../node_modules/element-ui/lib/theme-chalk'),
                    path.resolve(__dirname, '../src')
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        "corejs": 3
                                    }
                                ]
                            ],
                            cacheDirectory: true
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../mock')
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            esModule: false,
                            fallback: 'file-loader',
                            outputPath: 'img'
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, '../src/assets/images')
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            esModule: false,
                            fallback: 'file-loader',
                            outputPath: 'fonts'
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname, '../node_modules/element-ui/lib/theme-chalk/fonts')
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                include: [
                    path.resolve(__dirname, '../src')
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: false,
            }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: 1,
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 100,
                    minChunks: 1
                },
                common: {
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100,
                    minChunks: 3
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
}

module.exports = configs;