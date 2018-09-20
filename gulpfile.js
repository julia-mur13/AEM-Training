'use strict';

const devWebpackTask = require('./webpack-configs/devWebpack.config');
const prodWebpackTask = require('./webpack-configs/prodWebpack.config');

const paths = require('./paths/config-paths');
const INPUT_BUNDLE = paths.INPUT_BUNDLE;
const OUTPUT_DIR = paths.OUTPUT_DIR;
const BROWSER_SYNC_RELOAD_DELAY = 500;

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const del = require('del');
const minifyCss = require('gulp-clean-css');
const gzip = require('gulp-gzip');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

function styles() {
    return gulp.src(INPUT_BUNDLE + '/*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(browserSync.stream())
        .pipe(gzip())
        .pipe(gulp.dest(OUTPUT_DIR));
}


function clean() {
    return del(OUTPUT_DIR);
}

function browserSyncTask () {
    browserSync.init(null, {
        proxy: "http://localhost:3030",
        files: ["./public/**/*.*"],
        browser: "chrome",
        port: 3000,
    });
}

function nodemonTask(cb) {
    let started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    });
}

function watch() {
    gulp.watch(INPUT_BUNDLE + '/*.less', gulp.series(styles));
    gulp.watch(INPUT_BUNDLE + '/*.js', gulp.series(devWebpackTask));

}

gulp.task('devBuild', gulp.series(clean, gulp.parallel(styles, devWebpackTask)));
gulp.task('prodBuild', gulp.series(clean, gulp.parallel(styles, prodWebpackTask)));

gulp.task('default',
    gulp.series('devBuild', gulp.parallel(watch, browserSyncTask, nodemonTask))
);

gulp.task('prod',
    gulp.series('prodBuild')
);