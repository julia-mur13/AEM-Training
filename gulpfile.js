'use strict';

const devWebpackTask = require('./devWebpack.config');
const prodWebpackTask = require('./prodWebpack.config');

const paths = require('./paths');
const INPUT_BUNDLES = paths.INPUT_BUNDLES,
    BROWSER_SYNC_RELOAD_DELAY = 500;

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
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
        .pipe(gzip())
        .pipe(gulp.dest('public'));
}


function clean() {
    return del('public');
}

function browsersync () {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["./public/**/*.*"],
        browser: "chrome",
        port: 7000,
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

gulp.task('devBuild', gulp.series(clean, gulp.parallel(styles)));
gulp.task('prodBuild', gulp.series(clean, gulp.parallel(styles, prodWebpackTask)));

gulp.task('default',
    gulp.series('devBuild', gulp.parallel(watch, browsersync, nodemonTask))
);

gulp.task('prod',
    gulp.series('prodBuild')
);