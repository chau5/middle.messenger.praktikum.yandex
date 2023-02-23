import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import webpack from 'webpack';

export default {
    mode: 'development',
    entry: './src/index.ts',
    devServer: {
        static: {
            directory: path.join(__dirname, 'static'),
        },
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '~': path.resolve(__dirname, './'),
            process: 'process/browser',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.(?:png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
            { test: /\.hbs/, loader: 'handlebars-loader' },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './static/index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
};
