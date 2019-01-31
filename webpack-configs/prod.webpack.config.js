const path = require('path');
const paths = require('../paths/config-paths');

module.exports = {
    mode: 'production',
    context: path.join(__dirname, '../', paths.INPUT_BUNDLE),
    entry: {
        bundle: './bundle.ts',
        polyfill: './polyfill.ts',
    },
    output: {
        path: path.join(__dirname + '/' + paths.OUTPUT_DIR),
        filename: '[name].js',
        library: '[name]'
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                transpileOnly: true
            }
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};
