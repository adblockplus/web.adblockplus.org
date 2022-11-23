import { program } from 'commander';
import { writeFileSync, readFileSync } from 'fs';

program.description('Extract {{ translation [format] strings }} from HTML / Markdown file (excluding <? imports ?>)');
program.requiredOption('-i, --input <path>', 'path to input file');
program.requiredOption('-o, --output <path>', 'path to output file');
program.parse();
const options = program.opts();

const input = readFileSync(options.input, {encoding: 'utf-8'});

function regexExtractTrimmed(regex, string, group=0) {
  let match = string.match(regex);
  if (match) match = match[group].trim();
  return match;
}

function regexExtractAllTrimmed(regex, string, group=0) {
  const matches = Array.from(string.matchAll(regex));
  return matches.map(match => match[group].trim());
}

function reduceToStringObject(object, string) {
  // Regex reads: Any characters until space or opening bracket
  const id = regexExtractTrimmed(/^(.*?)(?=[\s[])/gm, string);
  if (!id) throw new Error(`Invalid string ID: ${string}`);
  // Regex reads: Any characters after an opening bracket until a closing bracket
  const context = regexExtractTrimmed(/(?<=\[)(.*?)(?=\])/gm, string);
  const content = (
    context
      ? string.slice(string.indexOf("]"))
      : string.slice(string.indexOf(" "))
  ).trim();
  // May not be an error if content is provided for ID outside of input file
  if (!content) 
    console.warn('Missing string content in string: ', string);
  // May not be an error if previously unset content is set
  if (object[id] && object[id] != content)
    console.warn('Replacing string content in string: ', id, object[id], content);
  // Exporting to IUC JSON format for XTM excluding string context
  if (context)
    console.warn('Excluding context in string', string);
  object[id] = content;
  return object;
}

// Regex reads: Any characters after two opening braces until two closing braces
const strings = regexExtractAllTrimmed(/(?<={{)(.*)(?=}})/gm, input)
  .reduce(reduceToStringObject, {});

writeFileSync(options.output, JSON.stringify(strings, null, 2));