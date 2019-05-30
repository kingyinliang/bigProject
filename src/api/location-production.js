
let HOST
let type = process.env.srcconfig
console.log(process.env.srcconfig)
if (type === undefined) {
  HOST = 'mdsdev.shinho.net.cn'
} else {
  switch (type) {
    case 'dev':
      HOST = 'mdsdev.shinho.net.cn'
      break
    case 'test':
      HOST = 'mdsuat.shinho.net.cn'
      break
    case 'pro':
      HOST = 'mds.shinho.net.cn'
      break
    default:
      HOST = 'mdsdev.shinho.net.cn'
      break
  }
}

module.exports = {
  HOST
}
