const path = require('path');
const paths = require('../paths/config-paths');

//TS PLUGINS
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
    mode: 'development',
    context: path.join(__dirname, '../', paths.INPUT_BUNDLE),
    devtool: 'inline-source-map',
    entry: {
        bundle: './bundle.ts',
        polyfill: './polyfill.ts',
    },
    output: {
        path: path.join(__dirname, '/', paths.OUTPUT_DIR),
        filename: '[name].js',
        library: '[name]'
    },

    module: {
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                transpileOnly: true,
                configFile: path.join(__dirname, paths.TS_CONFIG)
            }
        }]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.join(__dirname, paths.TS_CONFIG)
        }),
        new TSLintPlugin({
            files: [paths.INPUT_BUNDLE + '/*.ts'],
            format: 'codeFrame'
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};

