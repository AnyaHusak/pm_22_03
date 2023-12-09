const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function html() {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function scss() {
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
  return gulp.src('app/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src('app/img/*.+(jpg|jpeg|png|gif)')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'));
}

function lib_css() {
  return gulp.src('app/lib/css/*.css')
    .pipe(gulp.dest('dist/css'));
}

function lib_js() {
  return gulp.src('app/lib/js/*.js')
    .pipe(gulp.dest('dist/js'));
}

function browsersync() {
  browserSync.init({
      server: {
          baseDir: './dist'
      }
  });
}

function watching() {
  browsersync();

  gulp.watch(['app/*.html'], gulp.parallel(html)).on('change', browserSync.reload);
  gulp.watch(['app/sass/*.scss'], gulp.parallel(scss))
  gulp.watch(['app/js/*.js'], gulp.parallel(scripts))
  gulp.watch('app/img/*.+(jpg|jpeg|png|gif)', gulp.parallel(images));
}

exports.default = gulp.series(html, lib_css, lib_js, scss, scripts, images, watching);
