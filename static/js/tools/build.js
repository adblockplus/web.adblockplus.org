const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const ujs = require('uglify-js');
const csso = require('csso');

const cssData = require('../../data/css.json');
const jsData = require('../../data/js.json');

const BUILD_FOLDER = 'static/build/';
const CSS_BUILD_FOLDER = 'static/build/css/';
const JS_BUILD_FOLDER = 'static/build/js/';

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

  writeFileSync(sourcemapFile, result.map.toString());

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

    Object.keys(cssData).forEach((key, index) =>
      buildCSS(cssData[key]));

    console.log('\n');

    console.log('Process JavaScript files :\n');

    Object.keys(jsData).forEach((key, index) =>
      buildJs(jsData[key]));

    console.log('\n');

  } else {
    console.log('Directory not found.');
  }

}

init();
