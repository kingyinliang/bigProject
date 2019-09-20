// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from '@/store'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import install from '@/views/components/install'
import 'element-ui/lib/theme-chalk/index.css'
import httpProxy from '@/net/httpProxy'
import { isAuth } from '@/net/validate'
import SentryUtil from '@/net/sentryUtil'
import '@/assets/scss/index.scss'
import { version } from '@/version'
import App from './App.vue'
// import 'script-loader!file-saver'

SentryUtil.init()
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)
// 自定义全局组件
Vue.use(install)

// 挂载全局
Vue.prototype.$http = httpProxy // ajax请求方法
Vue.prototype.isAuth = isAuth// 权限方法
Vue.prototype.$ = $// 权限方法
Vue.prototype.lodingStatus = false// 加载遮罩
Vue.prototype.lodingState = false// 加载遮罩
Vue.prototype.version = version // 版本号
// 警告通知
Vue.prototype.$warning_SHINHO = (str) => {
  ElementUI.Notification({ title: '警告', message: str, type: 'warning' })
}
// 错误通知
Vue.prototype.$error_SHINHO = (str) => {
  ElementUI.Notification({ title: '错误', message: str, type: 'error' })
}
// 成功通知
Vue.prototype.$success_SHINHO = (str) => {
  ElementUI.Notification({ title: '成功', message: str, type: 'success' })
}

// 关闭弹窗清除表单
Vue.prototype.clearForm = function (form: any) {
  this[form] = {}
}

// mock
require('../mock/index')

// 生成uuid
Vue.prototype.uuid = function (len: any, radix: any) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
