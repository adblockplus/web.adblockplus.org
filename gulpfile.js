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

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

var baseUrl = "static/js/";

var jsFiles = [
  ["*.js", "", "abp"]//,
  //["payment/*/*.js", "payment/", "payment"],
  //["vendor/*.js", "vendor/", "vendor"]
]

gulp.task('js', function(done){
  jsFiles.map(function(file, index){
    return gulp.src(baseUrl + file[0])
      .pipe(sourcemaps.init())
      .pipe(concat(file[2] + '.js'))
      .pipe(gulp.dest(baseUrl + file[1]))
      .pipe(uglify())
      .pipe(concat(file[2] + '.min.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(baseUrl + file[1]));
  })
  done();
});





// // ===================================
// // styles.tmpl
// "/css/defaults.css"
// "/css/fonts.css"
// "/css/main.css"
// "/css/cookies.css"
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
