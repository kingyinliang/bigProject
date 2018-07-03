let HOST = 'http://10.10.1.99:8080'
// let HOST = 'http://localhost:8080/factory'
/*
*首页api
 */

export const MAIN_API = {
  /**
   * @property {string} LOGIN_API 登录接口
   * @param {string}
   */
  LOGIN_API: HOST + '/sys/login',
  /**
   * @property {string} USERINFO_API 管理员信息
   */
  USERINFO_API: HOST + '/sys/user/info',
  /**
   * @property {string} LOGOUT_API 退出登录
   */
  LOGOUT_API: HOST + '/sys/logout',
  /**
   * @property {string} NAV_API 列表
   */
  NAV_API: HOST + '/sys/menu/nav'
}
export const LIST_API = {
  /**
   * @property {string} BANNER_API banner接口
   * @param {string} banner_type 1-首页大Banner，2-首页专题Banner，3-短篇大Banner，4-漫画大Banner，5-书籍详情Banner
   */
  BANNER_API: HOST + '/recommend/banner',
  /**
   * @property {string} CLASSIFY_API 分类列表
   */
  CLASSIFY_API: HOST + '/clazz/getClazzs'
}
