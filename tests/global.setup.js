// QA User Accounts needs to initialise before tests run or else first test may time out
// Calling the health endpoints wakes the API
export default async function globalSetup() {
  await fetch('https://api.ua-qa.eyeo.it/v1/health');
  await fetch('https://webhook.ua-qa.eyeo.it/health');
}
