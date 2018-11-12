import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import { HTTP_METHOD } from './http'
// import storage, { AUTHORIZATION_KEY } from '@/storage/storage'

/*
* @method httpProxy
* @param {string} url api地址
* @param {string} [method] {@link module:constants/http method}
* */
export default (url, method = HTTP_METHOD.GET, data = {}, ContentType = false, responseType = false) => {
// export default (url, method = HTTP_METHOD.GET, data = {}, login = false, ContentType = false) => {
//   let cancel, promiseArr = {}
//   const CancelToken = axios.CancelToken
  const options = {
    url,
    method,
    headers: {
      // 'Access-token': storage.getData(AUTHORIZATION_KEY) || 'token will be here'
    },
    // cancelToken: new CancelToken(c => {
    //   cancel = c
    // }),
    timeout: 1000 * 60 * 20,
    withCredentials: false
  }
  if (responseType) {
    options.responseType = 'blob'
  }
  if (ContentType) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // options.transformRequest = [function (data) {
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //   }
    //   return ret
    // }]
  }
  /**
   * 请求拦截
   */
  axios.interceptors.request.use(config => {
    config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
    // console.log(Vue.prototype.lodingStatus)
    Vue.prototype.lodingStatus = true
    // if (promiseArr[config.url]) {
    //   promiseArr[config.url]('操作取消')
    //   promiseArr[config.url] = cancel
    // } else {
    //   promiseArr[config.url] = cancel
    // }
    return config
  }, error => {
    return Promise.reject(error)
  })
  /**
   * 响应拦截
   */
  axios.interceptors.response.use(response => {
    // console.log(Vue.prototype.lodingStatus)
    Vue.prototype.lodingStatus = false
    if (response.data && response.data.code === 401) { // 401, token失效
      Vue.cookie.delete('token')
      router.options.isAddDynamicMenuRoutes = false
      router.push({path: '/login'})
    }
    return response
  }, error => {
    return Promise.reject(error)
  })
  if (method !== HTTP_METHOD.GET) {
    // options.headers['Accept'] = 'application/json';
    // options.headers['Content-Type'] = 'application/json;charset=UTF-8';
    options.data = data
  }
  if (method === HTTP_METHOD.GET) {
    options.params = data
  }

  return axios(options)
}
