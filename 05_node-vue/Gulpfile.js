var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

//.pipe(gulp.dest('./build/'))
gulp.task('js', function() {
    gulp.src('./app/**/*.js').pipe(concat('scripts.js')).pipe(rename({
        suffix: '.min'
    })).pipe(uglify()).pipe(gulp.dest('./public/javascript/'))
});

gulp.task('cp_js', function() {
    gulp.src(['./node_modules/vue-resource/dist/vue-resource.js', './node_modules/vue/dist/vue.js',
    '/node_modules/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(gulp.dest('./public/javascript/'));
});

gulp.task('cp_css', function() {
    gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('watchers', function() {
    gulp.watch('./app/**/*', ['js', 'cp_js', 'cp_css']);
});
gulp.task('default', ['js', 'cp_js', 'cp_css', 'watchers']);
