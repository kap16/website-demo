const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
var configs = require('./src/config');

var BUILD_DIR = path.join(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

config = {
    devServer:{
        inline: true,
        contentBase: APP_DIR,
        compress: true,
        port: 4050,
        open: true
    },
    entry: APP_DIR + '/client.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve:{
        modules: ['node_modules','src'],
        extensions: ['.js']
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({template: 'src/index.html'}),
        new webpack.LoaderOptionsPlugin({
            options:{
                port: 4050
            }
        })
    ],
    module : {
        rules : [
            {
                test : /\.jsx?/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'babel-loader']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, 
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            }, 
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use:[{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/', // used for copying
                            publicPath: 'img/', // used to update html to the correct path
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:[{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'src/index.html')
            }
        ]
    }
};

module.exports = config; 