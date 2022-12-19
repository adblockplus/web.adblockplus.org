import { program } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import JSON5 from 'json5';

program
  .description('Rename all Cloud Run `serviceId`s in a firebase config file (firebase.json)')
  .requiredOption('-i, --input <path>', 'path to Firebase firebase.json config file')
  .requiredOption('-n, --name <name>', 'new Google Cloud Run instance serviceId');

program.addHelpText('after', `

Example, this portion of a \`firebase.json\` file:
  ...
  "rewrites": [
    {
      "source": "/headers",
      "run": {
        "serviceId": "foo",
        "region": "europe-west1"
      }
    }
  ]
  ...

is overwritten to become:
  ...
  "rewrites": [
    {
      "source": "/headers",
      "run": {
        "serviceId": "bar",
        "region": "europe-west1"
      }
    }
  ]
  ...

by calling:
  $ node rename-service-ids-in-firebase-config.mjs -i [./path/to/firebase.json] -n bar
`);

program.parse();

const options = program.opts();

const config = JSON5.parse(readFileSync(options.input));

const newName = options.name;

const rewrites = config.hosting?.rewrites;

if (rewrites) {
  let count = 0;

  rewrites.forEach(rewrite => {
    if (rewrite.run) {
      rewrite.run.serviceId = newName;
      count++;
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
  JSON.stringify(config, null, 2)
);
