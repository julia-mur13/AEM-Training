'use strict';

const devWebpackTask = require('./devWebpack.config');
const prodWebpackTask = require('./prodWebpack.config');

const paths = require('./paths');
const INPUT_BUNDLES = paths.INPUT_BUNDLES;
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
    return gulp.src(INPUT_BUNDLES + '/*.less')
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

function browsersync () {
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
    gulp.watch(INPUT_BUNDLES + '/*.*', gulp.series(styles));
}

gulp.task('devBuild', gulp.series(clean, gulp.parallel(styles, devWebpackTask)));
gulp.task('prodBuild', gulp.series(clean, gulp.parallel(styles, prodWebpackTask)));

gulp.task('default',
    gulp.series('devBuild', gulp.parallel(watch, browsersync, nodemonTask))
);

gulp.task('prod',
    gulp.series('prodBuild')
);