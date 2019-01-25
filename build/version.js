const fs = require('fs')

let version = (new Date()).valueOf()
fs.writeFile('src/version.js', `export const version = ${version}
console.log(version)
`, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('sucess')
  }
})
