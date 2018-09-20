const paths = require('./paths');
const INPUT_JS = paths.INPUT_JS;
const OUTPUT_DIR = paths.OUTPUT_DIR;

const gulp = require('gulp');
const gzip = require('gulp-gzip');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

module.exports = function () {
    let options = {
        context: __dirname + '/src/components/design1.0/bundles',
        entry: {
            home: './home',
            about: './about'
        },
        output: {
            path: __dirname + '/' + OUTPUT_DIR,
            filename: '[name].js',
            library: '[name]'
        },
        watch: false,
        devtool: false,
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
        .pipe(gulp.dest('public/js'))
        .pipe(gzip())
        .pipe(gulp.dest('public/js'))
};

