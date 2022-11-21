import { program } from 'commander';
import { writeFileSync, readdirSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const LOCALES = 'locales';
const DOT = '.';

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
    const inputObject = openLocaleFile(join(args.input, inputLocale, inputFilePath));
    const outputObject = openLocaleFile(join(DOT, LOCALES, outputLocale, inputFilePath));
    Object.keys(inputObject).forEach(key => {
      if (!outputObject[key]) outputObject[key] = {};
      outputObject[key].message = inputObject[key];
    });
    writeFileSync(
      join(DOT, LOCALES, outputLocale, inputFilePath), 
      JSON.stringify(outputObject, null, 2)
    );
  });
});
