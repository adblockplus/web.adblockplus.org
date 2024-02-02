import { program } from 'commander';
import glob from 'glob';
import { renameSync } from 'fs';
import { join } from 'path';

program
  .description("Rename a locale file e.g. /**/foo.json > /**/bar.json")
  .requiredOption('-i, --input <name>', 'input locale file name')
  .requiredOption('-o, --output <name>', 'output locale file name')

program.parse();
const options = program.opts();
const inputFilename = `${options.input}.json`;
const outputFilename = `${options.output}.json`;
const hits = [];
const misses = [];

glob(join('locales', '**', `*.json`), function(err, paths) {
  if (err) throw err;
  for (const path of paths) {
    let hit = false;
    try {
      if (path.endsWith(inputFilename)) {
        renameSync(path, path.replace(inputFilename, outputFilename));
        hit = true;
      }  
    } catch (err) { /* silence is golden */ }
    if (hit) hits.push(path)
    else misses.push(path)
  }
});

console.log({ hits, misses });