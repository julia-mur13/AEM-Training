const paths = require('../paths/config-paths');
const INPUT_JS = paths.INPUT_JS;
const OUTPUT_DIR = paths.OUTPUT_DIR;

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

module.exports = function (callback) {
    let firstBuildReady = false;

    let options = {
        context: __dirname + '/../src/components/design1.0/bundle-content',
        entry: {
            bundle: './bundle',
            // about: './about'
        },
        output: {
            path: __dirname + '/' + OUTPUT_DIR,
            filename: '[name].js',
            library: '[name]'
        },
        // watch: true,
        devtool: "cheap-module-inline-source-map",
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }]
        },
    };
    return gulp.src(INPUT_JS)
        .pipe(named())
        .pipe(webpackStream(options))
        .pipe(gulp.dest(OUTPUT_DIR))
        .on('data', function () {
            if (firstBuildReady) {
                callback();
            }
        })
};

