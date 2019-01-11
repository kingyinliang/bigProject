import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

let Log = function () {}
/**
 * 写普通日志
 * @param {String} title
 * @param {String} context
 * @param {String} level
 * @param {Object} tags
 */
Log.writeNormalLog = function (title = '', context = '', level = 'info', tags = {}) {
  Raven.captureMessage(title, {level, tags, extra: {context}})
}
/**
 * 写异常日志
 * @param {String} title
 * @param {String} context
 * @param {String} level
 * @param {Object} tags
 */
Log.writeExLog = function (ex, context = '', level = 'info', tags = {}) {
  Raven.captureException(ex, {level, tags, extra: {context}})
}
Log.Level = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
}
export default {
  /**
   * Raven.js 日志记录插件
   * Doc:https://docs.sentry.io/clients/javascript/usage/
   * @param {*} Vue
   * @param {Object} options
   */
  install (Vue, options = {}) {
    Raven.config('https://73cd073d45de4ff19400cfb68b65e4a6@sentry.shinho.net.cn/3')
      .addPlugin(RavenVue, Vue)
      .setRelease(`factory-wap@${Date.parse(new Date())}`)
      .install()
    Raven.setUserContext({
      user: options.user || ''
    })
    Raven.setTagsContext({ environment: options.env })
    Object.defineProperties(Vue.prototype, {
      $log: { value: Log, writable: true }
    })
  }
}
