const paths = require('./paths');
const INPUT_BUNDLES = paths.INPUT_BUNDLES;

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

module.exports = function (callback) {
    let firstBuildReady = false;

    function done(err) {
        firstBuildReady = true;
        if (err) {
            return;
        }
    }

    let options = {
        context: __dirname + INPUT_BUNDLES,
        entry: {
            home: './bundle1',
            // about: './about'
        },
        output: {
            path: __dirname + '/public',
            filename: '[name].js',
            library: '[name]'
        },
        watch: true,
        devtool: "cheap-module-inline-source-map",
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
        .pipe(webpackStream(options, null, done))
        .pipe(gulp.dest('public'))
        .on('data', function () {
            if (firstBuildReady) {
                callback();
            }
        })
};

