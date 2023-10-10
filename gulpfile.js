const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const watch = require('gulp').watch;

function html() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
}

function css() {
    return gulp.src('app/sass/*.scss')
        .pipe(concat('styles.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('app/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

// function watching(){
//     watch(['app/*.html'], gulp.parallel(html)).on('change', browserSync.reload)
//     watch(['app/sass/*.scss'], gulp.parallel(css)).on('change', browserSync.reload)
//     watch(['app/js/main.js'], gulp.parallel(scripts)).on('change', browserSync.reload)
// }

function watching(){
    watch(['app/*.html'], gulp.parallel(html))
    watch(['app/sass/*.scss'], gulp.parallel(css))
    watch(['app/js/main.js'], gulp.parallel(scripts))
}

// function browsersync() {
//     browserSync.init({
//         server: {
//             baseDir: 'dist/'
//         }
//     });
// }


function browsersync() {
        browserSync.init({
            watch: true,
            server: ['app', 'dist']
        });
    }


//exports.default = gulp.series(gulp.parallel(html, css, scripts, browsersync, watching));
exports.default = gulp.series(html, css, scripts, browsersync, watching);
