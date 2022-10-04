import { program } from 'commander';
import { writeFileSync, readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

program.requiredOption('-i, --input <path>', 'path to translations');

program.parse();

const options = program.opts();

const getJSON = (path) => {
  return JSON.parse(readFileSync(path, {encoding: 'utf-8'}));
}

const excludeHidden = (list, name) => {
  if (name[0] != '.') list.push(name);
  return list;
}

const inputDirectories = readdirSync(options.input)
.reduce(excludeHidden, []); // exclude hidden files/directories e.g. .DS_Store
if (!inputDirectories.length) throw new Error("Didn't find locale directories in input path");

const outputDirectories = readdirSync('./locales')
.reduce(excludeHidden, []); // exclude hidden files/directories e.g. .DS_Store
if (!outputDirectories.length) throw new Error("Didn't find locale directories in project path");

inputDirectories.forEach(inputLocale => {
  const outputDirectory = existsSync(join('.', 'locales', inputLocale))
  ? inputLocale
  : existsSync(join('.', 'locales', inputLocale.split('_')[0]))
  ? inputLocale.split('_')[0]
  : false;
  if (!outputDirectory) throw new Error(`Didn't find locale ${inputLocale} from input in project`);
  readdirSync(join(options.input, inputLocale))
  .reduce(excludeHidden, [])
  .forEach(inputFilePath => {
    const inputObject = getJSON(join(options.input, inputLocale, inputFilePath));
    const outputObject = getJSON(join('.', 'locales', outputDirectory, inputFilePath));
    Object.keys(inputObject).forEach(key => {
      outputObject[key].message = inputObject[key];
    });
    writeFileSync(
      join('.', 'locales', outputDirectory, inputFilePath), 
      JSON.stringify(outputObject, null, 2)
    );
  });
});
