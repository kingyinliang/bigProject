'use strict'
let gitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim()
// let gitSha = require('../src/nodeversion').version

var buidType = process.argv.slice(2)[0]
console.log(`-----------start build-----------${buidType}`)

process.env.RELEASE_VERSION = gitSha
var buildObj = {
  RELEASE_VERSION: `"${gitSha}"`,
  NODE_ENV: '"production"'
}

switch (buidType) {
  case 'pro':
    process.env.srcconfig = 'pro'
    buildObj.srcconfig = 'pro'
    break
  case 'test':
    process.env.srcconfig = 'test'
    buildObj.srcconfig = 'test'
    break
  case 'dev':
    process.env.srcconfig = 'dev'
    buildObj.srcconfig = 'dev'
    break
}

module.exports = buildObj
