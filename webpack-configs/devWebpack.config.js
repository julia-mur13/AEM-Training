const path = require('path');
const paths = require('../paths/config-paths');
const INPUT_JS = paths.INPUT_JS;
const OUTPUT_DIR = paths.OUTPUT_DIR;
const CONTEXT_PATH = path.join(__dirname, '/../src/components/bundle-content');

const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

module.exports = function () {
  let options = {
    mode: 'development',
    context: CONTEXT_PATH,
    entry: {
      bundle: './bundle.ts',
      // about: './about'
    },
    watch: false,
    resolve: {
      extensions: ['.ts', '.js']
    },
    output: {
      path: path.join(__dirname, '/', OUTPUT_DIR),
      filename: '[name].js',
      library: '[name]'
    },
    devtool: 'cheap-module-inline-source-map',
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }]
    },
  };
  return gulp.src(INPUT_JS)
    .pipe(named())
    .pipe(webpackStream(options))
    .pipe(gulp.dest(OUTPUT_DIR))
};

