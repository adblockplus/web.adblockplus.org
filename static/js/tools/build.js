const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const ujs = require('uglify-js');
const csso = require('csso');

const BUILD_FOLDER = 'static/build/';
const CSS_BUILD_FOLDER = 'static/build/css/';
const JS_BUILD_FOLDER = 'static/build/js/';

const css_data = {
  // pages/download.html
  'download_page': {
    'css_files': [
      'static/css/defaults.css',
      'static/css/fonts.css',
      'static/css/main.css',
      'static/css/cookies.css',
      'static/css/download.css'
    ],
    'output_name': 'download-page'
  }
}

const js_data = {
  // pages/download.html
  'download_page': {
    'js_files': [
      'static/js/main.js',
      'static/js/vendor/bowser.js',
      'static/js/download.js',
      'static/js/testing/setup.js'
    ],
    'output_name': 'download-page'
  }
}

const setUpFolders = (dir) => {
  mkdirSync(dir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }

    console.log('___ Directory: ' + item + ' is created.');
  });
}

const buildCSS = (data) => {
  const cssFiles = data.css_files;
  const concatenatedFile = CSS_BUILD_FOLDER + data.output_name + '.css';
  const minifiedFile = CSS_BUILD_FOLDER + data.output_name + '.min.css';
  const sourcemapName = data.output_name + '.min.css.map';
  const sourcemapFile = CSS_BUILD_FOLDER + sourcemapName;

  console.log('CSS___ : NAME    : ' + data.output_name);

  const allFilesData = cssFiles.map(cssFile => {

    console.log('______ : READ    : ' + cssFile);

    let newUrlPathsData = readFileSync(cssFile, 'utf8', (err, data) => {
      if (err) {

        return console.log(err);
      }
    });

    if (newUrlPathsData.includes('url(../')) {
      newUrlPathsData = newUrlPathsData.replace(/url\(\.\.\//g, 'url(../../');

      console.log('______ : REPLACE : url(../ url(../../');
    }

    if (newUrlPathsData.includes('url(/')) {
      newUrlPathsData = newUrlPathsData.replace(/url\(\//g, 'url(../../');

      console.log('______ : REPLACE : url(/ url(../../');
    }

    if (newUrlPathsData.includes('url("../')) {
      newUrlPathsData = newUrlPathsData.replace(/url\(\"\.\.\//g, 'url("../../');

      console.log('______ : REPLACE : url("../ url("../../');
    }

    if (newUrlPathsData.includes('url("/')) {
      newUrlPathsData = newUrlPathsData.replace(/url\(\"\//g, 'url("../../');

      console.log('______ : REPLACE : url("/ url("../../');
    }

    return newUrlPathsData;
  });

  writeFileSync(concatenatedFile, allFilesData.join('\n'), 'utf8');

  console.log('______ : WRITE   : ' + concatenatedFile);

  const result = csso.minify(allFilesData.join('\n'), {
    filename: minifiedFile,
    sourceMap: true
  });

  const srcMapLink = '\n /*# sourceMappingURL=' + sourcemapName + ' */';

  writeFileSync(minifiedFile, result.css + srcMapLink);

  console.log('______ : WRITE   : ' + minifiedFile);

  writeFileSync(sourcemapFile, result.map);

  console.log('______ : WRITE   : ' + sourcemapFile);
}

const buildJs = (data) => {
  const jsFiles = data.js_files;
  const concatenatedFile = JS_BUILD_FOLDER + data.output_name + '.js';
  const minifiedFile = JS_BUILD_FOLDER + data.output_name + '.min.js';
  const sourcemapName = data.output_name + '.min.js.map';
  const sourcemapFile = JS_BUILD_FOLDER + sourcemapName;

  console.log('JS____ : NAME    : ' + data.output_name);

  const allFilesData = jsFiles.map(jsFile => {

    console.log('______ : READ    : ' + jsFile);

    let newUrlPathsData = readFileSync(jsFile, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
    });

    if (newUrlPathsData.includes('\'/img/')) {
      newUrlPathsData = newUrlPathsData.replace(/\'\/img\//g, '\'../../img/');

      console.log('______ : REPLACE : \'/img/  \'../../img/');
    }

    if (newUrlPathsData.includes('"/img/')) {
      newUrlPathsData = newUrlPathsData.replace(/\"\/img\//g, '"../../img/');

      console.log('______ : REPLACE : "/img/  "../../img/');
    }

    if (newUrlPathsData.includes('\'/js/')) {
      newUrlPathsData = newUrlPathsData.replace(/\'\/js\//g, '\'../../js/');

      console.log('______ : REPLACE : \'/js/  \'../../js/');
    }

    if (newUrlPathsData.includes('"/js/')) {
      newUrlPathsData = newUrlPathsData.replace(/\"\/js\//g, '"/../js/');

      console.log('______ : REPLACE : "/js/  "/../js/');
    }

    return newUrlPathsData;
  });

  writeFileSync(concatenatedFile, allFilesData.join('\n'), 'utf8');

  console.log('______ : WRITE   : ' + concatenatedFile);

  const result = ujs.minify(allFilesData.join('\n'), {
    sourceMap: {
      includeSources: true,
      names: false,
      filename: minifiedFile,
      url: sourcemapName
    }
  });

  writeFileSync(minifiedFile, result.code);

  console.log('______ : WRITE   : ' + minifiedFile);

  writeFileSync(sourcemapFile, result.map);

  console.log('______ : WRITE   : ' + sourcemapFile);
}

const init = () => {
  [BUILD_FOLDER, CSS_BUILD_FOLDER, JS_BUILD_FOLDER]
  .forEach(setUpFolders);

  if (existsSync(BUILD_FOLDER)) {

    console.log('Build directory structure created : ' + BUILD_FOLDER + '\n');

    console.log('Process CSS files :\n');

    Object.keys(css_data).forEach((key, index) =>
      buildCSS(css_data[key]));

    console.log('\n');

    console.log('Process JavaScript files :\n');

    Object.keys(js_data).forEach((key, index) =>
      buildJs(js_data[key]));

    console.log('\n');

  } else {
    console.log('Directory not found.');
  }

}

init();
