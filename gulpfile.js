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
  jsDest = 'static/js/';

// Donation form
// "/js/vendor/url-search-params.min.js"
// "/js/vendor/bowser.js"
// "/js/vendor/uuidv4.min.js"
// "/js/vendor/lodash.custom.min.js"
// "/js/payment/form.js"
// "/js/payment/providers/paypal.js"
// "/js/payment/providers/stripe.js"

// SEO pages combo install-button/bowser

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('abp.min.js'))
    .pipe(minify())
    .pipe(gulp.dest(jsDest));
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
