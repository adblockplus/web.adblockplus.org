/**
 * Rename all Cloud Run `serviceId`s in a firebase config file (firebase.json)
 * 
 * USAGE: rename-service-ids-in-firebase-config.mjs -i <path> -n <name>
 * 
 * Example, this portion of a `firebase.json` file:
 * firebase.json
 * ...
 * "rewrites": [
      {
        "source": "/headers",
        "run": {
          "serviceId": "foo",
          "region": "europe-west1"
        }
      }
    ]
    ...
 *
 * is overwritten to become:
 * firebase.json
 * ...
 * "rewrites": [
      {
        "source": "/headers",
        "run": {
          "serviceId": "bar",
          "region": "europe-west1"
        }
      }
    ]
 *
 * by calling `rename-service-ids-in-firebase-config.mjs -i [./path/to/firebase.json] -n bar`.
*/

import { program } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import JSON5 from 'json5';

program
  .requiredOption('-i, --input <path>', 'path to Firebase firebase.json config file');

program
  .requiredOption('-n, --name <name>', 'new Google Cloud Run instance serviceId');

program.parse();

const options = program.opts();

const configObject = JSON5.parse(readFileSync(options.input));

const newName = options.name;

const rewrites = configObject.hosting?.rewrites;

if (rewrites) {
  let count = 0;

  rewrites.forEach(rewrite => {
    for (let key in rewrite) {
      if (key === 'run') {
        rewrite[key].serviceId = newName;
        count ++;
      }
    }
  });

  if (count === 0) {
    console.log(`No Google Cloud Run instance \"rewrites\" for ${options.input}`);
    process.exit(0);
  }
} else {
  console.log(`No \"rewrites\" section for ${options.input}`);
  process.exit(0);
}

writeFileSync(
  `${options.input}`,
  JSON.stringify(configObject, null, 2)
);
