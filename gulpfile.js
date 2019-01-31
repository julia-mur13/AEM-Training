const fs = require('fs');
const path = require('path');
const paths = require('./paths/config-paths');

const gulp = require('gulp');

const webpackStream = require('webpack-stream');
const prodConfig = require('./webpack-configs/prod.webpack.config.js');
const devConfig = require('./webpack-configs/dev.webpack.config.js');

// STYLES
const less = require('gulp-less');
const postcss = require('gulp-postcss');

// POSTCSS PLUGINS
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// UTILS
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const aemsync = require('aemsync');

// DEV ENV
const nodemon = require('gulp-nodemon');
const named = require('vinyl-named');
// const tslint = require("gulp-tslint");


// CHECK IF CURRENT ENV AEM
const isAEM = (() => {
    try {
        const AEM_PATH = paths.OUTPUT_DIR_AEM;
        return fs.existsSync(AEM_PATH);
    } catch (e) {
        return false;
    }
})();
console.log(`ENV: ${isAEM ? 'AEM, LOCAL' : 'LOCAL'}`);

///////////////////////////

function _clean(dir) {
    return function cleanPath() {
        return gulp.src(path.join(dir, '*.*'), { read: false }).pipe(clean({ force: true }));
    }
}

const _cleanTasks = [_clean(paths.OUTPUT_DIR)];
if (isAEM) {
    _cleanTasks.push(_clean(paths.OUTPUT_DIR_AEM));
}
const cleanTask = gulp.series.apply(gulp, _cleanTasks);

/**
 * @return gulp pipe with css
 * */
function buildLessStream(attachSourcemaps = true) {
    const css = gulp.src(paths.INPUT_BUNDLE + '*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    'last 1 version',
                    'not ie <= 11'
                ]
            }),
            cssnano()
        ]));
    return attachSourcemaps ? css.pipe(sourcemaps.write()) : css;
}

/**
 * @return gulp pipe with js
 * */
function buildWebpackStream(mode = 'dev') {
    return gulp.src(path.join(paths.INPUT_BUNDLE, '*.ts'))
        .pipe(named())
        // TODO: optimize to bypass initialization & loading of dev 'plugins' (like TSChecker and etc.)
        .pipe(webpackStream(mode === 'dev' ? devConfig : prodConfig));
}

function target(stream) {
    stream = stream.pipe(gulp.dest(paths.OUTPUT_DIR));
    if (isAEM) {
        stream = stream.pipe(gulp.dest(paths.OUTPUT_DIR_AEM));
    }
    return stream;
}

const buildLess = () => target(buildLessStream());
const buildWebpack = () => target(buildWebpackStream());

function attachJCRIdentifier() {
    return gulp.src('aem-build/.content.xml')
        .pipe(gulp.dest(paths.OUTPUT_DIR_AEM));
}

function serveTask() {
    const browserSync = require('browser-sync').create();

    browserSync.init(null, {
        proxy: `http://localhost:${paths.PORT}`,
        browser: 'chrome',
        port: 8000,
    });

    nodemon({
        script: 'server.js',
        // ext: 'js hbs'
    }).on('restart', function onRestart() {
        console.log('restarted!')
    });

    gulp.watch(['./src/bundles/*.ts', './src/components/**/' + '*.ts'], { usePolling: true }, function rebuildTS() {
        return buildWebpack().pipe(browserSync.stream());
    });
    gulp.watch(['src/bundles/*.less', 'src/components/**/' + '*.less'], { usePolling: true }, function rebuildLESS() {
        return buildLess().pipe(browserSync.stream());
    });
}


// GULP tasks declaration
gulp.task('clean', cleanTask);

gulp.task('build-ts', () => buildWebpack());
gulp.task('build-less', () => buildLess());

function aemsyncWatch() {
    const workingDirs = paths.AEMSYNC_PATHS;
    const onPushEnd = (err, host) => {
        if (err) {
            return console.log(`Error when pushing package to ${host}.`, err)
        }
        console.log(`Package pushed to ${host}.`)
    };
    workingDirs.forEach(function (dir) {
        aemsync({
            workingDir: dir,
            targets: paths.AEMSYNC_TARGETS,
            onPushEnd: onPushEnd
        });
    });
}

gulp.task('aemsync', aemsyncWatch);

gulp.task('serve', serveTask);
gulp.task('devBuild', gulp.series('clean', gulp.parallel('build-less', 'build-ts'), 'serve'));

gulp.task('prod', gulp.parallel(
    () => buildLessStream().pipe(gulp.dest(paths.OUTPUT_DIR_AEM)),
    () => buildWebpackStream().pipe(gulp.dest(paths.OUTPUT_DIR_AEM)),
    () => attachJCRIdentifier()
));
gulp.task('default', gulp.series('devBuild'));
