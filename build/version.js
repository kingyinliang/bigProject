const fs = require('fs')

let version = (new Date()).valueOf()
fs.writeFile('src/version.js', `exports.version = ${version}
`, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('sucess! version: ',version)
  }
})
