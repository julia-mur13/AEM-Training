'use strict';

const devWebpackTask = require( './devWebpack.config');
const prodWebpackTask = require( './prodWebpack.config');

const paths = require('./paths');
const INPUT_DIRS = paths.INPUT_DIRS;

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const del = require('del');
const minifyCss = require('gulp-clean-css');
const gzip = require('gulp-gzip');
const browserSync = require('browser-sync').create();

function styles() {
    return gulp.src(INPUT_DIRS + '/*.less')
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

function html() {
    return gulp.src(INPUT_DIRS + '/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
        .pipe(gzip())
        .pipe(gulp.dest('public'));
}

function serve() {
    browserSync.init({
        server: 'public'
    });
}

function watch() {
    gulp.watch(INPUT_DIRS + '/*.*', gulp.series(styles));
    gulp.watch(INPUT_DIRS + '/*.*', gulp.series(html));
}

gulp.task('devBuild', gulp.series(clean, gulp.parallel(styles, devWebpackTask), html));
gulp.task('prodBuild', gulp.series(clean, gulp.parallel(styles, prodWebpackTask), html));

gulp.task('default',
    gulp.series('devBuild', gulp.parallel(watch, serve))
);
gulp.task('prod',
    gulp.series('prodBuild', serve)
);