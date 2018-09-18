'use strict';

const devWebpackTask = require('./devWebpack.config');
const prodWebpackTask = require('./prodWebpack.config');

const paths = require('./paths');
const INPUT_BUNDLES = paths.INPUT_BUNDLES;

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

// function html() {
//     return gulp.src(INPUT_BUNDLES + '/*.html')
//         .pipe(gulp.dest('public'))
//         .pipe(browserSync.stream())
//         .pipe(gzip())
//         .pipe(gulp.dest('public'));
// }
//
// function imgs() {
//     return gulp.src(INPUT_BUNDLES + '/*.png')
//         .pipe(gulp.dest('public'))
// }

function serve() {
    nodemon({
        script: 'server.js',
        browser: "chrome"
    })
        .on('restart', function () {
            console.log('restarted!')
        });
}


function watch() {
    gulp.watch(INPUT_BUNDLES + '/*.*', gulp.series(styles));
    // gulp.watch(INPUT_BUNDLES + '/*.*', gulp.series(html));
}

gulp.task('devBuild', gulp.series(clean, gulp.parallel(styles)));
gulp.task('prodBuild', gulp.series(clean, gulp.parallel(styles, prodWebpackTask)));

gulp.task('default',
    gulp.series('devBuild', gulp.parallel(watch))
);
gulp.task('prod',
    gulp.series('prodBuild')
);