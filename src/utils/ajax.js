/* eslint-disable no-dupe-keys */
let HTTP_REQUEST_URL = ''

if (process.env.NODE_ENV === 'development')
  // HTTP_REQUEST_URL = 'http://127.0.0.1:8081'
  HTTP_REQUEST_URL = 'http://nftfrontapi.xiaoyio.com'
  // HTTP_REQUEST_URL = 'http://frp.xiaoyio.com'

else
  HTTP_REQUEST_URL = import.meta.env.VITE_API_SERVER

const TOKENNAME = 'token'

const HEADER = {
  'content-type': 'application/json',
  // #ifdef H5
  'Form-Type': navigator.userAgent.toLowerCase().includes('micromessenger') ? 'wechat' : 'h5',
  // #endif
  // #ifdef MP
  'Form-Type': 'routine',
  // #endif
  // #ifdef APP-VUE
  'Form-Type': 'app',
  // #endif
}

class Ajax {
  constructor(prefix) {
    this.prefix = prefix || ''
  }

  get(url, data, { header = undefined } = {}, noAuth = false) {
    return this.request({
      url, method: 'get', data, header, noAuth,
    })
  }

  post(url, data, { header = undefined } = {}, noAuth = false) {
    return this.request({
      url, method: 'post', data, header, noAuth,
    })
  }

  put(url, data, { header = undefined } = {}, noAuth = false) {
    return this.request({
      url, method: 'put', data, header, noAuth,
    })
  }

  delete(url, data, { header = undefined } = {}, noAuth = false) {
    return this.request({
      url, method: 'delete', data, header, noAuth,
    })
  }

  request({ url, method, data, header, noAuth }) {
    const USER = uni.$tm.u.getCookie(import.meta.env.VITE_API_APP_STORAGENAME)
    if (!noAuth) {
      if (!header)
        header = HEADER
      if (USER[TOKENNAME])
        header[TOKENNAME] = `${USER[TOKENNAME]}`
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: HTTP_REQUEST_URL + this.prefix + url,
        method: method || 'GET',
        header: header || HEADER,
        data: data || {},
        success: (res) => {
          if (res.statusCode === 200) {
            if (res.data.code === 0) { resolve(res.data) }
            else if (res.data.code === 401 && !url.includes('configList')) {
              uni.clearStorageSync()
              uni.$tm.u.toast('登录失效，请重新登录')
              uni.reLaunch({
                url: '/pages/login',
              })
            }
            else {
              uni.$tm.u.toast(res.data.msg)
              reject(res.data.msg)
            }
          }
          else if (res.data.code === 401 && !url.includes('configList')) {
            uni.clearStorageSync()
            uni.$tm.u.toast('登录失效，请重新登录')
            uni.reLaunch({
              url: '/pages/login',
            })
          }
          else if (!url.includes('configList')) {
            uni.$tm.u.toast(res.msg)
            reject()
          }
        },
        fail: (err) => {
          uni.$tm.u.toast('请求失败')
          // #ifdef APP-PLUS
          reject(err)
          // #endif
          // #ifndef APP-PLUS
          reject('请求失败')
          // #endif
        },
      })
    })
  }
}
export default Ajax
