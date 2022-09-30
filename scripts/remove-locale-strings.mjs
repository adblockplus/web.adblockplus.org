import { program } from 'commander';
import glob from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import Prompt from 'prompt-sync';

program
  .option('-p, --page <page>', 'page name, defaults to all pages', '*')
  .requiredOption('-s, --strings <sids>', 'comma separated sids');

program.parse();

const options = program.opts();

const page = (options.page).replace('.json', '');

const strings = options.strings.split(',');

glob(join('locales', '**', `${page}.json`), function(err, localePaths) {
  if (err) throw new Error(err);
  const hits = {};
  const results = {};
  localePaths.forEach(localePath => {
    const localeStrings = JSON.parse(readFileSync(localePath, {encoding: 'utf-8'}));
    strings.forEach(string => {
      if (localeStrings.hasOwnProperty(string)) {
        hits[localePath] = hits[localePath] ? hits[localePath] + 1 : 1;
        delete localeStrings[string];
      }
    });
    results[localePath] = localeStrings;
  });
  const prompt = Prompt();
  console.log('hits', hits);
  const confirm = prompt('Proceed y/n?');
  if (confirm != 'y') return;
  for (const path in results)
    writeFileSync(path, JSON.stringify(results[path], null, 2));
});