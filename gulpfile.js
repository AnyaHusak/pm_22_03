const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// const babel = require('gulp-babel');
// const imagemin = require('gulp-imagemin');
// const imageminjpg = require ('imagemin-jpeg-recompress');
// const watch = require('gulp').watch;
// const cssmin = require('gulp-css');
// const jsmin = require('gulp-jsmin');

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
  return gulp.src('app/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src('app/img/*.+(jpg|jpeg|png|gif')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'));
}

/*this task only for copying css from lib to dist folder*/
function lib_css() {
  return gulp.src('app/lib/css/*.css')
    .pipe(gulp.dest('dist/css'));
}

/*the same as for css task */
function lib_js() {
  return gulp.src('app/lib/js/*.js')
    .pipe(gulp.dest('dist/lib'));
}

// function img(){
//     return gulp.src('app/img/*.jpg')
//     .pipe(imagemin())
//     //  imageminjpg({
//     //     loops: 4,
//     //     min: 50,
//     //     max: 95,
//     //     quality: 'high'
//     //  })

//     .pipe(gulp.dest('dist/img'))
//     .pipe(browserSync.stream());
// }


// function watching(){
//     watch(['app/*.html'], gulp.parallel(html)).on('change', browserSync.reload)
//     watch(['app/sass/*.scss'], gulp.parallel(css)).on('change', browserSync.reload)
//     watch(['app/js/main.js'], gulp.parallel(scripts)).on('change', browserSync.reload)
// }

function watching() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(['app/*.html'], gulp.parallel(html)).on('change', browserSync.reload);
  /*gulp.watch(['app/!**!/!*.css'], gulp.parallel(css))
  gulp.watch(['app/lib/!*.js'], gulp.parallel(js))*/
  gulp.watch(['app/sass/*.scss'], gulp.parallel(scss))
  gulp.watch(['app/js/*.js'], gulp.parallel(scripts))
  gulp.watch('app/img/*.+(jpg|jpeg|png|gif', gulp.parallel(images));
}

// function browsersync() {
//     browserSync.init({
//         server: {
//             baseDir: 'dist/'
//         }
//     });
// }


//exports.default = gulp.series(gulp.parallel(html, css, scripts, browsersync, watching));
exports.default = gulp.series(html, lib_css, lib_js, scss, scripts, images, watching);
