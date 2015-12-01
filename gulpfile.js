// include gulp
var gulp = require('gulp'),
    // include plug-ins
    gulpSequence  = require('gulp-sequence'),
    //clean         = require('gulp-clean'),
    del           = require('del'),
    jshint        = require('gulp-jshint'),
    notify        = require('gulp-notify'),
    growl         = require('gulp-notify-growl'),
    jscs          = require('gulp-jscs'),
    changed       = require('gulp-changed'),
    imagemin      = require('gulp-imagemin'),
    concat        = require('gulp-concat'),
    //stripDebug    = require('gulp-strip-debug'),
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    //autoprefix    = require('gulp-autoprefixer'),
    sass          = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifyCSS     = require('gulp-minify-css'),
    swig          = require('gulp-swig'),
    watch         = require('gulp-watch'),
    browserSync   = require('browser-sync').create();

var config = {}
config.publicDirectory = './public';
config.sourceDirectory = './source';
config.publicAssets    = config.publicDirectory + '/assets';
config.sourceAssets    = config.sourceDirectory + '/assets';

var growlNotifier = growl();

// Watch
gulp.task('watch', ['browserSync'], function() {
    watch(config.sourceAssets + '/images/**', function() { gulp.start('imagemin'); });
    watch(config.sourceAssets + '/fonts/**/*', function() { gulp.start('fonts'); });
    watch(config.sourceAssets + '/javascripts/**/*', function() { gulp.start('scripts'); });
    watch(config.sourceAssets + '/stylesheets/**/*.{sass,scss}', function() { gulp.start('sass'); });
    //watch(config.sourceDirectory + '/views/**/*.html', function() { gulp.start('html'); });
});

// BrowserSync

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: config.publicDirectory
        },
        files: ['public/**/*.html']
    });
});

// Clean
gulp.task('clean', function (cb) {
    del([
        config.publicAssets
    ], cb);
});

// HTML
gulp.task('html', function() {
    return gulp.src([config.sourceDirectory + '/views/**/*.html', '!**/{layouts,shared}/**'])
        .pipe(swig({
            defaults: { cache: false }
        }))
        //.on('error', handleErrors)
        .pipe(gulp.dest(config.publicDirectory))
        .pipe(browserSync.reload({stream:true}));
});

// Mustache
gulp.task('mustache', function() {
    gulp.src('./app/mustache/**/*.mustache')
        .pipe(gulp.dest(config.publicAssets + '/mustache/'))
});

// Test Data
gulp.task('test-data', function() {
    gulp.src('./app/assets/test/**/*.json')
        .pipe(gulp.dest(config.publicAssets + '/test/'))
});

// Images
gulp.task('imagemin', function() {
    var imgSrc = config.sourceAssets + '/images/**',
        imgDst = config.publicAssets + '/images';
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// Fonts
gulp.task('fonts', function() {
    gulp.src(config.sourceAssets + '/fonts/**/*')
        .pipe(gulp.dest(config.publicAssets + '/fonts'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('jscs', function() {
    gulp.src([
            config.sourceAssets + '/javascripts/modules/**/*.js',
            config.sourceAssets + '/javascripts/init.js'
        ])
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!',
            notifier: growlNotifier
        }))
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src(
        [
            config.sourceAssets + '/javascripts/vendor/jquery-2.0.0b2.js',
            config.sourceAssets + '/javascripts/vendor/jquery-noconflict.js',
            config.sourceAssets + '/javascripts/vendor/breakpoints.js',
            config.sourceAssets + '/javascripts/vendor/doubletaptogo.js',
            config.sourceAssets + '/javascripts/vendor/jquery-ui.js',
            config.sourceAssets + '/javascripts/vendor/jquery-validate.js',
            config.sourceAssets + '/javascripts/vendor/remodal.js',
            config.sourceAssets + '/javascripts/vendor/twitter-post-fetcher.js',
            config.sourceAssets + '/javascripts/modules/**/*.js',
            config.sourceAssets + '/javascripts/init.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.publicAssets + '/javascripts'))
        // Minify versions
        .pipe(rename(function (path) {
            if(path.extname === '.js') {
                path.basename += '.min';
            }
        }))
      .pipe(uglify())
      .pipe(gulp.dest(config.publicAssets + '/javascripts'));
});

// Sass
gulp.task('sass', function () {
    gulp.src(config.sourceAssets + '/stylesheets/**/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass( { errLogToConsole: true, includePaths : [config.sourceAssets + '/stylesheets']} ))
        .pipe(autoprefixer({
            browsers: ['last 2 version']
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest(config.publicAssets + '/stylesheets'))
        // Minify versions
        .pipe(minifyCSS({processImport: false}))
        .pipe(sourcemaps.write('./'))
        .pipe(rename(function (path) {
            if(path.extname === '.css') {
                path.basename += '.min';
            }
        }))
        .pipe(gulp.dest(config.publicAssets + '/stylesheets'))
        .pipe(browserSync.reload({stream:true}));
});


// ----------------------------------------------------------------------

// Gulp task
gulp.task('default', ['build:development']);
gulp.task('build:development', function(cb) {
    gulpSequence('clean', ['fonts', 'imagemin'], ['sass', 'jscs', 'scripts'], ['watch'], cb);
});
