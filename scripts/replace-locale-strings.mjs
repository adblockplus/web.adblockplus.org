import { program } from 'commander';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

program
    .option('-i, --input <path>', 'input file')
    .option('-o, --output <file>', 'output file')
    .option('-l, --locale <locale>', 'output locale');

program.parse();

const options = program.opts();

if (!existsSync(options.input))
  throw new Error(`Input path doesn't exist`);

const outputPath = join('locales', options.locale, `${options.output}.json`);

if (!existsSync(outputPath))
  throw new Error(`Output path ${outputPath} doesn't exist`);

const inputJSON = JSON.parse(readFileSync(options.input, {encoding: 'utf-8'})); 
const outputJSON = JSON.parse(readFileSync(outputPath, {encoding: 'utf-8'}));

for (const key in inputJSON) outputJSON[key].message = inputJSON[key];

writeFileSync(outputPath, JSON.stringify(outputJSON, null, 2));