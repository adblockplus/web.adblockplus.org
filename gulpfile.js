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
var minify = require('gulp-minify');

//script paths
var jsFiles = 'static/js/*/*.js',
  jsDest = 'static/js/gulp-test';

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('abp.min.js'))
    .pipe(minify())
    .pipe(gulp.dest(jsDest));
});
