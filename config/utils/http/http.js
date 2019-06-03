import axios from 'axios'

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}
// 设置默认头
const AUTH_TOKEN = window.localStorage.token || ''
if (window.localStorage.token) {
  axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
}
Object.assign(axios.defaults.headers.common, defaultHeaders)
const methods = ['get', 'post', 'put', 'delete']
axios.interceptors.request.use(
  (config) => {
    config.url = `/api${config.url}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => { //响应错误处理
    let text = JSON.parse(JSON.stringify(error)).response.status
    if (text == 401) {
      window.location.href = '/'
    }

    return Promise.reject(error)
  })


const http = {}
methods.forEach(method => {
  http[method] = axios[method].bind(axios)
})

export default http
