
let HOST
switch (process.env.srcconfig) {
  case 'dev':
    HOST = 'https://apimarket-dev.shinho.net.cn/xhqy-fc'
    break
  case 'test':
    HOST = 'https://apimarket-test.shinho.net.cn/xhqy-fc'
    break
  case 'pro':
    HOST = 'https://apimarket.shinho.net.cn/xhqy-fc'
    break
  default:
    // HOST = 'https://apimarket-dev.shinho.net.cn/xhqy-fc'
    // HOST = 'http://10.10.1.62:8080/xhqy-fc'
    HOST = 'http://10.10.1.151:8080/xhqy-fc'
    break
}
module.exports = {
  HOST
}
