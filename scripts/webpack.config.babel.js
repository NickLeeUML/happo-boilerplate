import path from 'path'
import webpack from 'webpack'
import getPort from 'get-port'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import minimist from 'minimist'
import Autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import pkg from '../package.json'
const argv = minimist(process.argv.slice(2))
const debug = (argv.debug === true)?true:false

const babelLoaderOptions = {
    compact: false,
    babelrc: true,
}

const plugins = [
    new HtmlWebpackPlugin({
        template: './scripts/template.js',
        filename: 'index.html',
        inject: true,
    }),
    new ExtractTextPlugin({
        filename: `[name].css`,
        allChunks: true,
    }),
]

export default {
    entry: {
        'main': './src/index.js',
    },
    output: {
        path: path.resolve(`./build/`),
        filename: `[name].js`,
        publicPath: '',
        chunkFilename: `[name].js`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelLoaderOptions,
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'file-[name]-[hash].[ext]',
                        },
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '',
                    use: [
                        {
                            loader:'css-loader',
                            options:{
                                modules: false,
                                url: true,
                                importLoaders: 2,
                                minimize: debug?false:true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([
                                    Autoprefixer,
                                ])
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                paths: [
                                    path.resolve(process.cwd(), './src'),
                                ],
                                plugins: []
                            }
                        }
                    ]
                })
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css', '.less'],
        alias: {
            src: path.resolve(process.cwd(), './src'),
        },
    },
    stats: {
        children: false,
    },
    plugins,
}
