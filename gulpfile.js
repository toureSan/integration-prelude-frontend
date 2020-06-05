
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer')
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
const image = require('gulp-image');
const imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

gulp.task()
gulp.task('sass', function () {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
});

gulp.task('html', function(){
	return gulp.src('./src/**/*.html')
	.pipe(gulp.dest('./build'));
});

gulp.task('image', function(){
	return gulp.src('./src/img/**/*.*')
	.pipe(gulp.dest('./build/img'))	
	.pipe(imagemin())
	

});


gulp.task('pack-js', function(){
	return gulp.src('./src/js/**/*.*')
	.pipe(gulp.dest('./build/js'));

})



gulp.task('watch', function () {
	browserSync.init({
        server: {
			baseDir: "./build"
        }
	});
	

	gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});



gulp.task('default', gulp.parallel('sass', 'html', 'image', 'pack-js', 'watch'));


