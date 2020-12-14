const fs = require('fs');
const ujs = require('uglify-js');
const csso = require('csso');

const BUILD_FOLDER = 'static/build/';
const CSS_BUILD_FOLDER = 'static/build/css/';
const JS_BUILD_FOLDER = 'static/build/js/';

// recursively create build directories
const setUp = (dir) => {
  fs.mkdirSync(dir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log("___ Directory: "+ dir +" is created.");
  });

}

const html_data = {
  // pages/download.html
  'download_page': {
    'files': [
      'pages/download.tmpl'
    ],
    'strings': [
      '<script src="/js/vendor/bowser.js"></script>',
      '<script src="/js/download.js"></script>'
    ],
    'new_string': '<script src="/build/js/download-page.min.js"></script>',
    'new_file': 'static/build/__NEW__download.tmpl'
  }
}

const css_data = {
  // pages/download.html
  'download_page': {
    'css_files': [
      'static/css/base-styles.css',
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

const buildCSS = (data) => {
  const cssFiles = data.css_files;
  const concatenatedFile = CSS_BUILD_FOLDER + data.output_name + '.css';
  const minifiedFile = CSS_BUILD_FOLDER + data.output_name + '.min.css';
  const sourcemapName = data.output_name + '.min.css.map';
  const sourcemapFile = CSS_BUILD_FOLDER + sourcemapName;

  console.log('CSS___ : ' + data.output_name);

  const allFilesData = cssFiles.map(cssFiles => {
    let newUrlPathsData = fs.readFileSync(cssFiles, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
    });

    if(newUrlPathsData.includes("url(../")) {
      newUrlPathsData = newUrlPathsData.replace(/url\(\.\.\//g, "url(../../");
      console.log('______ : found url(../ replaced with url(../../');
    }

    if(newUrlPathsData.includes("url(/")) {
      newUrlPathsData = newUrlPathsData.replace(/url\(\//g, "url(../../");
      console.log('______ : found url(/ replaced with url(../../');
    }

    if(newUrlPathsData.includes("url(\"../")) {
      newUrlPathsData = newUrlPathsData.replace(/url\(\"\.\.\//g, "url(\"../../");
      console.log('______ : found url("../ replaced with url("../../');
    }

    if(newUrlPathsData.includes("url(\"/")) {
      newUrlPathsData = newUrlPathsData.replace(/url\(\"\//g, "url(\"../../");
      console.log('______ : found url("/ replaced with url("../../');
    }

    return newUrlPathsData;
  });

  fs.writeFileSync(concatenatedFile, allFilesData.join('\n'), 'utf8');
  console.log("______ : " + concatenatedFile);

  const result = csso.minify(allFilesData.join('\n'), {
    filename: minifiedFile,
    sourceMap: true
  });

  const srcMapLink = "\n /*# sourceMappingURL="+sourcemapName+" */";

  fs.writeFileSync(minifiedFile, result.css + srcMapLink);
  console.log("______ : " + minifiedFile);

  fs.writeFileSync(sourcemapFile, result.map);
  console.log("______ : " + sourcemapFile);
}

const buildJs = (data) => {
  const jsFiles = data.js_files;
  const concatenatedFile = JS_BUILD_FOLDER + data.output_name + '.js';
  const minifiedFile = JS_BUILD_FOLDER + data.output_name + '.min.js';
  const sourcemapName = data.output_name + '.min.js.map';
  const sourcemapFile = JS_BUILD_FOLDER + sourcemapName;

  console.log('JS____ : ' + data.output_name);

  const allFilesData = jsFiles.map(jsFiles => {
    let newUrlPathsData = fs.readFileSync(jsFiles, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
    });

    if(newUrlPathsData.includes("\'/img/")) {
      newUrlPathsData = newUrlPathsData.replace(/\'\/img\//g, "\'../../img/");
      console.log('______ : found \'/img/ replaced with \'../../img/');
    }

    if(newUrlPathsData.includes('\"/img/')) {
      newUrlPathsData = newUrlPathsData.replace(/\"\/img\//g, '\"../../img/');
      console.log('______ : found \"/img/ replaced with \'../../img/');
    }

    if(newUrlPathsData.includes("\'/js/")) {
      newUrlPathsData = newUrlPathsData.replace(/\'\/js\//g, "\'../../js/");
      console.log('______ : found \'/js/ replaced with \'../../js/');
    }

    if(newUrlPathsData.includes('\"/js/')) {
      newUrlPathsData = newUrlPathsData.replace(/\'\/js\//g, "\"../../js/");
      console.log('______ : found \'/js/ replaced with \'../../js/');
    }

    return newUrlPathsData;
  });

  fs.writeFileSync(concatenatedFile, allFilesData.join('\n'), 'utf8');
  console.log("______ : " + concatenatedFile);

  const result = ujs.minify(allFilesData.join('\n'), {
    sourceMap: {
      includeSources: true,
      names: false,
      filename: minifiedFile,
      url: sourcemapName
    }
  });

  fs.writeFileSync(minifiedFile, result.code);
  console.log("______ : " + minifiedFile);

  fs.writeFileSync(sourcemapFile, result.map);
  console.log("______ : " + sourcemapFile);
}

const buildHTML = (d) => {
  const files = d.files;
  const strings = d.strings;
  const newString = d.new_string;
  const newFile = d.new_file;

  const escapeHTML = (string) =>
    ('' + string).replace(/[&<>\.\(\)="'\/]/g, (match) =>
      "\\" + match );

  console.log("HTML__ : " + d.files);

  fs.readFile(files[0], 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    function removeStr(string, from, to) {
      return string.substring(0, from) + string.substring(to);
    }

    strings.forEach((item, i) => {
      if(data.includes(item)) {
        if (i < strings.length - 1)
          data = data.replace(strings[i], '');
        else
          data = data.replace(strings[i], newString);
      } else {
        console.error('______ : ERR string not found in ' + strings)
      }
    });

    fs.writeFileSync(newFile, data);
    console.log("______ : " + newFile);

  })
}

setUp(BUILD_FOLDER);

setUp(CSS_BUILD_FOLDER);

setUp(JS_BUILD_FOLDER);

Object.keys(css_data).forEach((key, index) =>
  buildCSS(css_data[key]));

Object.keys(js_data).forEach((key, index) =>
  buildJs(js_data[key]));

// Object.keys(html_data).forEach((key, index) =>
//   buildHTML(html_data[key]));
