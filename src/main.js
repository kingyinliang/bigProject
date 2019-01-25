// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import httpProxy from '@/net/httpProxy'
import { isAuth } from '@/net/validate'
import SentryUtil from '@/net/sentryUtil'
import '@/assets/scss/index.scss'
import $ from 'jquery'
import {version} from '@/version'
// import 'script-loader!file-saver'

SentryUtil.init()
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)

// 挂载全局
Vue.prototype.$http = httpProxy // ajax请求方法
Vue.prototype.isAuth = isAuth// 权限方法
Vue.prototype.$ = $// 权限方法
Vue.prototype.lodingStatus = false// 加载遮罩
Vue.prototype.lodingState = false// 加载遮罩
Vue.prototype.version = version // 版本号

// 关闭弹窗清除表单
Vue.prototype.clearForm = function (form) {
  this[form] = {}
}

// 生成uuid
Vue.prototype.uuid = function () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
