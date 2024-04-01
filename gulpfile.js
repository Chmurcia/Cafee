const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');

const paths = {
  styles: {
    src: 'src/scss/main.scss',
    dest: 'dist/css'
  },
  content: ['**/*.html', '**/*.js'] 
};

function styleTask() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      cssnano({ preset: 'default' }), 
      purgecss({ content: paths.content }), 
    ]))
    .pipe(gulp.dest(paths.styles.dest));
}

function watchTask() {
  gulp.watch(paths.styles.src, styleTask);
}

gulp.task('styles', styleTask);
gulp.task('watch', watchTask);
gulp.task('default', gulp.series('styles', 'watch'));
