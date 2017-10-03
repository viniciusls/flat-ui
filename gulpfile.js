var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat  = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', function () {
	return gulp.src('public/assets/dist/')
		.pipe(clean());
});

gulp.task('sass', function () {
	gulp.src('resources/assets/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
		}))
		.pipe(gulp.dest('resources/assets/css'));
});

gulp.task('jshint',function () {
 return gulp.src(['resources/assets/js/*.js', 'resources/assets/js/modules/*.js'])
 .pipe(jshint())
 .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
	gulp.src(['resources/assets/js/*.js']).pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('public/assets/dist/js'));

	gulp.src(['resources/assets/js/modules/*.js'])
		.pipe(gulp.dest('public/assets/dist/js/modules'));
});

gulp.task('cssmin', function() {
	gulp.src('resources/assets/css/*.css')
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('public/assets/dist/css'));

});

gulp.task('watch', function() {
	gulp.watch('resources/assets/sass/*.scss', ['sass']).on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
	gulp.watch('/*.html',['htmlmin']);
	gulp.watch('resources/assets/js/*.js',['uglify']);
	gulp.watch('resources/assets/js/modules/*.js',['uglify']);
	gulp.watch('resources/assets/css/*.css',['cssmin']);
});

gulp.task('default', function (callback) {
	//return runSequence('clean',['jshint','htmlmin','sass','uglify','watch'],callback)
	return runSequence('clean',['jshint', 'sass','uglify','cssmin','watch'],callback)
});

