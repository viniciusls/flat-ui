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
	return gulp.src('dist/')
		.pipe(clean());
});

gulp.task('sass', function () {
	gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'safari 5', 'ie 11', 'opera 49', 'ios 6', 'android 4']
		}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('jshint',function () {
	return gulp.src(['src/js/*.js'])
 		.pipe(jshint())
 		.pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
	gulp.src(['src/js/*.js']).pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', function() {
	gulp.src('src/css/*.css')
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'));

});
gulp.task('watch', function() {
	gulp.watch('src/scss/*.scss', ['sass']).on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
	gulp.watch('src/js/*.js', ['uglify']);
	gulp.watch('src/css/*.css', ['cssmin']);
});

gulp.task('default', function (callback) {
	return runSequence('clean', ['jshint', 'sass','uglify','cssmin','watch'], callback)
});