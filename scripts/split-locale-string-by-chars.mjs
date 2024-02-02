import { program } from 'commander';
import glob from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

program
  .description("Split one translation into two by a pattern e.g. 'foo:bar' > 'foo:' & 'bar'")
  .option('-p, --page <page>', 'page name, defaults to all pages', '*')
  .requiredOption('-i, --input <id>', 'string id to split')
  .requiredOption('-b, --before <id>', 'new "before split" string id')
  .requiredOption('-a, --after <id>', 'new "after split" string id')
  .requiredOption('-c, --chars <char>', 'char to split by')

program.parse();
const options = program.opts();
const hits = [];
const misses = [];

glob(join('locales', '**', `${options.page}.json`), function(err, localePaths) {
  if (err) throw new Error(err);
  for (const localePath of localePaths) {
    let hit = false;
    try {
      const localeStrings = JSON.parse(readFileSync(localePath, {encoding: 'utf-8'}));
      if (localeStrings[options.input]) {
        const split = localeStrings[options.input].message.split(options.chars);
        if (split.length == 2 && split[1].length) {
          localeStrings[options.before] = {
            message: split[0] + options.chars
          };
          localeStrings[options.after] = {
            message: split[1]
          };
          delete localeStrings[options.input];
          writeFileSync(localePath, JSON.stringify(localeStrings, null, 2));
          hit = true;
        }
      }
    } catch (err) { /* silence is golden */ }
    if (hit) hits.push(localePath);
    else misses.push(localePath);
  }
});

console.log({ hits, misses });