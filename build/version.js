const fs = require('fs')

let version = (new Date()).valueOf()
fs.writeFile('src/version.js', `export const.version = ${version}
console.log(version)
`, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('sucess! version: ',version)
  }
})
fs.writeFile('src/nodeversion.js', `exports.version = ${version}
`, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('sucess! version: ',version)
  }
})
