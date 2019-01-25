'use strict'
// let gitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim()
let gitSha = require('../src/nodeversion').version

process.env.RELEASE_VERSION = gitSha
module.exports = {
  RELEASE_VERSION: `"${gitSha}"`,
  NODE_ENV: '"production"'
}
