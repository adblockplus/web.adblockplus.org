import { program } from "commander";
import { readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

program
  .description("copy strings from one locale file to another")
  .requiredOption("-i, --input <name>", "input locale file name (without .json)")
  .requiredOption("-o, --output <name>", "output locale file name (without .json)")
  .requiredOption("-s, --strings <ids>", "comma separated string ids to copy")

program.parse();
const options = program.opts();
const inputFilename = `${options.input}.json`;
const outputFilename = `${options.output}.json`;
const strings = options.strings.split(",");
const locales = readdirSync("locales");

const hits = [];
const misses = [];

for (const locale of locales) {
  let hit = false;
  try {
    const inputPath = join("locales", locale, inputFilename);
    const outputPath = join("locales", locale, outputFilename);
    const input = JSON.parse(readFileSync(inputPath));
    const output = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath)) : {};
    for (const string of strings) {
      if (input[string]) {
        output[string] = input[string];
        hit = true;  
      }
    }
    if (hit) writeFileSync(outputPath, JSON.stringify(output, null, 2));
  } catch (err) { /* silence is golden */ }
  if (hit) hits.push(locale);  
  else misses.push(locale);
}

console.log({ hits, misses });