import { program } from "commander";
import { writeFileSync, readFileSync } from "fs";

program.requiredOption("-i, --input <path>", "path to logs input");
program.requiredOption("-o, --output <path>", "path to logs output");
program.parse();
const args = program.opts();

const input = JSON.parse(readFileSync(args.input), {encoding: "utf-8"});

const results = [];

for (const entry of input) {
  const result = {
    timestamp: entry.timestamp,
    id: entry.jsonPayload.id,
    event: entry.jsonPayload.event,
  };
  for (const key in entry.jsonPayload.payload) {
    if (entry.jsonPayload.payload[key] != null) {
      result[key] = entry.jsonPayload.payload[key];
    }
  }
  results.push(result);
}

results.sort((a,b) => {
  return new Date(a.timestamp) - new Date(b.timestamp);
});

writeFileSync(args.output, JSON.stringify(results, null, 2));