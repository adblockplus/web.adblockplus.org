import { program } from 'commander';
import { writeFileSync, readdirSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import he from 'he';

const LOCALES = 'locales';
const HTML_ATTRIBUTES_PATTERN = /(?<=<[\w]+)(\s[^>]*)/gmiu;

program.option("-o, --output <path>", "path to website", ".")
program.requiredOption('-i, --input <path>', 'path to translations');
program.parse();
const args = program.opts();

const openLocaleFile = (path) => {
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, {encoding: 'utf-8'}));
  } else {
    console.warn("Opening new locale file", path)
    return {};
  }
}

/** remove dotfiles from list via reduce */
const excludeDotfiles = (list, name) => {
  if (name[0] != '.') list.push(name);
  return list;
}

/** remove copy marks from file names e.g. "name (1).ext" > "name.ext" */
const removeCopyMarks = (name) => name.replace(/\s\(\d\)/, "")

const inputLocalePaths = readdirSync(args.input)
.reduce(excludeDotfiles, []);
if (!inputLocalePaths.length) throw new Error("Didn't find locale paths in input path");

const outputLocalePaths = readdirSync('./locales')
.reduce(excludeDotfiles, []);
if (!outputLocalePaths.length) throw new Error("Didn't find locale paths in project path");

inputLocalePaths.forEach(inputLocale => {
  let outputLocale = inputLocale;
  let outputPath = join(args.output, LOCALES, outputLocale);
  if (!existsSync(outputPath)) {
    outputLocale = outputLocale.split('_')[0];
    outputPath = join(args.output, LOCALES, outputLocale);
    if (!existsSync(outputPath)) {
      console.warn('Creating locale directory', outputPath)
      mkdirSync(outputPath);
    }
  }
  readdirSync(join(args.input, inputLocale))
  .reduce(excludeDotfiles, [])
  .forEach(inputFilename => {
    const outputFilename = removeCopyMarks(inputFilename);
    const outputPath = join(args.output, LOCALES, outputLocale, outputFilename);
    const inputObject = openLocaleFile(join(args.input, inputLocale, inputFilename));
    const outputObject = openLocaleFile(outputPath);
    Object.keys(inputObject).forEach(key => {
      let translation = inputObject[key];
      if (typeof translation == "object" && translation.hasOwnProperty("message")) {
        translation = he.decode(translation.message);
      }
      if (typeof translation != "string") {
        throw new TypeError("Translation format error");
      }
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
      join(args.output, LOCALES, outputLocale, outputFilename), 
      JSON.stringify(outputObject, null, 2)
    );
  });
});
