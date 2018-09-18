const paths = require('./paths');
const INPUT_BUNDLES = paths.INPUT_BUNDLES;

const gulp = require('gulp');
const gzip = require('gulp-gzip');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

module.exports = function () {
    let options = {
        context: __dirname + INPUT_BUNDLES,
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
                test: /\.js/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }]
        },

    };
    return gulp.src(INPUT_BUNDLES + '/*.js')
        .pipe(named())
        .pipe(webpackStream(options))
        .pipe(gulp.dest('public/js'))
        .pipe(gzip())
        .pipe(gulp.dest('public/js'))
};

