'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');


gulp.task('build-sass', () => {
    return gulp.src('./styles/sass/newmain.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./styles/dist'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./styles/**/*.scss', ['build-sass']);
});

gulp.task('babel', () => {
    return gulp.src('./js/autocompleter.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('script.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./js/dist'))
});

gulp.task('js:watch', () => {
    gulp.watch('./js/*.js', ['babel']); 
});

gulp.task('default', ['build-sass', 'sass:watch', 'js:watch']);