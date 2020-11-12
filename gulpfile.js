/*!
 * This file is part of acceptableads.org.
 * Copyright (C) 2016-present eyeo GmbH
 *
 * acceptableads.org is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * acceptableads.org is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with acceptableads.org.  If not, see <http://www.gnu.org/licenses/>.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var csso = require('gulp-csso');

var cssBaseUrl = "static/css/";
var jsBaseUrl = "static/js/";

var cssFolders = [
  // file(s), destination, file name
  ["pages/*.css", "pages/", "pages"],
  ["payment/*.css", "payment/", "payment"]
];

gulp.task('css-folders', function(done){
  cssFolders.map(function(file, index){
    return gulp.src(cssBaseUrl + file[0])
      .pipe(sourcemaps.init())
      .pipe(concat(file[2] + '.css'))
      .pipe(gulp.dest(cssBaseUrl + file[1]))
      .pipe(csso())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(cssBaseUrl + file[1]));
  })
  done();
});

// Used in styles.tmpl
gulp.task('base-styles', function(done){
  return gulp.src([
    'static/css/defaults.css',
    'static/css/fonts.css',
    'static/css/main.css',
    'static/css/cookies.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat(cssBaseUrl + 'conc-styles.css'))
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
  done();
});

var jsFolders = [
  // ["payment/*/*.js", "payment/", "payment"],
  // ["vendor/*.js", "vendor/", "vendor"]
];

gulp.task('js-folders', function(done){
  jsFolders.map(function(file, index){
    return gulp.src(jsBaseUrl + file[0])
      .pipe(sourcemaps.init())
      .pipe(concat(file[2] + '.js'))
      .pipe(gulp.dest(jsBaseUrl + file[1]))
      .pipe(uglify())
      .pipe(concat(file[2] + '.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(jsBaseUrl + file[1]));
  })
  done();
});

gulp.task('build', gulp.series(
  'css-folders',
  'js-folders',
  'base-styles'
), function(){});

// // ===================================

//
// // update/page
// "/css/update.css"
// "/css/payment/stripe-modal.css"
//
// // contribute/features
// "/css/topics.css"
// "/css/topics-desktop.css"
// "/css/topics-mobile.css"
// "/css/contribute.css"
//
// // installed
// "/css/pages/installed.css"
// "/css/payment/form.css"
// "/css/payment/stripe-modal.css"
//
// // uninstalled
// "/css/uninstalled.css"
// "/css/survey-form.css"
