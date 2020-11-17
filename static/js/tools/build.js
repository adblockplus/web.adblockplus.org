const fs = require('fs');
const ujs = require("uglify-js");
const csso = require("csso");

const css_data = {
  'payment': {
    'css_files': [
      'static/css/payment/form.css',
      'static/css/payment/stripe-modal.css'
    ],
    'concatenated_file': 'static/css/build/payment.css',
    'minified_file': 'static/css/build/payment.min.css',
    'source_map': {
      'srcmap_name': 'payment.min.css.map',
      'srcmap_file': 'static/css/build/payment.min.css.map'
    }
  }
}

const buildCSS = (data) => {
  const cssFiles = data.css_files;
  const concatenatedFile = data.concatenated_file;
  const minifiedFile = data.minified_file;
  const sourcemapName = data.source_map.srcmap_name;
  const sourcemapFile = data.source_map.srcmap_file;

  const allFilesData = cssFiles.map(cssFiles => {
    return fs.readFileSync(cssFiles, 'utf8');
  });

  fs.mkdir('static/css/build/', { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.writeFileSync(concatenatedFile, allFilesData.join('\n'), 'utf8');

  var result = csso.minify(allFilesData.join('\n'), {
    filename: cssFiles,
    sourceMap: true
  });

  fs.writeFileSync(minifiedFile, result.css);

  fs.writeFileSync(sourcemapFile, result.map);

}

Object.keys(css_data).forEach((key, index) => {
  buildCSS(css_data[key]);
});






const js_data = {
  'payment': {
    'js_files': [
      'static/js/vendor/url-search-params.min.js',
      'static/js/vendor/bowser.js',
      'static/js/vendor/uuidv4.min.js',
      'static/js/vendor/lodash.custom.min.js',
      'static/js/payment/form.js',
      'static/js/payment/providers/paypal.js',
      'static/js/payment/providers/stripe.js'
    ],
    'concatenated_file': 'static/js/build/payment.js',
    'minified_file': 'static/js/build/payment.min.js',
    'source_map': {
      'srcmap_name': 'payment.min.js.map',
      'srcmap_file': 'static/js/build/payment.min.js.map'
    }
  }
}

const buildJs = (data) => {
  const jsFiles = data.js_files;
  const concatenatedFile = data.concatenated_file;
  const minifiedFile = data.minified_file;
  const sourcemapName = data.source_map.srcmap_name;
  const sourcemapFile = data.source_map.srcmap_file;

  const allFilesData = jsFiles.map(jsFiles => {
    return fs.readFileSync(jsFiles, 'utf8');
  });

  fs.mkdir('static/js/build/', { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.writeFileSync(concatenatedFile, allFilesData.join('\n'), 'utf8');

  const result = ujs.minify(allFilesData, {
    sourceMap: {
      filename: jsFiles,
      url: sourcemapName
    }
  });

  fs.writeFileSync(minifiedFile, result.code);

  fs.writeFileSync(sourcemapFile, result.map);

}

Object.keys(js_data).forEach((key, index) => {
  buildJs(js_data[key]);
});









// concatenateFiles(buildJS[payment].js_files, 'static/js/build/payment.js');
// concatenateFiles(paymentPage.css_files, 'static/css/build/payment.css');

/////////////////////////////////////////////////////////////////////////////////
// const getFilesByExtension = (path, extension) => {
//   return fs.readdirSync(path).filter(file => {
//     return file.endsWith(extension);
//   })
//   .map(entry => {
//     return path + entry;
//   });
// }
//
// const allJsFiles = getFilesByExtension('static/js/', '.js');
// const allCssFiles = getFilesByExtension('static/css/', '.css');
//
// console.log(allJsFiles);
// console.log(allCssFiles);






// concatenate and minify files per page (e.g. payment.js/payment.css)

// use `npm run build` during loval development (later check if it can be implemented in CMS)
// local dev preferred to staging due more control




// "js-conc": "cat static/js/vendor/url-search-params.min.js static/js/vendor/bowser.js static/js/vendor/uuidv4.min.js static/js/vendor/lodash.custom.min.js static/js/payment/form.js static/js/payment/providers/paypal.js static/js/payment/providers/stripe.js > static/js/payment/payment.js",
// "js-min": "uglifyjs static/js/vendor/url-search-params.min.js static/js/vendor/bowser.js static/js/vendor/uuidv4.min.js static/js/vendor/lodash.custom.min.js static/js/payment/form.js static/js/payment/providers/paypal.js static/js/payment/providers/stripe.js -o static/js/payment/payment.min.js -c --source-map 'url=payment.min.js.map'",
// "css-min": "cat static/css/payment/*.css | csso --output static/css/payment/payment.min.css --source-map static/css/payment/payment.min.css.map",
// "build": "npm run css-dir && npm run css-min && npm run js-dir && npm run js-conc && npm run js-min",
// "build-sh": "node static/js/tools/build.sh",

//
