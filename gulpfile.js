var gulp = require('gulp');
var bs = require('browser-sync');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


// Запускаем сервер, предварительно скопилировав SASS
gulp.task('serve', function() {

    bs.init({
      server: "./src"
    });

    gulp.watch("src/sass/*.sass", gulp.parallel('sass'));
    gulp.watch("src/*.html").on('change', bs.reload);
});

// Делаем компиляцию SASS в CSS 
gulp.task('sass', function() {
 return gulp.src("src/sass/*.sass")
   .pipe(sass())
   .pipe(gulp.dest("src/css"))
   .pipe(bs.stream());
});

// Добавляем префиксы
gulp.task('autoprefix', function() {
  gulp.src('src/css/*.css')
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('dist/css/'))
});

gulp.task('default', gulp.parallel('serve', 'autoprefix'));
