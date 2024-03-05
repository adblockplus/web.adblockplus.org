# Hosting services

This directory contains the bulk of the configuration for deploying the website to Firebase Hosting and Google Cloud Run.

**Note:** The CI is configured to rename all Google Cloud Run service-ids in `firebase.json` to the current branch name at deploy time. (Via `../scripts/rename-service-ids-in-firebase-config.mjs`).

Therefore a deployed branch will have all Firebase Hosting Cloud Run rewrites pointing to a single Cloud Run instance `[branch-name]`.

## Deployments

| Environment name | Description | URL
|--|--|--|
| production/* | Production site  | See prod Firebase project / "Open live environment" button on Gitlab environments page
| staging/* | Copy of production site | See dev Firebase project / "Open live environment" button on Gitlab environments page
| review/* | [Firebase hosting preview channel](https://firebase.google.com/docs/hosting/test-preview-deploy#preview-channels) | See dev Firebase project / "Open live environment" button in Gitlab environments page / "View app" button in merge request
