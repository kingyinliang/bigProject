
let HOST
let type = process.env.srcconfig
console.log(process.env.srcconfig)
if (type === undefined) {
  HOST = 'https://apimarket-dev.shinho.net.cn/xhqy-fc'
} else {
  switch (type) {
    case 'dev':
      // HOST = 'https://apimarket-dev.shinho.net.cn/xhqy-fc'
      HOST = 'http://ALB001-ECS-1995142321.cn-north-1.elb.amazonaws.com.cn'
      break
    case 'test':
      // HOST = 'https://apimarket-test.shinho.net.cn/xhqy-fc'
      HOST = 'http://ALB002-ECS-1150488715.cn-north-1.elb.amazonaws.com.cn'
      break
    case 'pro':
      // HOST = 'https://apimarket.shinho.net.cn/xhqy-fc'
      HOST = 'http://internal-ALB003-Shinho-Micro-PRD-929565893.cn-north-1.elb.amazonaws.com.cn'
      break
    default:
      // HOST = 'https://apimarket-dev.shinho.net.cn/xhqy-fc'
      HOST = 'http://ALB001-ECS-1995142321.cn-north-1.elb.amazonaws.com.cn'
      break
  }
}

module.exports = {
  HOST
}
