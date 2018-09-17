const paths = require('./paths');
const INPUT_JS_FILES = paths.INPUT_JS_FILES;

const gulp = require('gulp');
const gzip = require('gulp-gzip');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

module.exports = function () {
    let options = {
        context: __dirname + INPUT_JS_FILES,
        entry: {
            home: './home',
            about: './about'
        },
        output: {
            path: __dirname + '/public/js',
            filename: '[name].js',
            library: '[name]'
        },
        watch: false,
        devtool: false,
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }]
        },

    };
    return gulp.src(INPUT_JS_FILES + '/*.js')
        .pipe(named())
        .pipe(webpackStream(options))
        .pipe(gulp.dest('public/js'))
        .pipe(gzip())
        .pipe(gulp.dest('public/js'))
};

