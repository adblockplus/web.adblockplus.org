const fs = require('fs');
const ujs = require('uglify-js');
const csso = require('csso');

const css_data = {
  // includes/styles.tmpl
  'base-styles': {
    'css_files': [
      'static/css/defaults.css',
      'static/css/main.css',
      'static/css/cookies.css'
    ],
    'concatenated_file': 'static/css/base-styles.css',
    'minified_file': 'static/css/base-styles.min.css',
    'source_map': {
      'srcmap_name': 'base-styles.min.css.map',
      'srcmap_file': 'static/css/base-styles.min.css.map'
    }
  },
  // pages/donate.html
  'payment': {
    'css_files': [
      'static/css/payment/form.css',
      'static/css/payment/stripe-modal.css'
    ],
    'concatenated_file': 'static/css/payment/payment.css',
    'minified_file': 'static/css/payment/payment.min.css',
    'source_map': {
      'srcmap_name': 'payment.min.css.map',
      'srcmap_file': 'static/css/payment/payment.min.css.map'
    }
  },
  // pages/payment/intalled.html
  'installed-page': {
    'css_files': [
      'static/css/pages/installed.css',
      'static/css/payment/form.css',
      'static/css/payment/stripe-modal.css'
    ],
    'concatenated_file': 'static/css/pages/installed-page.css',
    'minified_file': 'static/css/pages/installed-page.min.css',
    'source_map': {
      'srcmap_name': 'installed-page.min.css.map',
      'srcmap_file': 'static/css/pages/installed-page.min.css.map'
    }
  }
}

const js_data = {
  // includes/payment/form.html
  'payment-form': {
    'js_files': [
      'static/js/vendor/url-search-params.min.js',
      'static/js/vendor/bowser.js',
      'static/js/vendor/uuidv4.min.js',
      'static/js/vendor/lodash.custom.min.js',
      'static/js/payment/form.js',
      'static/js/payment/providers/paypal.js',
      'static/js/payment/providers/stripe.js'
    ],
    'concatenated_file': 'static/js/payment/payment-form.js',
    'minified_file': 'static/js/payment/payment-form.min.js',
    'source_map': {
      'srcmap_name': 'payment-form.min.js.map',
      'srcmap_file': 'static/js/payment/payment-form.min.js.map'
    }
  },
  // includes/payment/installed.html
  'installed-page': {
    'js_files': [
      'static/js/pages/installed.js',
      'static/js/vendor/bowser.js',
      'static/js/address-masking.js'
    ],
    'concatenated_file': 'static/js/pages/installed-page.js',
    'minified_file': 'static/js/pages/installed-page.min.js',
    'source_map': {
      'srcmap_name': 'installed-page.min.js.map',
      'srcmap_file': 'static/js/pages/installed-page.min.js.map'
    }
  }
}

const buildCSS = (data) => {
  const cssFiles = data.css_files;
  const concatenatedFile = data.concatenated_file;
  const minifiedFile = data.minified_file;
  const sourcemapName = data.source_map.srcmap_name;
  const sourcemapFile = data.source_map.srcmap_file;

  const allFilesData = cssFiles.map(cssFiles =>
    fs.readFileSync(cssFiles, 'utf8'));

  fs.writeFileSync(concatenatedFile, allFilesData.join('\n'), 'utf8');

  const result = csso.minify(allFilesData.join('\n'), {
    filename: minifiedFile,
    sourceMap: true
  });

  var srcMapLink = "\n /*# sourceMappingURL="+sourcemapName+" */";

  fs.writeFileSync(minifiedFile, result.css+srcMapLink);

  fs.writeFileSync(sourcemapFile, result.map);

}

const buildJs = (data) => {
  const jsFiles = data.js_files;
  const concatenatedFile = data.concatenated_file;
  const minifiedFile = data.minified_file;
  const sourcemapName = data.source_map.srcmap_name;
  const sourcemapFile = data.source_map.srcmap_file;

  const allFilesData = jsFiles.map(jsFiles =>
    fs.readFileSync(jsFiles, 'utf8'));

  fs.writeFileSync(concatenatedFile, allFilesData.join('\n'), 'utf8');

  const result = ujs.minify(allFilesData.join('\n'), {
    sourceMap: {
      includeSources: true,
      names: false,
      filename: minifiedFile,
      url: sourcemapName
    }
  });

  fs.writeFileSync(minifiedFile, result.code);

  fs.writeFileSync(sourcemapFile, result.map);

}

Object.keys(css_data).forEach((key, index) =>
  buildCSS(css_data[key]));

Object.keys(js_data).forEach((key, index) =>
  buildJs(js_data[key]));
