import { program } from "commander";
import { readFileSync, writeFileSync, rmSync } from "fs";

program
  .description("Convert an .html compatible .tmpl file into .html")
  .requiredOption("-i, --input <name>", "template file path")
  .requiredOption("-t, --translations <name>", "translations file path")

program.parse();
const opts = program.opts();
const input = readFileSync(opts.input, {encoding: "utf-8"});
const translations = JSON.parse(readFileSync(opts.translations));
const output = input.replaceAll(/\{\{(.*)\}\}/g, (match, group) => {
  try {
    const id = group.match(/translate\s*\(['"](.*)['"],/)[1];
    return `{{ ${id} ${translations[id].message} }}`;
  } catch (error) {
    console.log("replace catch", match, error);
    return match;
  }
});

writeFileSync(opts.input.replace(".tmpl", ".html"), output);
rmSync(opts.input);