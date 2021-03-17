const core = require('@actions/core');
const github = require('@actions/github');
const fs = require("fs");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  console.log(process.env.GITHUB_WORKSPACE);

  const data = fs.readFileSync(process.env.GITHUB_WORKSPACE + '/README.md', 'utf8');
  console.log("README content:");
  console.log(data);
} catch (error) {
  core.setFailed(error.message);
}