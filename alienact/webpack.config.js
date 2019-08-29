// cSpell: ignore alienact
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isProd = process.env.npm_lifecycle_event === 'build';
const PORT = 8085;

const config = {
    mode: isProd ? 'production' : 'development',
    entry: [
        path.resolve(__dirname, 'sample/src/App.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.css/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../',
                        hmr: true
                    }
                },
                'css-loader'
            ]
        }, {
            test: /\.less/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../',
                        hmr: true
                    }
                },
                'css-loader',
                'less-loader'
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: 'publick'
                }
            }]
        }, {
            test: /\.ts$/,
            use: [
                {
                    loader: 'babel-loader'
                },
                'ts-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js' ],
        alias: {
            'alienact': path.resolve(__dirname, 'build/alienact-core/alienact-core.esm.js'),
            'alienact-router': path.resolve(__dirname, 'build/alienact-router/alienact-router.esm.js'),
            '@src': path.resolve(__dirname, 'sample/src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './sample/public/index.html'
        })
    ]
};

if (!isProd) {
    config.entry.push(`webpack-dev-server/client?http://localhost:${PORT}/`);
    config.devtool = 'inline-source-map';
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    );
    config.devServer = {
        contentBase: 'dist',
        compress: true,
        port: PORT,
        overlay: true,
        hot: true,
        inline: true,
        open: true,
        historyApiFallback: true
    };
}
else {
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].css'
        })
    );
}

module.exports = config;