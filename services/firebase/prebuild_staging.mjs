/**
 * This script:
 * - Finds a Firebase-Hosting preview channel of a CHANNEL_ID 
 *   that matches the current GitLab $CI_COMMIT_REF_SLUG (URL safe branch name)
 * - Deletes the preview channel if it is found
 * - Creates a preview channel using the same CHANNEL_ID
 */

import {exec} from 'child_process';
import {promisify} from 'util';
import {writeFile} from 'fs/promises';

// Find existing firebase-hosting preview channel for `branch`
const getChannel = async (branch) => {
  const {stdout} = await promisify(exec)(`firebase hosting:channel:list --json`);
  const {result} = JSON.parse(stdout);

  return result.channels.find(deploy => deploy.name.split('/').pop() === branch);
};

// Delete firebase-hosting preview channel for `branch` if it exists
const deleteChannel = async (branch) => {
  let channel = await getChannel(branch);

  if (channel) {
    console.log(`Deleting [Channel: ${branch}]`);
    try {
      await promisify(exec)(`firebase hosting:channel:delete ${branch} --force`);
    } catch (error) {
      console.log('Catch firebase-tools error on channel delete with --force option',
      'Issue here: https://github.com/firebase/firebase-tools/issues/3571');
    }
  } else {
    console.log(`[Channel: ${branch}] doesn't exist yet`);
  }
};

// Create new firebase-hosting preview channel and return its url
const generateBranchDeployUrl = async (branch) => {
  const {stdout} = await promisify(exec)(`firebase hosting:channel:create ${branch} --json`);
  const {result} = JSON.parse(stdout);

  console.log(`Created channel: ${branch}`);

  return result.url;
};

// Set preview URL in CI env
const setEnv = async (url) => {
  const envs = {
    REVIEW_URL: url,
  };

  const stringified = Object.entries(envs)
    .reduce((prev, [key, value]) => `${prev}${key}=${value}\n`, '');

  await writeFile('build.env', stringified);
};

// Replace preview channel if one exists & set env accordingly
const prep_staging = async (branch) => {
  await deleteChannel(branch);

  let url = await generateBranchDeployUrl(branch);

  await setEnv(url);

  console.log(`Staging url: ${url}`);
};

prep_staging(
  process.argv[2] || process.env.CI_COMMIT_REF_SLUG,
)
  .catch(e => {
    console.error(e);

    process.exit(1);
  });
