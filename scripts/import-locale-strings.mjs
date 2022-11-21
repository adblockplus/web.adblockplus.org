import { program } from 'commander';
import { writeFileSync, readdirSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const LOCALES = 'locales';
const DOT = '.';
const HTML_ATTRIBUTES_PATTERN = /(?<=<[\w]+)(\s[^>]*)/gmiu;

program.requiredOption('-i, --input <path>', 'path to translations');
program.parse();
const args = program.opts();

const openLocaleFile = (path) => {
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, {encoding: 'utf-8'}));
  } else {
    // Warning in case locale file should but doesn't exist at path (aka the new or existing path is incorrect)
    console.warn('Creating locale file', path);
    writeFileSync(path, JSON.stringify({}, null, 2));
    return {};
  }
}

const excludeDotfiles = (list, name) => {
  if (name[0] != '.') list.push(name);
  return list;
}

const inputLocalePaths = readdirSync(args.input)
.reduce(excludeDotfiles, []);
if (!inputLocalePaths.length) throw new Error("Didn't find locale paths in input path");

const outputLocalePaths = readdirSync('./locales')
.reduce(excludeDotfiles, []);
if (!outputLocalePaths.length) throw new Error("Didn't find locale paths in project path");

inputLocalePaths.forEach(inputLocale => {
  let outputLocale = inputLocale;
  let outputPath = join(DOT, LOCALES, outputLocale);
  if (!existsSync(outputPath)) {
    outputLocale = outputLocale.split('_')[0];
    outputPath = join(DOT, LOCALES, outputLocale);
    if (!existsSync(outputPath)) {
      console.warn('Creating locale directory', outputPath)
      mkdirSync(outputPath);
    }
  }
  readdirSync(join(args.input, inputLocale))
  .reduce(excludeDotfiles, [])
  .forEach(inputFilePath => {
    const outputPath = join(DOT, LOCALES, outputLocale, inputFilePath);
    const inputObject = openLocaleFile(join(args.input, inputLocale, inputFilePath));
    const outputObject = openLocaleFile(outputPath);
    Object.keys(inputObject).forEach(key => {
      let translation = inputObject[key];
      // CAUTION: CMS only currently allows translations without HTML attributes through unescaped.
      // HTML attributes are automatically inserted into translations if they exist in the default string.
      if (HTML_ATTRIBUTES_PATTERN.exec(translation)) {
        translation = translation.replaceAll(HTML_ATTRIBUTES_PATTERN, '');
        console.warn(`Removing HTML attributes in ${outputPath}`, {before: inputObject[key], after: translation})
      }
      if (!outputObject[key]) outputObject[key] = {};
      outputObject[key].message = translation;
    });
    writeFileSync(
      join(DOT, LOCALES, outputLocale, inputFilePath), 
      JSON.stringify(outputObject, null, 2)
    );
  });
});
