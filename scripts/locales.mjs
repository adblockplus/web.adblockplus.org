import { program } from 'commander';
import glob from 'glob';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import Prompt from 'prompt-sync';

program
  .option('-r, --remove')
  .option('-s, --string <sid>')
  .option('-f, --file [name]')
  .option('-p, --project [path]', 'project path', '.')

program.parse();

const options = program.opts();

if (!existsSync(join(options.project, 'locales')))
  throw new Error('Run from project root or pass -p, --project with locales');

if (!options.remove /* || options.otherOperation */)
  throw new Error('Missing operation to perform to locales.');

const filename = (options.file || '*').replace('.json', '');

glob(join(options.project, 'locales', '**', `${filename}.json`), function(err, results) {
  if (err) throw new Error(err);
  const matches = results.reduce((matches, result) => {
    const strings = JSON.parse(readFileSync(result, {encoding: 'utf-8'}));
    if (options.remove) {
      if (strings.hasOwnProperty(options.string)) {
        matches[result] = strings;
      }
    }
    return matches;
  }, {});
  const prompt = Prompt();
  if (options.remove) {
    console.log(`Remove '${options.string}' from:`, Object.keys(matches));
    const removeConfirmed = prompt('Confirm y/n?');
    if (removeConfirmed == 'y') {
      for (const path in matches) {
        delete matches[path][options.string];
        writeFileSync(path, JSON.stringify(matches[path], null, 2));
      }
    }
  }
});